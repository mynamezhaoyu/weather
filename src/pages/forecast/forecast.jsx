import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './forecast.scss';
import IconFont from '../../components/iconfont';
function Forecast() {
  return (
    <View className="forecast">
      <View className="item">
        <View className="top">
          <Text>今天</Text>
          <Text>13/8°</Text>
        </View>
        <View className="bottom">
          <Text>晴</Text>
          <IconFont name="qingtian" size="40" />
        </View>
      </View>
      <View className="item">
        <View className="top">
          <Text>明天</Text>
          <Text>13/8°</Text>
        </View>
        <View className="bottom">
          <Text>多云转晴</Text>
          <IconFont name="duoyunzhuanqingtian" size="40" />
        </View>
      </View>
    </View>
  );
}
export default Forecast;
