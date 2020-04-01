import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './header.scss';
function Header(props) {
  let [obj, setObj] = useState([]);
  let [observe, setObserve] = useState({});
  useEffect(() => {
    if (props.newWeather && props.newWeather.loc) {
      let data = props.newWeather.loc.map((r) => r.trim());
      setObj(Array.from(new Set(data)) || []);
      setObserve(props.newWeather.observe);
    }
  }, [props.newWeather]);
  const map = () => {
    Taro.navigateTo({ url: '/pages/select/select' });
  };
  return (
    <View className="header">
      <View onClick={map} className="header-text">
        <AtIcon value="map-pin" size="15" color="#fff" className="icon"></AtIcon>
        <Text>{['加载中...', obj[0], `${obj[0]} - ${obj[1]}`, `${obj[1]} - ${obj[2]}`][obj.length]}</Text>
      </View>
      <View className="news">
        中央气象台{' '}
        {observe.update_time &&
          observe.update_time.slice(observe.update_time.length - 4, observe.update_time.length - 2) +
            ':' +
            observe.update_time.slice(observe.update_time.length - 2)}
        发布
      </View>
    </View>
  );
}
export default Header;
