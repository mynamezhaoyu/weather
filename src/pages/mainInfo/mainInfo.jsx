import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './mainInfo.scss';
function MainInfo(props) {
  const [arr, setArr] = useState(true);
  const direction = ['微风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风'];
  let [observe, setObserve] = useState({});
  let [tips, setTips] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setArr(!arr);
    }, 3000);
  }, [arr]);
  useEffect(() => {
    setObserve(props.newWeather.observe || {});
    setTips(props.newWeather.tips || {});
  }, [props.newWeather]);
  return (
    <View className="main-info">
      <View className="temperature">{observe.degree}</View>
      <View className="weather">{observe.weather}</View>
      <View className="animate">
        <Text className={arr ? 'show list' : 'list'}>湿度 {observe.humidity}%</Text>
        <Text className={arr ? 'list' : 'show list'}>
          {direction[observe.wind_direction]} {observe.wind_power}级
        </Text>
      </View>
      <View className="title">{tips.observe && tips.observe[0]}</View>
    </View>
  );
}
export default MainInfo;
