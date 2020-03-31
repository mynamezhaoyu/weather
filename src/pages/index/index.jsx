import Taro, { useState, useEffect, useDidShow, useShareAppMessage } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import Header from '../../components/header/header';
import MainInfo from '../../components/mainInfo/mainInfo';
import Forecast from '../../components/forecast/forecast';
import TimeTable from '../../components/timeTable/timeTable';
import TrendTable from '../../components/trendTable/trendTable';
import common from '../../common/js/common';
import { AtToast, AtFab } from 'taro-ui';
import './index.scss';
/* 
首页
date: 2020-02-25
*/
function Index() {
  const [bgc, setBac] = useState('#a3d765');
  const [newWeather, setNewWeather] = useState({});
  const [observe, setObserve] = useState({});
  const [isOpened, setIsOpened] = useState(false);
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
      let data = res.data.item;
      setNewWeather(data);
      setObserve(data.observe);
      setBac(pmcolor[data.air.aqi_level - 1]);
    });
  };
  const init = async (val) => {
    let address = [];
    // 如果有当前焦点地址，那就不需要调用地址了。证明肯定不是第一次用。
    if (val.length) {
      ajaxWeather(Array.isArray(val) ? val : val.split(','));
      return;
    }
    await new Promise((res) => {
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
              res();
            });
          }
        });
      } else if (process.env.TARO_ENV === 'h5') {
        Taro.request({
          url: 'https://restapi.amap.com/v3/ip?key=2e274b34f0284d295206dd1f8afca37c',
          header: {
            'content-type': 'application/json'
          }
        }).then((data) => {
          address.push(data.data.province, data.data.city);
          res();
        });
      }
    });
    await new Promise((res) => {
      Taro.setStorage({
        key: 'active',
        data: address
      });
      ajaxWeather(address);
      res();
    });
  };
  useEffect(() => {
    if (process.env.TARO_ENV !== 'weapp') return;
    let updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      setIsOpened(res.hasUpdate);
    });
    updateManager.onUpdateReady((res) => {
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
      <AtToast isOpened={isOpened} text="检测到有新版本，即将自动更新"></AtToast>
      <View className="main">
        <Header newWeather={newWeather}></Header>
        <View className="news">
          中央气象台{' '}
          {observe.update_time &&
            observe.update_time.slice(observe.update_time.length - 4, observe.update_time.length - 2) +
              ':' +
              observe.update_time.slice(observe.update_time.length - 2)}
          发布
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
  );
}
export default Index;
Index.config = {
  navigationBarTitleText: '首页'
};
