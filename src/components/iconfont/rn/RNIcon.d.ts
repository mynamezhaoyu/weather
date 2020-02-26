/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'qingtian' | 'manyue' | 'Group' | 'shaoyun' | 'canyue' | 'baoyu' | 'dayu' | 'baoxue' | 'daxue' | 'dayuzhuanqing' | 'duoyunzhuanqingtian' | 'leizhenyu' | 'emeiyue' | 'shandian' | 'shangxianyue' | 'wanduoyun' | 'wanqingtian' | 'wumai' | 'wu' | 'tedazhenyu' | 'xiaxianyue' | 'xiaoxue' | 'xiaoyu' | 'xinyue' | 'yintian' | 'zhenyu' | 'zhenyuzhuanqing' | 'yujiaxue' | 'zhongxue' | 'zhongyu' | 'zhangxianyue' | 'Group1';
  size?: number;
  color?: string | string[];
}

export declare const RNIcon: FunctionComponent<Props>;

export default RNIcon;
