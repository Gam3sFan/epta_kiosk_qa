import flagEn from '../../assets/flags/gb.svg';
import flagIt from '../../assets/flags/it.svg';
import flagEs from '../../assets/flags/es.svg';
import flagFr from '../../assets/flags/fr.svg';
import flagDe from '../../assets/flags/de.svg';

export const SCREENS = {
  HERO: 'hero',
  QUESTION_A: 'question-a',
  QUESTION_B: 'question-b',
  RESULT: 'result',
};

<<<<<<< HEAD
export const TIME_OPTIONS_BASE = [{ id: 'express' }, { id: 'standard' }, { id: 'extended' }, { id: 'no-limit' }];
=======
export const TIME_OPTIONS_BASE = [
  { id: '15' },
  { id: '30' },
  { id: '60' },
  { id: 'no-limit' },
];
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)

export const EXPERIENCE_OPTIONS_BASE = [
  { id: 'highlights', resultKey: 'essential' },
  { id: 'retail', resultKey: 'retail' },
  { id: 'tech', resultKey: 'tech' },
  { id: 'specialty', resultKey: 'specialty' },
  { id: 'convenience', resultKey: 'convenience' },
  { id: 'immersive', resultKey: 'grandTour' },
];

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: flagEn },
  { code: 'it', label: 'Italiano', flag: flagIt },
  { code: 'es', label: 'Español', flag: flagEs },
  { code: 'fr', label: 'Français', flag: flagFr },
  { code: 'de', label: 'Deutsch', flag: flagDe },
];

