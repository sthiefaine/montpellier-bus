export default {
  common: {
    update: "Update",
    cache: "Cache",
    minute: "minute",
    minutes: "minutes",
    hour: "hour",
    hours: "hours",
    day: "day",
    days: "days",
    ago: {
      now: "Just now",
      minute: "{{minutes}} minute ago",
      minutes: "{{minutes}} minutes ago",
      hour: "{{hours}} hour ago",
      hours: "{{hours}} hours ago",
      day: "{{days}} day ago",
      days: "{{days}} days ago",
    },
    info: "Info",
    back: "Back",
    time: "Time",
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    languageSelector: "Language selector",
    languages: {
      fr: "French",
      en: "English",
      es: "Spanish",
      de: "German",
      pt: "Br Portuguese",
      zh: "Chinese",
      ja: "Japanese"
    },
  },
  bus: {
    noBusAvailable: "No bus available at the moment",
    alreadyPassed: "buses already passed",
    scroll: "scroll",
    terminus: "Terminus",
    nextStop: "Next stop",
    currentStop: "Current stop",
    offline: {
      cache: "You are offline. Displaying cached data.",
      detected: "Offline mode detected"
    },
    online: {
      detected: "Back online detected"
    },
    error: {
      cache: "Error retrieving schedules. Using cached data."
    },
    using: {
      cache: "Using last available data:"
    },
    status: {
      onTime: "On time",
      delayed: "Delayed",
      early: "Early",
      cancelled: "Cancelled",
      passed: "Passed",
      unknown: "Unknown",
      programmed: "Scheduled",
      description: {
        onTime: "The bus is on time",
        late: "The bus is {{minutes}} minutes late",
        early: "The bus is {{minutes}} minutes early",
        delayed: "The bus is delayed",
        cancelled: "The bus is cancelled",
        passed: "The bus has already passed",
        unknown: "The bus status is unknown",
        programmed: "The bus is scheduled"
      }
    },
    delay: {
      late: "Late",
      early: "Early",
      minute: "min",
      minutes: "mins",
    },
    card: {
      label: "Bus {{id}} to {{terminus}}"
    },
    times: {
      label: "Bus times"
    },
    stops: {
      label: "Bus stops",
      description: "List of {{total}} bus stops",
      visualizer: "Bus stops visualization",
      selected: "Selected stop: {{stop}}",
      departure: "Departure: {{stop}}",
      terminus: "Terminus: {{stop}}",
      intermediate: "Stop {{position}} of {{total}}: {{stop}}",
      current: "Current stop {{position}} of {{total}}: {{stop}}"
    },
    currentStopInfo: {
      label: "Stop {{current}} of {{total}}: {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Connected",
      disconnected: "Disconnected",
      loading: "Loading",
      updating: "Updating",
      error: "Error",
    },
  },
  company: {
    all: "All",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Other",
    filter: {
      label: "Filter by bus company",
      button: "Filter by {{company}}"
    }
  },
  info: {
    description:
      "This application was developed by Thiefaine Simonnou with the aim of providing a simple and efficient solution for tracking bus schedules at the Sabines bus station in Montpellier. The goal is to make information accessible to everyone in a clear and intuitive way.",
    titles: {
      all: "All",
      about: "About",
      site: "My website",
      github: "My GitHub",
      short: {
        all: "All",
      },
    },
  },
};
