import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './timeTable.scss';
function TimeTable() {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  return (
    <View className="time-table">
      <View className="child">
        {arr.map((r) => {
          return <View className='item' style={`width: ${100 / arr.length}%`}>{r}</View>;
        })}
      </View>
    </View>
  );
}
export default TimeTable;
