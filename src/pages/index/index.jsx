import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from '../header/header';
import MainInfo from '../mainInfo/mainInfo';
import Forecast from '../forecast/forecast';
import TimeTable from '../timeTable/timeTable';
import './index.scss';
/* 
首页
date: 2020-02-25
*/
function Index() {
  const [bgc, setBac] = useState('background-color: #a3d765');
  const [newWeather, setNewWeather] = useState({});
  useEffect(() => {
    Taro.request({
      url: 'https://www.wwxinmao.top/api/weather'
    }).then((res) => {
      setNewWeather(res.data.item.data);
    });
  }, []);
  return (
    <View>
      <View className="index">
        <Header></Header>
        <View className="news">中央气象台 15:38发布</View>
        <View style={bgc} className="pm">
          <View className="pmNum">27</View>
          <View className="pmType">优</View>
        </View>
        <MainInfo newWeather={newWeather}></MainInfo>
      </View>
      <Forecast></Forecast>
      <TimeTable></TimeTable>
      <View>{newWeather}</View>
    </View>
  );
}
export default Index;
