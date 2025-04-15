export default {
  common: {
    update: "Actualización",
    cache: "Caché",
    minute: "minuto",
    minutes: "minutos",
    hour: "hora",
    hours: "horas",
    day: "día",
    days: "días",
    ago: {
      now: "Ahora mismo",
      minute: "hace {{minutes}} minuto",
      minutes: "hace {{minutes}} minutos",
      hour: "hace {{hours}} hora",
      hours: "hace {{hours}} horas",
      day: "hace {{days}} día",
      days: "hace {{days}} días",
    },
    info: "Información",
    back: "Volver",
    time: "Hora",
    today: "Hoy",
    tomorrow: "Mañana",
    yesterday: "Ayer",
    loading: "Cargando...",
    error: "Error",
    retry: "Reintentar",
    languageSelector: "Selector de idioma",
    languages: {
      fr: "Francés",
      en: "Inglés",
      es: "Español",
      de: "Alemán",
      pt: "Portugués Br",
      zh: "Chino",
      ja: "Japonés"
    },
  },
  bus: {
    noBusAvailable: "No hay autobuses disponibles en este momento",
    alreadyPassed: "autobuses ya pasados",
    scroll: "desplazar",
    terminus: "Terminal",
    nextStop: "Próxima parada",
    currentStop: "Parada actual",
    offline: {
      cache: "Estás sin conexión. Mostrando datos en caché.",
      detected: "Modo sin conexión detectado"
    },
    online: {
      detected: "Conexión restaurada detectada"
    },
    error: {
      cache: "Error al recuperar los horarios. Usando datos en caché."
    },
    using: {
      cache: "Usando los últimos datos disponibles:"
    },
    status: {
      onTime: "A tiempo",
      delayed: "Retrasado",
      early: "Adelantado",
      cancelled: "Cancelado",
      passed: "Pasado",
      unknown: "Desconocido",
      programmed: "Programado",
      description: {
        onTime: "El autobús está a tiempo",
        late: "El autobús tiene {{minutes}} minutos de retraso",
        early: "El autobús tiene {{minutes}} minutos de adelanto",
        delayed: "El autobús está retrasado",
        cancelled: "El autobús está cancelado",
        passed: "El autobús ya ha pasado",
        unknown: "El estado del autobús es desconocido",
        programmed: "El autobús está programado"
      }
    },
    delay: {
      late: "Retraso",
      early: "Adelanto",
      minute: "min",
      minutes: "mins",
    },
    card: {
      label: "Autobús {{id}} con destino a {{terminus}}"
    },
    times: {
      label: "Horarios del autobús"
    },
    stops: {
      label: "Paradas del autobús",
      description: "Lista de {{total}} paradas de autobús",
      visualizer: "Visualización de paradas de autobús",
      selected: "Parada seleccionada: {{stop}}",
      departure: "Salida: {{stop}}",
      terminus: "Terminal: {{stop}}",
      intermediate: "Parada {{position}} de {{total}}: {{stop}}",
      current: "Parada actual {{position}} de {{total}}: {{stop}}"
    },
    currentStopInfo: {
      label: "Parada {{current}} de {{total}}: {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Conectado",
      disconnected: "Desconectado",
      loading: "Cargando",
      updating: "Actualizando",
      error: "Error",
    },
  },
  company: {
    all: "Todas",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Otra",
    filter: {
      label: "Filtrar por compañía de autobuses",
      button: "Filtrar por {{company}}"
    }
  },
  info: {
    description: "Esta aplicación fue desarrollada por Thiefaine Simonnou con el objetivo de proporcionar una solución simple y eficiente para seguir los horarios de los autobuses en la estación de autobuses Sabines en Montpellier. El objetivo es hacer que la información sea accesible para todos de manera clara e intuitiva.",
    titles: {
      all: "Todos",
      about: "Acerca de",
      site: "Mi sitio web",
      github: "Mi GitHub",
      short: {
        all: "All",
      },
    },
  },
}; 