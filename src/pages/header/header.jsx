import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './header.scss';
function Header(props) {
  const [loc, setLoc] = useState('定位中');
  let [obj, setObj] = useState({});
  useEffect(() => {
    if (props.newWeather) {
      setObj(props.newWeather.loc || {});
    }
  }, [props.newWeather]);
  const map = () => {
    let _loc = '芜湖 - 无为';
    Taro.navigateTo({url:'/pages/select/cselect'})
    setLoc(_loc);
  };
  return (
    <View className="header">
      <View onClick={map}>
        <AtIcon value="map-pin" size="15" color="#fff" className="icon"></AtIcon>
        <Text>
          {obj[1]} - {obj[2]}
        </Text>
      </View>
    </View>
  );
}
export default Header;
