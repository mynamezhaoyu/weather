import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './forecast.scss';
import IconFont from '../../components/iconfont';
import common from '../../common/js/common';
function Forecast(props) {
  const [objA, setObjA] = useState({});
  const [objB, setObjB] = useState({});
  useEffect(() => {
    if (props.newWeather.forecast_24h) {
      setObjA(props.newWeather.forecast_24h[1] || {});
      setObjB(props.newWeather.forecast_24h[2] || {});
      console.log(common);
    }
  }, [props.newWeather.forecast_24h]);
  return (
    <View className="forecast">
      <View className="item">
        <View className="top">
          <Text>今天</Text>
          <Text>
            {objA.max_degree}/{objA.min_degree}°
          </Text>
        </View>
        <View className="bottom">
          <Text>{objA.day_weather === objA.night_weather ? objA.day_weather : objA.day_weather + '转' + objA.night_weather}</Text>
          <IconFont name="qingtian" size="40" />
        </View>
      </View>
      <View className="item">
        <View className="top">
          <Text>明天</Text>
          <Text>
            {objB.max_degree}/{objB.min_degree}°
          </Text>
        </View>
        <View className="bottom">
          <Text>{objB.day_weather === objB.night_weather ? objB.day_weather : objB.day_weather + '转' + objB.night_weather}</Text>
          <IconFont name="duoyunzhuanqingtian" size="40" />
        </View>
      </View>
    </View>
  );
}
export default Forecast;
