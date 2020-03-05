import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from '../header/header';
import MainInfo from '../mainInfo/mainInfo';
import Forecast from '../forecast/forecast';
import TimeTable from '../timeTable/timeTable';
import TrendTable from '../trendTable/trendTable';
import common from '../../common/js/common';
import './index.scss';
/* 
首页
date: 2020-02-25
*/
function Index() {
  const [bgc, setBac] = useState('#a3d765');
  const [count, setCount] = useState(0);
  const [newWeather, setNewWeather] = useState({});
  const [observe, setObserve] = useState({});
  const pmcolor = ['#a3d765', '#f0cc35', '#f1ab62', '#ef7f77', '#b28ccb'];
  useDidShow(() => {
    if (!count) {
      Taro.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log(res);
        }
      });
      Taro.setStorage({
        key: 'active',
        data: []
      });
      setCount(1);
      fun([]);
      return;
    }
    try {
      var value = Taro.getStorageSync('active');
      if (value) fun(value.split(','));
    } catch (e) {}
  });
  const fun = (params) => {
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
  return (
    <View className="index">
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
