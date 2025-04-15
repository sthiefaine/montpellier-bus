export default {
  common: {
    update: "更新",
    cache: "キャッシュ",
    minute: "分",
    minutes: "分",
    hour: "時間",
    hours: "時間",
    day: "日",
    days: "日",
    ago: {
      now: "たった今",
      minute: "{{minutes}} 分前",
      minutes: "{{minutes}} 分前",
      hour: "{{hours}} 時間前",
      hours: "{{hours}} 時間前",
      day: "{{days}} 日前",
      days: "{{days}} 日前",
    },
    info: "情報",
    back: "戻る",
    time: "時間",
    today: "今日",
    tomorrow: "明日",
    yesterday: "昨日",
    loading: "読み込み中...",
    error: "エラー",
    retry: "再試行",
    languageSelector: "言語選択",
    languages: {
      fr: "フランス語",
      en: "英語",
      es: "スペイン語",
      de: "ドイツ語",
      pt: "ポルトガル語",
      zh: "中国語",
      ja: "日本語"
    },
  },
  bus: {
    noBusAvailable: "現在利用可能なバスはありません",
    alreadyPassed: "通過済みのバス",
    scroll: "スクロール",
    terminus: "終点",
    nextStop: "次の停留所",
    currentStop: "現在の停留所",
    offline: {
      cache: "オフラインです。キャッシュデータを表示しています。",
      detected: "オフラインを検出しました"
    },
    online: {
      detected: "オンラインに復帰しました"
    },
    error: {
      cache: "時刻表の取得中にエラーが発生しました。キャッシュデータを使用します。"
    },
    using: {
      cache: "最新の利用可能なデータを使用中："
    },
    status: {
      onTime: "定時",
      delayed: "遅延",
      early: "早発",
      cancelled: "運休",
      passed: "通過済み",
      unknown: "不明",
      programmed: "予定",
      description: {
        onTime: "バスは定時です",
        late: "バスは {{minutes}} 分遅れています",
        early: "バスは {{minutes}} 分早発しています",
        delayed: "バスは遅延しています",
        cancelled: "バスは運休です",
        passed: "バスは通過済みです",
        unknown: "バスの状態は不明です",
        programmed: "バスは予定通りです",
      }
    },
    delay: {
      late: "遅延",
      early: "早発",
      minute: "分",
      minutes: "分",
    },
    card: {
      label: "{{id}} 番バス {{terminus}} 行き"
    },
    times: {
      label: "バス時刻表"
    },
    stops: {
      label: "バス停",
      description: "全 {{total}} バス停のリスト",
      visualizer: "バス停の視覚化",
      selected: "選択された停留所：{{stop}}",
      departure: "出発：{{stop}}",
      terminus: "終点：{{stop}}",
      intermediate: "{{position}} 番目/全 {{total}} 停留所：{{stop}}",
      current: "現在 {{position}} 番目/全 {{total}} 停留所：{{stop}}"
    },
    currentStopInfo: {
      label: "現在 {{current}} 番目/全 {{total}} 停留所：{{stop}}"
    }
  },
  server: {
    status: {
      connected: "接続済み",
      disconnected: "切断済み",
      loading: "読み込み中",
      updating: "更新中",
      error: "エラー",
    },
  },
  company: {
    all: "すべて",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "その他",
    filter: {
      label: "バス会社でフィルタリング",
      button: "{{company}} でフィルタリング"
    }
  },
  info: {
    description: "このアプリケーションは、モンペリエのサビーヌバスターミナルのバス時刻表を簡単かつ効率的に追跡するためのシンプルなソリューションを提供するために、Thiefaine Simonnou によって開発されました。目標は、情報を明確かつ直感的にすべての人に提供することです。",
    titles: {
      all: "すべて",
      about: "概要",
      site: "私のウェブサイト",
      github: "私の GitHub",
      short: {
        all: "すべて",
      },
    },
  },
}; 