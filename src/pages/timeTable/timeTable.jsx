import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import IconFont from '../../components/iconfont';
import './timeTable.scss';
function TimeTable() {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  return (
    <ScrollView className="scroll" scrollX="true" scrollAnchoring="true">
      {arr.map((r, i) => {
        return (
          <View className="list">
            <View>{r}</View>
            <View>
              <IconFont name="qingtian" size="40" />
            </View>
            <View>{i}</View>
          </View>
        );
      })}
    </ScrollView>
  );
}
export default TimeTable;
