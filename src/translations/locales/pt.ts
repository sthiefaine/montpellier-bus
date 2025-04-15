export default {
  common: {
    update: "Atualização",
    cache: "Cache",
    minute: "minuto",
    minutes: "minutos",
    hour: "hora",
    hours: "horas",
    day: "dia",
    days: "dias",
    ago: {
      now: "Agora mesmo",
      minute: "há {{minutes}} minuto",
      minutes: "há {{minutes}} minutos",
      hour: "há {{hours}} hora",
      hours: "há {{hours}} horas",
      day: "há {{days}} dia",
      days: "há {{days}} dias",
    },
    info: "Informação",
    back: "Voltar",
    time: "Hora",
    today: "Hoje",
    tomorrow: "Amanhã",
    yesterday: "Ontem",
    loading: "Carregando...",
    error: "Erro",
    retry: "Tentar novamente",
    languageSelector: "Seletor de idioma",
    languages: {
      fr: "Francês",
      en: "Inglês",
      es: "Espanhol",
      de: "Alemão",
      pt: "Português Br",
      zh: "Chinês",
      ja: "Japonês"
    },
  },
  bus: {
    noBusAvailable: "Nenhum ônibus disponível no momento",
    alreadyPassed: "ônibus já passados",
    scroll: "rolar",
    terminus: "Terminal",
    nextStop: "Próxima parada",
    currentStop: "Parada atual",
    offline: {
      cache: "Você está offline. Exibindo dados em cache.",
      detected: "Modo offline detectado"
    },
    online: {
      detected: "Conexão restaurada detectada"
    },
    error: {
      cache: "Erro ao recuperar os horários. Usando dados em cache."
    },
    using: {
      cache: "Usando os últimos dados disponíveis:"
    },
    status: {
      onTime: "No horário",
      delayed: "Atrasado",
      early: "Adiantado",
      cancelled: "Cancelado",
      passed: "Passado",
      unknown: "Desconhecido",
      programmed: "Programado",
      description: {
        onTime: "O ônibus está no horário",
        late: "O ônibus está {{minutes}} minutos atrasado",
        early: "O ônibus está {{minutes}} minutos adiantado",
        delayed: "O ônibus está atrasado",
        cancelled: "O ônibus está cancelado",
        passed: "O ônibus já passou",
        unknown: "O status do ônibus é desconhecido"
      }
    },
    delay: {
      late: "Atraso",
      early: "Adiantado",
      minute: "min",
      minutes: "min",
    },
    card: {
      label: "Ônibus {{id}} com destino a {{terminus}}"
    },
    times: {
      label: "Horários dos ônibus"
    },
    stops: {
      label: "Paradas de ônibus",
      description: "Lista de {{total}} paradas de ônibus",
      visualizer: "Visualização das paradas de ônibus",
      selected: "Parada selecionada: {{stop}}",
      departure: "Partida: {{stop}}",
      terminus: "Terminal: {{stop}}",
      intermediate: "Parada {{position}} de {{total}}: {{stop}}",
      current: "Parada atual {{position}} de {{total}}: {{stop}}"
    },
    currentStopInfo: {
      label: "Parada {{current}} de {{total}}: {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Conectado",
      disconnected: "Desconectado",
      loading: "Carregando",
      updating: "Atualizando",
      error: "Erro",
    },
  },
  company: {
    all: "Todas",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Outra",
    filter: {
      label: "Filtrar por empresa de ônibus",
      button: "Filtrar por {{company}}"
    }
  },
  info: {
    description: "Este aplicativo foi desenvolvido por Thiefaine Simonnou com o objetivo de fornecer uma solução simples e eficiente para acompanhar os horários dos ônibus na estação de ônibus Sabines em Montpellier. O objetivo é tornar as informações acessíveis a todos de forma clara e intuitiva.",
    titles: {
      all: "Todos",
      about: "Sobre",
      site: "Meu site",
      github: "Meu GitHub",
      short: {
        all: "All",
      },
    },
  },
}; 