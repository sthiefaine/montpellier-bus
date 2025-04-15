export default {
  common: {
    update: "更新",
    cache: "缓存",
    minute: "分钟",
    minutes: "分钟",
    hour: "小时",
    hours: "小时",
    day: "天",
    days: "天",
    ago: {
      now: "刚刚",
      minute: "{{minutes}} 分钟前",
      minutes: "{{minutes}} 分钟前",
      hour: "{{hours}} 小时前",
      hours: "{{hours}} 小时前",
      day: "{{days}} 天前",
      days: "{{days}} 天前",
    },
    info: "信息",
    back: "返回",
    time: "时间",
    today: "今天",
    tomorrow: "明天",
    yesterday: "昨天",
    loading: "加载中...",
    error: "错误",
    retry: "重试",
    languageSelector: "语言选择器",
    languages: {
      fr: "法语",
      en: "英语",
      es: "西班牙语",
      de: "德语",
      pt: "葡萄牙语",
      zh: "中文",
      ja: "日语"
    },
  },
  bus: {
    noBusAvailable: "目前没有可用的公交车",
    alreadyPassed: "已通过的公交车",
    scroll: "滚动",
    terminus: "终点站",
    nextStop: "下一站",
    currentStop: "当前站",
    offline: {
      cache: "您已离线。显示缓存数据。",
      detected: "检测到离线状态"
    },
    online: {
      detected: "检测到恢复在线"
    },
    error: {
      cache: "获取时刻表时出错。使用缓存数据。"
    },
    using: {
      cache: "使用最新可用数据："
    },
    status: {
      onTime: "准时",
      delayed: "延迟",
      early: "提前",
      cancelled: "已取消",
      passed: "已通过",
      unknown: "未知",
      programmed: "已计划",
      description: {
        onTime: "公交车准时",
        late: "公交车晚点 {{minutes}} 分钟",
        early: "公交车提前 {{minutes}} 分钟",
        delayed: "公交车晚点",
        cancelled: "公交车已取消",
        passed: "公交车已通过",
        unknown: "公交车状态未知",
        programmed: "公交车已计划",
      }
    },
    delay: {
      late: "晚点",
      early: "提前",
      minute: "分钟",
      minutes: "分钟",
    },
    card: {
      label: "{{id}} 路公交车前往 {{terminus}}"
    },
    times: {
      label: "公交车时刻表"
    },
    stops: {
      label: "公交车站",
      description: "共 {{total}} 个公交车站列表",
      visualizer: "公交车站可视化",
      selected: "已选择车站：{{stop}}",
      departure: "出发：{{stop}}",
      terminus: "终点站：{{stop}}",
      intermediate: "第 {{position}} 站，共 {{total}} 站：{{stop}}",
      current: "当前第 {{position}} 站，共 {{total}} 站：{{stop}}"
    },
    currentStopInfo: {
      label: "当前第 {{current}} 站，共 {{total}} 站：{{stop}}"
    }
  },
  server: {
    status: {
      connected: "已连接",
      disconnected: "已断开连接",
      loading: "加载中",
      updating: "更新中",
      error: "错误",
    },
  },
  company: {
    all: "全部",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "其他",
    filter: {
      label: "按公交公司筛选",
      button: "按 {{company}} 筛选"
    }
  },
  info: {
    description: "此应用程序由 Thiefaine Simonnou 开发，旨在为蒙彼利埃 Sabines 汽车站的公交车时刻表提供简单有效的解决方案。目标是使信息清晰直观地提供给所有人。",
    titles: {
      all: "全部",
      about: "关于",
      site: "我的网站",
      github: "我的 GitHub",
      short: {
        all: "全部",
      },
    },
  },
}; 