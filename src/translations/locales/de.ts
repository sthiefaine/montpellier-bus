export default {
  common: {
    update: "Aktualisierung",
    cache: "Cache",
    minute: "Minute",
    minutes: "Minuten",
    hour: "Stunde",
    hours: "Stunden",
    day: "Tag",
    days: "Tage",
    ago: {
      now: "Gerade eben",
      minute: "vor {{minutes}} Minute",
      minutes: "vor {{minutes}} Minuten",
      hour: "vor {{hours}} Stunde",
      hours: "vor {{hours}} Stunden",
      day: "vor {{days}} Tag",
      days: "vor {{days}} Tagen",
    },
    info: "Info",
    back: "Zurück",
    time: "Uhrzeit",
    today: "Heute",
    tomorrow: "Morgen",
    yesterday: "Gestern",
    loading: "Laden...",
    error: "Fehler",
    retry: "Wiederholen",
    languageSelector: "Sprachauswahl",
    languages: {
      fr: "Französisch",
      en: "Englisch",
      es: "Spanisch",
      de: "Deutsch",
      pt: "Br Portugiesisch",
      zh: "Chinesisch",
      ja: "Japanisch"
    },
  },
  bus: {
    noBusAvailable: "Derzeit keine Busse verfügbar",
    alreadyPassed: "Busse bereits abgefahren",
    scroll: "scrollen",
    terminus: "Endstation",
    nextStop: "Nächste Haltestelle",
    currentStop: "Aktuelle Haltestelle",
    offline: {
      cache: "Sie sind offline. Anzeige der zwischengespeicherten Daten.",
      detected: "Offline-Modus erkannt"
    },
    online: {
      detected: "Wieder online erkannt"
    },
    error: {
      cache: "Fehler beim Abrufen der Fahrpläne. Verwendung der zwischengespeicherten Daten."
    },
    using: {
      cache: "Verwendung der letzten verfügbaren Daten:"
    },
    status: {
      onTime: "Pünktlich",
      delayed: "Verspätet",
      early: "Früh",
      cancelled: "Storniert",
      passed: "Vorbei",
      unknown: "Unbekannt",
      programmed: "Geplant",
      description: {
        onTime: "Der Bus ist pünktlich",
        late: "Der Bus hat {{minutes}} Minuten Verspätung",
        early: "Der Bus ist {{minutes}} Minuten zu früh",
        delayed: "Der Bus ist verspätet",
        cancelled: "Der Bus ist storniert",
        passed: "Der Bus ist bereits abgefahren",
        unknown: "Der Busstatus ist unbekannt",
        programmed: "Der Bus ist geplant"
      }
    },
    delay: {
      late: "Verspätung",
      early: "Früh",
      minute: "Min",
      minutes: "Min",
    },
    card: {
      label: "Bus {{id}} nach {{terminus}}"
    },
    times: {
      label: "Busfahrzeiten"
    },
    stops: {
      label: "Bushaltestellen",
      description: "Liste von {{total}} Bushaltestellen",
      visualizer: "Bushaltestellen-Visualisierung",
      selected: "Ausgewählte Haltestelle: {{stop}}",
      departure: "Abfahrt: {{stop}}",
      terminus: "Endstation: {{stop}}",
      intermediate: "Haltestelle {{position}} von {{total}}: {{stop}}",
      current: "Aktuelle Haltestelle {{position}} von {{total}}: {{stop}}"
    },
    currentStopInfo: {
      label: "Haltestelle {{current}} von {{total}}: {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Verbunden",
      disconnected: "Getrennt",
      loading: "Laden",
      updating: "Aktualisieren",
      error: "Fehler",
    },
  },
  company: {
    all: "Alle",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Andere",
    filter: {
      label: "Nach Busunternehmen filtern",
      button: "Nach {{company}} filtern"
    }
  },
  info: {
    description: "Diese Anwendung wurde von Thiefaine Simonnou entwickelt, um eine einfache und effiziente Lösung für die Verfolgung der Busfahrpläne am Busbahnhof Sabines in Montpellier zu bieten. Das Ziel ist es, die Informationen für alle auf klare und intuitive Weise zugänglich zu machen.",
    titles: {
      all: "Alle",
      about: "Über",
      site: "Meine Website",
      github: "Mein GitHub",
      short: {
        all: "All",
      },
    },
  },
}; 