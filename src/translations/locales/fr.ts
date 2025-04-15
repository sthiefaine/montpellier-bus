export default {
  common: {
    update: "Mise à jour",
    cache: "Cache",
    minute: "minute",
    minutes: "minutes",
    hour: "heure",
    hours: "heures",
    day: "jour",
    days: "jours",
    ago: {
      now: "À l'instant",
      minute: "il y a {{minutes}} minute",
      minutes: "il y a {{minutes}} minutes",
      hour: "il y a {{hours}} heure",
      hours: "il y a {{hours}} heures",
      day: "il y a {{days}} jour",
      days: "il y a {{days}} jours",
    },
    info: "Infos",
    back: "Retour",
    time: "Heure",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    yesterday: "Hier",
    loading: "Chargement...",
    error: "Erreur",
    retry: "Réessayer",
    languageSelector: "Sélecteur de langue",
    languages: {
      fr: "Français",
      en: "Anglais",
      es: "Espagnol",
      de: "Allemand",
      pt: "Portugais Br",
      zh: "Chinois",
      ja: "Japonais"
    },
  },
  bus: {
    noBusAvailable: "Aucun bus disponible pour le moment",
    alreadyPassed: "bus déjà passés",
    scroll: "défiler",
    terminus: "Terminus",
    nextStop: "Prochain arrêt",
    currentStop: "Arrêt actuel",
    offline: {
      cache: "Vous êtes hors ligne. Affichage des données en cache.",
      detected: "Passage hors ligne détecté"
    },
    online: {
      detected: "Retour en ligne détecté"
    },
    error: {
      cache: "Erreur lors de la récupération des horaires. Utilisation des données en cache."
    },
    using: {
      cache: "Utilisation des dernières données disponibles :"
    },
    status: {
      onTime: "À l'heure",
      delayed: "Retard",
      early: "En avance",
      cancelled: "Annulé",
      passed: "Passé",
      unknown: "Inconnu",
      programmed: "Programmé",
      description: {
        onTime: "Le bus est à l'heure",
        late: "Le bus a {{minutes}} minutes de retard",
        early: "Le bus a {{minutes}} minutes d'avance",
        delayed: "Le bus est en retard",
        cancelled: "Le bus est annulé",
        passed: "Le bus est déjà passé",
        unknown: "Le statut du bus est inconnu",
        programmed: "Le bus est programmé",
      }
    },
    delay: {
      late: "Retard",
      early: "Avance",
      minute: "min",
      minutes: "mins",
    },
    card: {
      label: "Bus {{id}} à destination de {{terminus}}"
    },
    times: {
      label: "Horaires du bus"
    },
    stops: {
      label: "Arrêts du bus",
      description: "Liste des {{total}} arrêts du bus",
      visualizer: "Visualisation des arrêts du bus",
      selected: "Arrêt sélectionné : {{stop}}",
      departure: "Départ : {{stop}}",
      terminus: "Terminus : {{stop}}",
      intermediate: "Arrêt {{position}} sur {{total}} : {{stop}}",
      current: "Arrêt actuel {{position}} sur {{total}} : {{stop}}"
    },
    currentStopInfo: {
      label: "Arrêt {{current}} sur {{total}} : {{stop}}"
    }
  },
  server: {
    status: {
      connected: "Connecté",
      disconnected: "Déconnecté",
      loading: "Chargement",
      updating: "Mise à jour",
      error: "Erreur",
    },
  },
  company: {
    all: "Toutes",
    flixbus: "FlixBus",
    blablabus: "BlaBlaBus",
    other: "Autre",
    filter: {
      label: "Filtre par compagnie de bus",
      button: "Filtrer par {{company}}"
    }
  },
  info: {
    description: "Cette application a été développée par Thiefaine Simonnou dans le but de fournir une solution simple et efficace pour suivre les horaires des bus de la gare routière Sabines à Montpellier. L'objectif est de rendre l'information accessible à tous de manière claire et intuitive.",
    titles: {
      all: "Tous",
      about: "À propos",
      site: "Mon site web",
      github: "Mon GitHub",
      short: {
        all: "All",
      },
    },
  },
};