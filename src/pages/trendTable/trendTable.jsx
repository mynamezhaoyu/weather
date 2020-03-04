import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import IconFont from '../../components/iconfont';
import common from '../../common/js/common';
import moment from '../../common/js/moment';
import './trendTable.scss';
function TimeTable(props) {
  moment.locale('zh-en');
  const [arr, setArr] = useState([]);
  useEffect(() => {
    let [_arr, date, week] = [[], ['昨天', '今天', '明天', '后天'], ['周日', '周一', '周二', '周三', '周四', '周五', '周六']];
    if (props.newWeather) {
      let forecast = props.newWeather.forecast_24h;
      if (forecast) {
        for (let index = 0; index < Object.keys(forecast).length; index++) {
          if (index < 6) {
            let r = forecast[index];
            Object.assign(r, { _time: moment(r.time) });
            Object.assign(r, { title: date[index] ? date[index] : week[r._time.format('e')] });
            _arr.push(r);
          }
        }
        setArr(_arr);
      }
    }
  }, [props.newWeather]);
  return (
    <View className="trend-table">
      <View className="head">
        {arr &&
          arr.map((r, i) => {
            return (
              <View key={String(i)} className={i ? 'list' : 'list ccc'}>
                <View>{r.title}</View>
                <View>{r._time.format('MM/DD')}</View>
                <View>{r.day_weather}</View>
                <IconFont name={common.getIconStr(r.day_weather_code).iconNmae} size="50" />
              </View>
            );
          })}
      </View>
      <View className="single"></View>
      <View className="footer">
        {arr &&
          arr.map((r, i) => {
            return (
              <View className="list" key={String(i)} className={i ? 'list' : 'list ccc'}>
                <View>{r.night_weather_short}</View>
                <IconFont name={common.getIconStr(r.night_weather_code).iconNmae} size="50" />
                <View>{r.night_wind_direction}</View>
                <View>{r.night_wind_power + '级'}</View>
              </View>
            );
          })}
      </View>
    </View>
  );
}
export default TimeTable;
