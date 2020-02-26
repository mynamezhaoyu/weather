Component({
  props: {
    // qingtian | manyue | Group | shaoyun | canyue | baoyu | dayu | baoxue | daxue | dayuzhuanqing | duoyunzhuanqingtian | leizhenyu | emeiyue | shandian | shangxianyue | wanduoyun | wanqingtian | wumai | wu | tedazhenyu | xiaxianyue | xiaoxue | xiaoyu | xinyue | yintian | zhenyu | zhenyuzhuanqing | yujiaxue | zhongxue | zhongyu | zhangxianyue | Group1
    name: null,
    // string | string[]
    color: '',
    size: 18,
  },
  data: {
    quot: '"',
    svgSize: 18,
    isStr: true,
  },
  didMount() {
    const size = this.props.size;
    const color = this.props.color;

    this.setData({
      isStr: typeof color === 'string',
    });

    if (size !== this.data.svgSize) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
  disUpdate(prevProps) {
    const size = this.props.size;
    const color = this.props.color;

    if (color !== prevProps.color) {
      this.setData({
        isStr: typeof color === 'string',
      });
    }

    if (size !== prevProps.size) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
});
