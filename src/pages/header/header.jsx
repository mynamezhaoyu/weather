import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './header.scss';
function Header() {
  const [loc, setLoc] = useState('定位中');
  const map = () => {
    let _loc = '芜湖 - 无为';
    setLoc(_loc);
  };
  return (
    <View className="header">
      <View onClick={map}>
        <AtIcon value="map-pin" size="15" color="#fff" className="icon"></AtIcon>
        <Text>{loc}</Text>
      </View>
    </View>
  );
}
export default Header;
