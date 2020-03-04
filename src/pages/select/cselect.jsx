import Taro, { useState, useEffect } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem, AtIcon } from 'taro-ui';
import './cselect.scss';
/* 
搜索页
date: 2020-03-04
*/
function Cselect() {
  let [inputVal, setInputVal] = useState('');
  let [arr, setArr] = useState([]);
  let [logArr, setLogArr] = useState([]);
  let [isShow, setIsShow] = useState(true);
  useEffect(() => {
    if (Taro.getStorage) {
      Taro.getStorage({
        key: 'axiba',
        success: (res) => {
          console.log(res);
          setLogArr(res.data || '');
        }
      });
    }
  }, []);
  const obj = {
    // 搜索框输入事件
    onChange(val) {
      setInputVal(val);
      if (!val) {
        setArr([]);
        return;
      }
      Taro.request({
        url: 'https://wwxinmao.top/api/selWeather',
        // url: 'http://localhost:8000/selWeather',
        method: 'POST',
        data: {
          city: val
        },
        header: {
          'content-type': 'application/json'
        }
      }).then((res) => {
        let data = res.data.item;
        if (Object.keys(data.internal).length) {
          setArr(Object.values(data.internal));
        }
      });
    },
    // 点击取消按钮，返回上一页
    onActionClick() {
      Taro.navigateBack();
    },
    // 选中事件
    handleClick(i) {
      let _arr = [];
      if (Taro.getStorage) {
        Taro.getStorage({
          key: 'axiba',
          success: (res) => {
            _arr = res.data;
          }
        });
      }
      _arr.unshift(arr[i]);
      if (_arr.length > 3) {
        // 最要最新的三个
        _arr.length--;
      }
      setLogArr(_arr);
      Taro.setStorage({
        key: 'axiba',
        data: _arr
      });
      Taro.setStorage({
        key: 'active',
        data: _arr[0]
      });
      setArr([]);
      setInputVal('');
      setIsShow(true);
      Taro.navigateBack();
    }
  };
  return (
    <View className="select">
      <AtSearchBar
        value={inputVal}
        onChange={obj.onChange}
        onActionClick={obj.onActionClick}
        showActionButton
        actionName="取消"
        placeholder="搜索地区/景点"
        onFocus={() => {
          setIsShow(false);
        }}
        onBlur={() => {
          setIsShow(true);
        }}
      />
      {arr.map((r, i) => {
        return (
          <AtList key={i + ''}>
            <AtListItem title={r} onClick={obj.handleClick.bind(this, i)} />
          </AtList>
        );
      })}
      <View className="main" style={isShow ? { display: 'block' } : { display: 'none' }}>
        <View className="title">
          <Text>历史记录</Text>
          <AtIcon
            value="trash"
            size="20"
            onClick={() => {
              Taro.setStorage({
                key: 'axiba',
                data: []
              });
              setLogArr([]);
            }}
          ></AtIcon>
        </View>
        <View className="log">
          {logArr.map((r, i) => {
            return (
              <View
                key={i + ''}
                className="child"
                onClick={() => {
                  Taro.setStorage({
                    key: 'active',
                    data: r
                  });
                  Taro.navigateBack();
                }}
              >
                {r.split(',')[r.split(',').length - 1]}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
export default Cselect;
