import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './header.scss';
function Header(props) {
  let [obj, setObj] = useState({});
  useEffect(() => {
    if (props.newWeather) {
      setObj((prevState) => {
        return Object.assign(prevState, props.newWeather.loc || {});
      });
    }
  }, [props.newWeather]);
  const map = () => {
    Taro.navigateTo({ url: '/pages/select/select' });
  };
  return (
    <View className="header">
      <View onClick={map}>
        <AtIcon value="map-pin" size="15" color="#fff" className="icon"></AtIcon>
        <Text>{obj.length === 2 ? obj[0] + ' - ' + obj[1] : (obj[1] || '').trim() + ' - ' + (obj[2] || '').trim()}</Text>
      </View>
    </View>
  );
}
export default Header;
