export default {
  common: {
    update: "Обновить",
    cache: "Кэш",
    minute: "минута",
    minutes: "минут",
    hour: "час",
    hours: "часов",
    day: "день",
    days: "дней",
    ago: {
      now: "Только что",
      minute: "{{minutes}} минуту назад",
      minutes: "{{minutes}} минут назад",
      hour: "{{hours}} час назад",
      hours: "{{hours}} часов назад",
      day: "{{days}} день назад",
      days: "{{days}} дней назад",
    },
    info: "Информация",
    back: "Назад",
    time: "Время",
    today: "Сегодня",
    tomorrow: "Завтра",
    yesterday: "Вчера",
    loading: "Загрузка...",
    error: "Ошибка",
    retry: "Повторить",
    languageSelector: "Выбор языка",
    languages: {
      fr: "Французский",
      en: "Английский",
      es: "Испанский",
      de: "Немецкий",
      pt: "Португальский",
      zh: "Китайский",
      ja: "Японский"
    },
  },
  bus: {
    noBusAvailable: "В данный момент автобусы недоступны",
    alreadyPassed: "автобусов уже прошли",
    scroll: "прокрутить",
    terminus: "Конечная остановка",
    nextStop: "Следующая остановка",
    currentStop: "Текущая остановка",
    offline: {
      cache: "Вы не в сети. Отображаются кэшированные данные.",
      detected: "Обнаружен автономный режим"
    },
    online: {
      detected: "Обнаружено возвращение в сеть"
    },
    error: {
      cache: "Ошибка получения расписания. Используются кэшированные данные."
    },
    using: {
      cache: "Используются последние доступные данные:"
    },
    status: {
      onTime: "Вовремя",
      delayed: "Задержан",
      early: "Раньше времени",
      cancelled: "Отменен",
      passed: "Прошел",
      unknown: "Неизвестно",
      programmed: "Запланирован",
      description: {
        onTime: "Автобус идет вовремя",
        late: "Автобус опаздывает на {{minutes}} минут",
        early: "Автобус идет на {{minutes}} минут раньше",
        delayed: "Автобус задержан",
        cancelled: "Автобус отменен",
        passed: "Автобус уже прошел",
        unknown: "Статус автобуса неизвестен",
        programmed: "Автобус запланирован"
      }
    },
    delay: {
      late: "Задержка",
      early: "Раньше",
      minute: "мин",
      minutes: "мин",
    },
    card: {
      label: "Автобус {{id}} до {{terminus}}"
    },
    times: {
      label: "Время автобусов"
    },
    stops: {
      label: "Остановки автобусов",
      description: "Список {{total}} остановок автобусов",
      visualizer: "Визуализация остановок автобусов",
      selected: "Выбранная остановка: {{stop}}",
      departure: "Отправление: {{stop}}",
      terminus: "Конечная: {{stop}}",
      intermediate: "Остановка {{position}} из {{total}}: {{stop}}",
      current: "Текущая остановка {{position}} из {{total}}: {{stop}}"
    },
    currentStopInfo: {
      label: "Остановка {{current}} из {{total}}: {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Подключен",
      disconnected: "Отключен",
      loading: "Загрузка",
      updating: "Обновление",
      error: "Ошибка",
    },
  },
  company: {
    all: "Все",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Другие",
    filter: {
      label: "Фильтр по компании автобусов",
      button: "Фильтр по {{company}}"
    }
  },
  info: {
    description:
      "Это приложение было разработано Тьефеном Симонну с целью предоставления простого и эффективного решения для отслеживания расписания автобусов на автобусной станции Сабины в Монпелье. Цель - сделать информацию доступной для всех в понятном и интуитивном виде.",
    titles: {
      all: "Все",
      about: "О приложении",
      site: "Мой сайт",
      github: "Мой GitHub",
      short: {
        all: "Все",
      },
    },
  },
};
