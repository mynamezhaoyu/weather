import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
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
    if (props.newWeather) {
      setObserve(props.newWeather.observe || {});
      setTips(props.newWeather.tips || {});
    }
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
      <View className="title">{tips.observe && tips.observe[1]}</View>

      <View className="components-page">
        <Image className="img" src="https://mat1.gtimg.com/pingjs/ext2020/tianqi/mobilev2/61e81da52b26f66c5147a241679a7a24.png" />
        <Image className="img" src="https://mat1.gtimg.com/pingjs/ext2020/tianqi/mobilev2/1355c59170ff294f7a619d5300cbfb0a.png" />
      </View>
    </View>
  );
}
export default MainInfo;
