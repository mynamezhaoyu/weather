let obj = {
  getIconStr(num) {
    let arr = {}
    if (num) {
      arr = this.iconStr.filter((r) => r.n === num)[0];
    }
    return arr
  },
  iconStr: [
    { n: '00', name: '晴', iconNmae: 'qingtian' },
    { n: '01', name: '多云', iconNmae: 'duoyun' },
    { n: '02', name: '阴', iconNmae: 'yintian' },
    { n: '03', name: '阵雨', iconNmae: 'zhenyu' },
    { n: '04', name: '雷阵雨', iconNmae: 'leizhenyu' },
    { n: '05', name: '雷阵雨伴有冰雹', iconNmae: 'leizhenyubanyoubingbao' },
    { n: '06', name: '雨夹雪', iconNmae: 'yujiaxue' },
    { n: '07', name: '小雨', iconNmae: 'xiaoyu' },
    { n: '08', name: '中雨', iconNmae: 'zhongyu' },
    { n: '09', name: '大雨', iconNmae: 'dayu' },
    { n: '10', name: '暴雨', iconNmae: 'baoyu' },
    { n: '11', name: '大暴雨', iconNmae: 'tedabaoyu' },
    { n: '12', name: '特大暴雨', iconNmae: 'tedabaoyu-D' },
    { n: '13', name: '阵雪', iconNmae: 'zhenxue' },
    { n: '14', name: '小雪', iconNmae: 'xiaoxue' },
    { n: '15', name: '中雪', iconNmae: 'zhongxue' },
    { n: '16', name: '大雪', iconNmae: 'daxue' },
    { n: '17', name: '暴雪', iconNmae: 'baoxue' },
    { n: '18', name: '雾', iconNmae: 'wu' },
    { n: '19', name: '冻雨', iconNmae: 'dongyu' },
    { n: '20', name: '沙尘暴', iconNmae: 'shachenbao' },
    { n: '21', name: '小到中雨', iconNmae: 'zhongyu' },
    { n: '22', name: '中到大雨', iconNmae: 'dayu' },
    { n: '23', name: '大到暴雨', iconNmae: 'baoyu' },
    { n: '24', name: '暴雨到大暴雨', iconNmae: 'tedabaoyu' },
    { n: '25', name: '大暴雨到特大暴雨', iconNmae: 'tedabaoyu-D' },
    { n: '26', name: '小到中雪', iconNmae: 'zhongxue' },
    { n: '27', name: '中到大雪', iconNmae: 'daxue' },
    { n: '28', name: '大到暴雪', iconNmae: 'baoxue' },
    { n: '29', name: '浮尘', iconNmae: 'fuchen' },
    { n: '30', name: '扬沙', iconNmae: 'Group1' },
    { n: '31', name: '强沙尘暴', iconNmae: 'qiangshachenbao' },
    { n: '53', name: '霾', iconNmae: 'wumai' },
    { n: '99', name: '无', iconNmae: '' },
    { n: '32', name: '浓雾', iconNmae: 'lan-dawu' },
    { n: '49', name: '强浓雾', iconNmae: 'lan-dawu' },
    { n: '54', name: '中度霾', iconNmae: 'zhongdumai' },
    { n: '55', name: '重度霾', iconNmae: 'zhongdumai1' },
    { n: '56', name: '严重霾', iconNmae: 'yanzhongmai' },
    { n: '57', name: '大雾', iconNmae: 'lan-dawu' },
    { n: '58', name: '特强浓雾', iconNmae: 'tianqi-teqiangnongwu' },
    { n: '301', name: '雨', iconNmae: 'yintian' },
    { n: '302', name: '雪', iconNmae: 'xiaoxue' },
    { n: '999', name: '日出', iconNmae: 'rise' },
    { n: '888', name: '日落', iconNmae: 'set' }
  ]
};
// p = [{
//   key: "clothes",
//   icon: "icon_chuanyi",
//   color: "#E1A4C4"
// }, {
//   key: "umbrella",
//   icon: "icon_yusan",
//   color: "#C1A4E0"
// }, {
//   key: "cold",
//   icon: "icon_ganmao",
//   color: "#DFC79C"
// }, {
//   key: "carwash",
//   icon: "icon_xiche",
//   color: "#B5E6A8"
// }, {
//   key: "sports",
//   icon: "icon_yundong",
//   color: "#E6D99D"
// }, {
//   key: "sunscreen",
//   icon: "icon_fangsai",
//   color: "#DBADA0"
// }, {
//   key: "fish",
//   icon: "icon_diaoyu",
//   color: "#A3DFD4"
// }, {
//   key: "tourism",
//   icon: "icon_lvyou",
//   color: "#EDAC96"
// }, {
//   key: "traffic",
//   icon: "icon_jiaotong",
//   color: "#8BA5AF"
// }, {
//   key: "diffusion",
//   icon: "icon_wurankuosan",
//   color: "#B28A90"
// }, {
//   key: "comfort",
//   icon: "icon_shushidu",
//   color: "#9EC48C"
// }, {
//   key: "drying",
//   icon: "icon_liangshai",
//   color: "#A6BACC"
// }, {
//   key: "makeup",
//   icon: "icon_huazhuang",
//   color: "#E09090"
// }, {
//   key: "morning",
//   icon: "icon_chenlian",
//   color: "#87C5DD"
// }, {
//   key: "allergy",
//   icon: "icon_guomin",
//   color: "#95A3DB"
// }, {
//   key: "heatstroke",
//   icon: "icon_zhongshu",
//   color: "#FF8A65"
// }]
// , y = [{
//   key: 1,
//   level: "\u708e\u70ed",
//   icon: "icon_chuanyi_hot"
// }, {
//   key: 2,
//   level: "\u70ed",
//   icon: "icon_chuanyi_hot"
// }, {
//   key: 3,
//   level: "\u8212\u9002",
//   icon: "icon_chuanyi_shushi"
// }, {
//   key: 4,
//   level: "\u8f83\u8212\u9002",
//   icon: "icon_chuanyi_shushi"
// }, {
//   key: 5,
//   level: "\u8f83\u51b7",
//   icon: "icon_chuanyi_jiaoleng"
// }, {
//   key: 6,
//   level: "\u51b7",
//   icon: "icon_chuanyi_cool"
// }, {
//   key: 7,
//   level: "\u5bd2\u51b7",
//   icon: "icon_chuanyi_cool"
// }]
export default obj;