export const TEXTS = {
  en: {
    hero: {
      eyebrow: 'Welcome to EuroShop 2026',
      title: 'Shape your booth experience',
      subtitle:
        'A guided kiosk inspired by the Epta experience. Tap start and answer two quick questions to craft your visit.',
    },
    stepLabel: 'Step',
    questions: {
      q0: {
        eyebrow: 'Question 01',
        title: 'How much time do you have?',
        subtitle: 'Tap an option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'What kind of experience would you like to start with?',
        subtitleSingle: 'Tap one or multiple option.',
        subtitleMulti: 'Tap one or multiple option.',
      },
    },
    helpers: {
      q0: 'Choose the time you have available.',
      q2Single: 'Select one experience to continue.',
      q2Multi: 'Select multiple experiences to combine different paths.',
    },
    buttons: {
      start: 'Cross the Gateway',
      back: 'Back',
      showResult: 'Show result',
      restart: 'Restart flow',
    },
    result: {
      eyebrow: 'Your tailored route',
      title: 'Ready to explore',
      subtitle: 'Show this screen to an ambassador to begin the suggested path.',
      emptyTitle: 'Pick an experience first',
      emptyBody: 'Return to the previous step and let us know which journey you want to focus on.',
    },
    timeOptions: {
      15: {
        label: 'Only 15 minutes',
      },
      30: {
        label: 'Around 30 minutes',
      },
      60: {
        label: 'Around 1 hour',
      },
      extended: {
        label: 'Around 1 hour',
        description: 'A deeper dive into the ecosystem.',
      },
      'no-limit': {
        label: 'No time pressure',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Must-see highlights',
      },
      retail: {
        label: 'Retail solutions walkthrough',
      },
      tech: {
        label: 'Technical deep dives',
      },
      immersive: {
        label: 'A full, immersive tour',
      },
      convenience: {
        label: 'Convenience store innovations',
      },
      specialty: {
        label: 'Specialty shop experiences',
      },
    },
    results: {
      essential: {
        title: 'The Essential Trail',
        body: "Your hand-picked map of the top highlights you can't miss.",
        kicker: 'Highlights first',
      },
      retail: {
        title: 'The Retail Explorer Path',
        body: 'A guided loop through complete, integrated end-to-end solutions.',
        kicker: 'Store blueprints',
      },
      tech: {
        title: 'The Tech Insider Route',
        body: 'Perfect if you want to understand the mechanics behind the world of retail.',
        kicker: 'For makers & engineers',
      },
      convenience: {
        title: 'The Convenience Compass',
        body: 'A quick, dynamic trail spotlighting innovations for convenience and grab-and-go formats.',
        kicker: 'Grab & go focus',
      },
      specialty: {
        title: 'The Specialty Shop Path',
        body: 'A curated journey into premium and high-engagement specialty shop experiences.',
        kicker: 'High-touch stories',
      },
      grandTour: {
        title: 'The Grand Tour',
        body: 'The most immersive and comprehensive experience of the booth (not suggested if you have time limits).',
        kicker: 'All-in adventure',
      },
    },
  },
  it: {
    hero: {
      eyebrow: 'Benvenuto a EuroShop 2026',
      title: 'Personalizza la tua esperienza allo stand',
      subtitle:
        "Un kiosk guidato ispirato all'esperienza Epta. Premi Start e rispondi a due domande veloci per progettare la tua visita.",
    },
    stepLabel: 'Passo',
    questions: {
      q0: {
        eyebrow: 'Domanda 01',
        title: 'Quanto tempo hai a disposizione?',
        subtitle: "Tocca un'opzione.",
      },
      q2: {
        eyebrow: 'Domanda 02',
        title: 'Con quale tipo di esperienza vorresti iniziare?',
<<<<<<< HEAD
        subtitleSingle: 'Scegli un solo percorso in base al tempo.',
        subtitleMulti: 'Senza limiti di tempo puoi selezionare più percorsi.',
      },
    },
    helpers: {
      q1: "Scegli la fascia di tempo. Con 'Solo 15 minuti' o 'Intorno alla mezz'ora' la domanda successiva accetta una sola scelta.",
      q2Single: 'In base al tempo a disposizione, seleziona un solo punto di partenza per la visita.',
      q2Multi:
        'Senza limiti di tempo puoi combinare più esperienze. Scegline fino a due, o più di due per attivare il Grand Tour.',
=======
        subtitleSingle: 'Tocca una o più opzioni.',
        subtitleMulti: 'Tocca una o più opzioni.',
      },
    },
    helpers: {
      q0: 'Indica il tempo che hai a disposizione.',
      q2Single: 'Seleziona una sola esperienza per continuare.',
      q2Multi: 'Seleziona più esperienze per combinarle.',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
    },
    buttons: {
      start: 'Start',
      back: 'Indietro',
      showResult: 'Mostra risultato',
      restart: 'Ricomincia il percorso',
    },
    result: {
      eyebrow: 'Il tuo itinerario su misura',
      title: 'Pronto a esplorare',
      subtitle: 'Mostra questa schermata a un ambassador per iniziare il percorso consigliato.',
      emptyTitle: "Seleziona prima un'esperienza",
      emptyBody: 'Torna al passo precedente e raccontaci quale percorso vuoi prioritizzare.',
    },
    timeOptions: {
      15: {
        label: 'Solo 15 minuti',
      },
<<<<<<< HEAD
      standard: {
        label: "Intorno alla mezz'ora",
        description: 'Tempo sufficiente per una presentazione completa.',
=======
      30: {
        label: "Intorno alla mezz'ora",
      },
      60: {
        label: 'Circa 1 ora',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
      extended: {
        label: 'Circa 1 ora',
        description: 'Un approfondimento completo dell\'ecosistema.',
      },
      'no-limit': {
        label: 'Non ho fretta',
<<<<<<< HEAD
        description: 'Ritmo libero e possibilità di combinare più esperienze.',
=======
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Assolutamente da vedere',
<<<<<<< HEAD
        description: 'Parti dalle novità di cui parlano tutti.',
      },
      retail: {
        label: 'Panoramica delle soluzioni retail',
        description: 'Segui il viaggio completo delle soluzioni integrate Epta.',
=======
      },
      retail: {
        label: 'Panoramica delle soluzioni retail',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
      tech: {
        label: 'Approfondimenti tecnici',
      },
      immersive: {
        label: 'Un tour completo a 360 gradi',
<<<<<<< HEAD
        description: 'Vivi tutto, dalle hero stories ai dettagli più nascosti.',
      },
      convenience: {
        label: 'Innovazioni nei minimarket',
        description: 'Focus rapido su format grab-and-go e soluzioni veloci.',
      },
      specialty: {
        label: 'Esperienze nei negozi specializzati',
        description: 'Un percorso curato per ambienti premium e ad alto coinvolgimento.',
=======
      },
      convenience: {
        label: 'Innovazioni nei minimarket',
      },
      specialty: {
        label: 'Esperienze nei negozi specializzati',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    results: {
      essential: {
        title: 'Il Sentiero Essenziale',
        body: 'La tua mappa personalizzata con gli highlight da non perdere.',
        kicker: 'Highlights prioritari',
      },
      retail: {
        title: 'Il Percorso Retail Explorer',
        body: 'Un circuito guidato attraverso soluzioni integrate end-to-end.',
        kicker: 'Blueprint del negozio',
      },
      tech: {
        title: 'La Rotta Tech Insider',
        body: 'Perfetta per capire la meccanica che muove il mondo del retail.',
        kicker: 'Per maker e ingegneri',
      },
      convenience: {
        title: 'La Bussola Convenience',
        body: 'Un trail dinamico sulle innovazioni per format grab-and-go.',
        kicker: 'Focus convenience',
      },
      specialty: {
        title: 'Il Sentiero Specialty Shop',
        body: 'Un viaggio curato dentro ambienti premium e ad alto coinvolgimento.',
        kicker: 'Esperienze high-touch',
      },
      grandTour: {
        title: 'Il Grand Tour',
        body: "L'esperienza più immersiva e completa dello stand (non consigliata se hai limiti di tempo).",
        kicker: 'Avventura completa',
      },
    },
  },
  es: {
    hero: {
      eyebrow: 'Bienvenido a EuroShop 2026',
      title: 'Diseña tu experiencia en el stand',
      subtitle:
        'Un quiosco guiado inspirado en la experiencia Epta. Pulsa iniciar y responde dos preguntas rápidas para definir tu visita.',
    },
    stepLabel: 'Paso',
    questions: {
      q0: {
        eyebrow: 'Pregunta 01',
        title: '¿Cuánto tiempo tienes?',
        subtitle: 'Toca una opción.',
      },
      q2: {
        eyebrow: 'Pregunta 02',
        title: '¿Con qué tipo de experiencia te gustaría empezar?',
<<<<<<< HEAD
        subtitleSingle: 'Elige un único camino según tu disponibilidad.',
        subtitleMulti: 'Sin límite de tiempo puedes seleccionar varias opciones.',
=======
        subtitleSingle: 'Toca una o varias opciones.',
        subtitleMulti: 'Toca una o varias opciones.',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    helpers: {
      q0: 'Indica el tiempo que tienes disponible.',
      q2Single: 'Selecciona una sola experiencia para continuar.',
      q2Multi: 'Selecciona varias experiencias para combinarlas.',
    },
    buttons: {
      start: 'Iniciar',
      back: 'Atrás',
      showResult: 'Mostrar resultado',
      restart: 'Reiniciar flujo',
    },
    result: {
      eyebrow: 'Tu ruta a medida',
      title: 'Listo para explorar',
      subtitle: 'Muestra esta pantalla a un embajador para iniciar el recorrido sugerido.',
      emptyTitle: 'Elige antes una experiencia',
      emptyBody: 'Regresa al paso anterior y cuéntanos qué recorrido deseas priorizar.',
    },
    timeOptions: {
      15: {
        label: 'Solo 15 minutos',
      },
      30: {
        label: 'Unos 30 minutos',
      },
      60: {
        label: 'Alrededor de 1 hora',
      },
      extended: {
        label: 'Aproximadamente 1 hora',
        description: 'Una inmersión más profunda en el ecosistema.',
      },
      'no-limit': {
<<<<<<< HEAD
        label: 'No tengo prisa',
        description: 'Tómate todo el tiempo y combina varias experiencias.',
=======
        label: 'Sin presión de tiempo',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Lo más destacado, lo que no te puedes perder',
<<<<<<< HEAD
        description: 'Empieza con lo esencial de lo que todos hablan.',
      },
      retail: {
        label: 'Guía de soluciones para minoristas',
        description: 'Sigue el circuito completo de las soluciones integrales de Epta.',
      },
      tech: {
        label: 'Análisis técnicos en profundidad',
        description: 'Perfecto para ingenieros y mentes curiosas.',
      },
      immersive: {
        label: 'Una visita completa y envolvente',
        description: 'Vívelo todo, de las historias principales a los detalles ocultos.',
      },
      convenience: {
        label: 'Innovaciones en las tiendas de conveniencia',
        description: 'Un recorrido ágil por los formatos grab-and-go.',
      },
      specialty: {
        label: 'Experiencias en tiendas especializadas',
        description: 'Un viaje curado para espacios premium y de alto engagement.',
=======
      },
      retail: {
        label: 'Guía de soluciones para minoristas',
      },
      tech: {
        label: 'Análisis técnicos en profundidad',
      },
      immersive: {
        label: 'Una visita completa y envolvente',
      },
      convenience: {
        label: 'Innovaciones en las tiendas de conveniencia',
      },
      specialty: {
        label: 'Experiencias en tiendas especializadas',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    results: {
      essential: {
        title: 'La Ruta Esencial',
        body: 'Tu mapa seleccionado con los highlights que no puedes perderte.',
        kicker: 'Highlights primero',
      },
      retail: {
        title: 'El Camino Retail Explorer',
        body: 'Un bucle guiado por soluciones completas e integradas.',
        kicker: 'Planos de la tienda',
      },
      tech: {
        title: 'La Ruta Tech Insider',
        body: 'Perfecta si quieres entender la mecánica detrás del retail.',
        kicker: 'Para makers e ingenieros',
      },
      convenience: {
        title: 'La Brújula Convenience',
        body: 'Un trail dinámico que destaca innovaciones para el grab-and-go.',
        kicker: 'Enfoque convenience',
      },
      specialty: {
        title: 'La Ruta Specialty Shop',
        body: 'Un recorrido curado dentro de espacios premium y de alto engagement.',
        kicker: 'Experiencias high-touch',
      },
      grandTour: {
        title: 'El Grand Tour',
        body: 'La experiencia más inmersiva y completa del stand (no se sugiere si tienes poco tiempo).',
        kicker: 'Aventura total',
      },
    },
  },
  fr: {
    hero: {
      eyebrow: 'Bienvenue à EuroShop 2026',
      title: 'Composez votre expérience sur le stand',
      subtitle:
        "Un kiosque guidé inspiré par l'expérience Epta. Appuyez sur Start et répondez à deux questions rapides pour préparer votre visite.",
    },
    stepLabel: 'Étape',
    questions: {
      q0: {
        eyebrow: 'Question 01',
        title: 'Combien de temps avez-vous ?',
        subtitle: 'Touchez une option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: "Par quel type d'expérience souhaitez-vous commencer ?",
<<<<<<< HEAD
        subtitleSingle: 'Choisissez un seul parcours en fonction de votre temps.',
        subtitleMulti: 'Sans contrainte de temps, vous pouvez sélectionner plusieurs parcours.',
=======
        subtitleSingle: 'Touchez une ou plusieurs options.',
        subtitleMulti: 'Touchez une ou plusieurs options.',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    helpers: {
      q0: 'Indiquez le temps dont vous disposez.',
      q2Single: 'Choisissez une seule expérience pour continuer.',
      q2Multi: 'Sélectionnez plusieurs expériences pour les combiner.',
    },
    buttons: {
      start: 'Démarrer',
      back: 'Retour',
      showResult: 'Afficher le résultat',
      restart: 'Recommencer le parcours',
    },
    result: {
      eyebrow: 'Votre parcours personnalisé',
      title: "Prêt pour l'exploration",
      subtitle: 'Montrez cet écran à un ambassadeur pour démarrer le parcours suggéré.',
      emptyTitle: "Choisissez d'abord une expérience",
      emptyBody: "Retournez à l'étape précédente et dites-nous quel parcours vous voulez privilégier.",
    },
    timeOptions: {
      15: {
        label: 'Seulement 15 minutes',
      },
      30: {
        label: 'Environ 30 minutes',
      },
      60: {
        label: 'Environ 1 heure',
      },
      extended: {
        label: 'Environ 1 heure',
        description: 'Une plongée plus profonde dans l\'écosystème.',
      },
      'no-limit': {
        label: 'Pas de contrainte de temps',
<<<<<<< HEAD
        description: 'Prenez votre temps et combinez plusieurs expériences.',
=======
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Les incontournables',
<<<<<<< HEAD
        description: 'Commencez par les essentiels dont tout le monde parle.',
      },
      retail: {
        label: 'Présentation des solutions pour le commerce de détail',
        description: 'Suivez le circuit complet des solutions intégrées Epta.',
      },
      tech: {
        label: 'Analyses techniques approfondies',
        description: 'Parfait pour les ingénieurs et les esprits curieux.',
      },
      immersive: {
        label: 'Une visite complète et immersive',
        description: 'Voyez tout, des hero stories aux détails cachés.',
      },
      convenience: {
        label: 'Innovations dans les magasins de proximité',
        description: 'Un trajet dynamique dédié aux formats grab-and-go.',
      },
      specialty: {
        label: 'Expériences dans les boutiques spécialisées',
        description: 'Un voyage soigné pour les espaces premium et à forte implication.',
=======
      },
      retail: {
        label: 'Présentation des solutions pour le commerce de détail',
      },
      tech: {
        label: 'Analyses techniques approfondies',
      },
      immersive: {
        label: 'Une visite complète et immersive',
      },
      convenience: {
        label: 'Innovations dans les magasins de proximité',
      },
      specialty: {
        label: 'Expériences dans les boutiques spécialisées',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    results: {
      essential: {
        title: 'La Route Essentielle',
        body: 'Votre carte personnalisée des incontournables à ne pas manquer.',
        kicker: "Essentiels d'abord",
      },
      retail: {
        title: 'Le Parcours Retail Explorer',
        body: 'Une boucle guidée à travers des solutions complètes et intégrées.',
        kicker: 'Plans du magasin',
      },
      tech: {
        title: 'La Route Tech Insider',
        body: "Idéale pour comprendre la mécanique derrière l'univers du retail.",
        kicker: 'Pour makers et ingénieurs',
      },
      convenience: {
        title: 'La Boussole Convenience',
        body: 'Un circuit rapide mettant en lumière les innovations pour le grab-and-go.',
        kicker: 'Focus convenience',
      },
      specialty: {
        title: 'Le Chemin Specialty Shop',
        body: 'Un parcours curaté au cœur des espaces premium et haute implication.',
        kicker: 'Expériences high-touch',
      },
      grandTour: {
        title: 'Le Grand Tour',
        body: "L'expérience la plus immersive et complète du stand (déconseillée si vous manquez de temps).",
        kicker: 'Aventure totale',
      },
    },
  },
  de: {
    hero: {
      eyebrow: 'Willkommen auf der EuroShop 2026',
      title: 'Gestalte dein Booth-Erlebnis',
      subtitle:
        'Ein geführtes Kiosk inspiriert von der Epta Experience. Tippe auf Start und beantworte zwei kurze Fragen für deinen Rundgang.',
    },
    stepLabel: 'Schritt',
    questions: {
      q0: {
        eyebrow: 'Frage 01',
        title: 'Wie viel Zeit haben Sie zur Verfügung?',
<<<<<<< HEAD
        subtitle: 'Das bestimmt das Tempo des Besuchs.',
=======
        subtitle: 'Tippe auf eine Option.',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
      q2: {
        eyebrow: 'Frage 02',
        title: 'Mit welcher Art von Erlebnis möchten Sie beginnen?',
<<<<<<< HEAD
        subtitleSingle: 'Wähle einen Pfad, der zu deiner Zeit passt.',
        subtitleMulti: 'Ohne Zeitlimit kannst du mehrere Pfade kombinieren.',
      },
    },
    helpers: {
      q1: "Wähle einen Zeitrahmen. Bei 'Nur 15 Minuten' oder 'Ungefähr 30 Minuten' ist im nächsten Schritt nur eine Auswahl möglich.",
      q2Single: 'Basierend auf deiner Zeit kannst du nur einen Startpunkt wählen.',
      q2Multi:
        'Ohne Zeitdruck darfst du bis zu zwei Erlebnisse kombinieren oder mehr als zwei für den Grand Tour wählen.',
=======
        subtitleSingle: 'Tippe auf eine oder mehrere Optionen.',
        subtitleMulti: 'Tippe auf eine oder mehrere Optionen.',
      },
    },
    helpers: {
      q0: 'Gib an, wie viel Zeit du hast.',
      q2Single: 'Wähle ein Erlebnis, um fortzufahren.',
      q2Multi: 'Wähle mehrere Erlebnisse, um sie zu kombinieren.',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
    },
    buttons: {
      start: 'Start',
      back: 'Zurück',
      showResult: 'Ergebnis anzeigen',
      restart: 'Flow neu starten',
    },
    result: {
      eyebrow: 'Deine kuratierte Route',
      title: 'Bereit für die Erkundung',
      subtitle: 'Zeige diesen Screen einem Ambassador, um mit dem empfohlenen Pfad zu beginnen.',
      emptyTitle: 'Wähle zuerst ein Erlebnis',
      emptyBody: 'Gehe einen Schritt zurück und sag uns, welcher Pfad prioritisiert werden soll.',
    },
    timeOptions: {
      15: {
        label: 'Nur 15 Minuten',
      },
<<<<<<< HEAD
      standard: {
        label: 'Ungefähr 30 Minuten',
        description: 'Genug Zeit für eine komplette Vorstellung.',
=======
      30: {
        label: 'Rund 30 Minuten',
      },
      60: {
        label: 'Etwa 1 Stunde',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
      extended: {
        label: 'Ungefähr 1 Stunde',
        description: 'Ein tieferer Einblick in das Ökosystem.',
      },
      'no-limit': {
<<<<<<< HEAD
        label: 'Ich habe keinen Zeitdruck',
        description: 'Nimm dir alle Zeit und kombiniere mehrere Erlebnisse.',
=======
        label: 'Kein Zeitdruck',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Unverzichtbare Highlights',
      },
      retail: {
        label: 'Überblick der Lösungen für den Einzelhandel',
<<<<<<< HEAD
        description: 'Folge dem kompletten Loop der integrierten Epta Lösungen.',
      },
      tech: {
        label: 'Detaillierte technische Einblicke',
        description: 'Ideal für Ingenieure und neugierige Köpfe.',
      },
      immersive: {
        label: 'Eine umfassende, 360-Grad-Tour',
        description: 'Sieh alles, von Hero Stories bis zu versteckten Details.',
      },
      convenience: {
        label: 'Innovationen im Convenience-Store-Bereich',
        description: 'Ein schneller Blick auf Konzepte für Grab-and-go.',
      },
      specialty: {
        label: 'Erlebnisse für Fachgeschäfte',
        description: 'Ein kuratierter Weg für Premium- und Erlebnisflächen.',
=======
      },
      tech: {
        label: 'Detaillierte technische Einblicke',
      },
      immersive: {
        label: 'Eine umfassende, 360-Grad-Tour',
      },
      convenience: {
        label: 'Innovationen im Convenience-Store-Bereich',
      },
      specialty: {
        label: 'Erlebnisse für Fachgeschäfte',
>>>>>>> d5b2335 (aggiunta video tradotti per ogni lingua, nuova UI, fixing vari, ancora WIP)
      },
    },
    results: {
      essential: {
        title: 'Die Essential Route',
        body: 'Deine kuratierte Karte mit den wichtigsten Highlights.',
        kicker: 'Highlights zuerst',
      },
      retail: {
        title: 'Der Retail Explorer Pfad',
        body: 'Ein geführter Loop durch komplette, integrierte Lösungen.',
        kicker: 'Store-Blueprints',
      },
      tech: {
        title: 'Die Tech Insider Route',
        body: 'Perfekt, wenn du die Mechanik hinter dem Retail verstehen willst.',
        kicker: 'Für Maker & Ingenieure',
      },
      convenience: {
        title: 'Der Convenience Kompass',
        body: 'Ein dynamischer Pfad zu Innovationen für Convenience und Grab-and-go.',
        kicker: 'Convenience Fokus',
      },
      specialty: {
        title: 'Der Specialty Shop Pfad',
        body: 'Ein kuratiertes Erlebnis für Premium- und High-Engagement-Flächen.',
        kicker: 'High-Touch Experiences',
      },
      grandTour: {
        title: 'Die Grand Tour',
        body: 'Das immersivste und umfassendste Erlebnis des Stands (nicht empfohlen bei wenig Zeit).',
        kicker: 'All-in Erlebnis',
      },
    },
  },
};
