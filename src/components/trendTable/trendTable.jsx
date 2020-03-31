import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import IconFont from '../../components/iconfont';
import common from '../../common/js/common';
import moment from '../../common/js/moment';
import { Echart } from 'echarts12';
import './trendTable.scss';
function TimeTable(props) {
  moment.locale('zh-en');
  const [arr, setArr] = useState([]);
  const [option, setOption] = useState({});
  useEffect(() => {
    let [_arr, date, week] = [[], ['昨天', '今天', '明天'], ['周日', '周一', '周二', '周三', '周四', '周五', '周六']];
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
        setOption((prevState) => {
          return Object.assign(prevState, {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              show: false
            },
            yAxis: {
              type: 'value',
              show: false
            },
            grid: {
              left: '6%',
              right: '6%',
              bottom: '20%',
              top: '20%',
              containLabel: false
            },
            series: [
              {
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                data: _arr.map((r) => r.max_degree),
                itemStyle: {
                  color: '#f0cc35',
                  lineStyle: {
                    width: 5
                  }
                },
                label: {
                  show: true,
                  color: '#434343',
                  fontSize: 14,
                  formatter: (r) => r.value + '°'
                }
              },
              {
                type: 'line',
                smooth: true,
                symbolSize: 6,
                symbol: 'circle',
                data: _arr.map((r) => r.min_degree),
                itemStyle: {
                  color: '#3bbcff',
                  lineStyle: {
                    width: 5
                  }
                },
                label: {
                  show: true,
                  position: 'bottom',
                  color: '#434343',
                  fontSize: 14,
                  formatter: (r) => {
                    return r.value + '°';
                  }
                }
              }
            ]
          });
        });
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
      <View className="single">{JSON.stringify(option) !== '{}' && <Echart option={option} style={'height: 130px'} />}</View>
      <View className="footer">
        {arr &&
          arr.map((r, i) => {
            return (
              <View className="list" key={String(i)} className={i ? 'list' : 'list ccc'}>
                <IconFont name={common.getIconStr(r.night_weather_code).iconNmae} size="50" />
                <View>{r.night_weather_short}</View>
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
