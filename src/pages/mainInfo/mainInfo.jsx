import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './mainInfo.scss';
function MainInfo() {
  const [arr, setArr] = useState(true);
  let interval = setInterval(() => {
    setArr(!arr);
    clearInterval(interval);
  }, 3000);
  return (
    <View className="main-info">
      <Text className="temperature">10</Text>
      <Text className="weather">晴</Text>
      <View className="animate">
        <Text className={arr ? 'show list' : 'list'}>湿度 74%</Text>
        <Text className={arr ? 'list' : 'show list'}>北风 1级</Text>
      </View>
      <View className="title">现在的气温比较凉爽~</View>
    </View>
  );
}
export default MainInfo;
