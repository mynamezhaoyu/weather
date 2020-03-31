import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './header.scss';
function Header(props) {
  let [obj, setObj] = useState([]);
  useEffect(() => {
    if (props.newWeather.loc) {
      let data = props.newWeather.loc.map((r) => r.trim());
      setObj(Array.from(new Set(data)) || []);
    }
  }, [props.newWeather]);
  const map = () => {
    Taro.navigateTo({ url: '/pages/select/select' });
  };
  return (
    <View className="header">
      <View onClick={map}>
        <AtIcon value="map-pin" size="15" color="#fff" className="icon"></AtIcon>
        <Text>{['加载中...', obj[0], `${obj[0]} - ${obj[1]}`, `${obj[1]} - ${obj[2]}`][obj.length]}</Text>
      </View>
    </View>
  );
}
export default Header;
