import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './mainInfo.scss';
function MainInfo(props) {
  const [arr, setArr] = useState(true);
  let [observe, setObserve] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setArr(!arr);
    }, 2000);
  },[arr]);
  useEffect(() => {
    console.log(props.newWeather.observe);
    setObserve(props.newWeather.observe || {});
  }, [props.newWeather.observe]);
  return (
    <View className="main-info">
      <Text className="temperature">{observe.degree}</Text>
      <Text className="weather">{observe.weather}</Text>
      <View className="animate">
        <Text className={arr ? 'show list' : 'list'}>湿度 {observe.humidity}%</Text>
        <Text className={arr ? 'list' : 'show list'}>北风 1级</Text>
      </View>
      <View className="title">现在的气温比较凉爽~</View>
    </View>
  );
}
export default MainInfo;
