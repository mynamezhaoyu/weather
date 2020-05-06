import Taro, { useState, useEffect, useDidShow, useShareAppMessage, usePullDownRefresh } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import Header from '../../components/header/header';
import MainInfo from '../../components/mainInfo/mainInfo';
import Forecast from '../../components/forecast/forecast';
import TimeTable from '../../components/timeTable/timeTable';
import TrendTable from '../../components/trendTable/trendTable';
import common from '../../common/js/common';
import { AtToast, AtActivityIndicator } from 'taro-ui';
import './index.scss';
/* 
首页
date: 2020-02-25
*/
function Index() {
  const [bgc, setBac] = useState('#a3d765');
  const [newWeather, setNewWeather] = useState(false);
  const [activity, setActivity] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [num, setNum] = useState(0);
  const pmcolor = ['#a3d765', '#f0cc35', '#f1ab62', '#ef7f77', '#b28ccb'];
  const ajaxWeather = (params) => {
    Taro.request({
      url: common.ajax('weather'),
      method: 'POST',
      data: {
        city: params
      },
      header: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      setActivity(false);
      let data = res.data.item;
      setNewWeather(data);
      setBac(pmcolor[data.air.aqi_level - 1]);
      Taro.stopPullDownRefresh();
    });
  };
  const local = () => {
    let address = [];
    return new Promise((resolve) => {
      if (process.env.TARO_ENV === 'weapp') {
        Taro.getLocation({
          type: 'gcj02',
          success: (item) => {
            Taro.request({
              url: `https://restapi.amap.com/v3/geocode/regeo?key=2e274b34f0284d295206dd1f8afca37c&location=${item.longitude},${item.latitude}&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0`,
              header: {
                'content-type': 'application/json'
              }
            }).then((data) => {
              let _data = data.data.regeocode.addressComponent;
              if (!_data.city.length) {
                address.push(_data.province, _data.province, _data.district);
              } else {
                address.push(_data.province, _data.city, _data.district);
              }
              resolve(address);
            });
          }
        });
      } else {
        Taro.request({
          url: 'https://restapi.amap.com/v3/ip?key=2e274b34f0284d295206dd1f8afca37c',
          header: {
            'content-type': 'application/json'
          }
        }).then((data) => {
          address.push(data.data.province, data.data.city);
          resolve(address);
        });
      }
    });
  };
  const init = async (val) => {
    let address = [];
    // 如果有当前焦点地址，那就不需要调用地址了。证明肯定不是第一次用。
    if (val.length) {
      ajaxWeather(Array.isArray(val) ? val : val.split(','));
      return;
    }
    address = await local();
    await new Promise((resolve) => {
      Taro.setStorage({
        key: 'active',
        data: address
      });
      ajaxWeather(address);
      resolve();
    });
  };
  useEffect(() => {
    local().then((data) => {
      let activeVal = [];
      try {
        activeVal = Taro.getStorageSync('active');
      } catch (e) {
        console.log('报错提示', e);
      }
      if (activeVal.length && !data[0].includes(activeVal[0])) {
        Taro.showModal({
          title: '温馨提醒',
          content: '检测到你的位置信息变化，是否更改到当前地址天气？',
          success: (confirm) => {
            if (confirm) {
              init(data);
              Taro.setStorage({
                key: 'active',
                data: data
              });
            }
          }
        });
      }
    });
    setNum(Taro.$navBarMarginTop);
    if (process.env.TARO_ENV !== 'weapp') return;
    // 检查更新
    let updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      setIsOpened(res.hasUpdate);
    });
    updateManager.onUpdateReady(() => {
      updateManager.applyUpdate();
    });
  }, []);
  useDidShow(() => {
    let [isRefresh, activeVal] = [false, []];
    try {
      isRefresh = Taro.getStorageSync('isRefresh');
    } catch (e) {
      console.log('报错提示', e);
    }
    if (isRefresh) {
      // 不希望刷新，但是要重新置空
      Taro.setStorage({
        key: 'isRefresh',
        data: false
      });
      return;
    }
    try {
      activeVal = Taro.getStorageSync('active');
    } catch (e) {
      console.log('报错提示', e);
    }
    init(activeVal);
  });
  usePullDownRefresh(() => {
    setActivity(true);
    init(Taro.getStorageSync('active'));
  });
  if (process.env.TARO_ENV === 'weapp') {
    useShareAppMessage(() => {
      return {
        title: '你的好友为你分享了轻天气',
        path: 'pages/index/index'
      };
    });
  }
  return (
    <View className="index">
      <View style={`display:${activity ? 'black' : 'none'}`}>
        <AtActivityIndicator mode="center" content="刷新中..." size={40} color="#fff"></AtActivityIndicator>
      </View>
      <AtToast isOpened={isOpened} text="检测到有新版本，即将自动更新"></AtToast>
      {newWeather && (
        <View>
          <View className="main">
            <View style={`padding-top:` + `${num}px`}>
              <Header newWeather={newWeather}></Header>
            </View>
            <View style={`background-color:` + bgc} className="pm">
              <View className="pmNum">{newWeather.air && newWeather.air.aqi}</View>
              <View className="pmType">{newWeather.air && newWeather.air.aqi_name}</View>
            </View>
            <MainInfo newWeather={newWeather}></MainInfo>
          </View>
          <Forecast newWeather={newWeather}></Forecast>
          <TimeTable newWeather={newWeather}></TimeTable>
          <TrendTable newWeather={newWeather}></TrendTable>
        </View>
      )}
    </View>
  );
}
export default Index;
Index.config = {
  navigationBarTitleText: '首页',
  enablePullDownRefresh: true,
  navigationStyle: 'custom'
};
