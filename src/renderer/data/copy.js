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

export const TIME_OPTIONS_BASE = [{ id: 'express' }, { id: 'standard' }, { id: 'no-limit' }];

export const EXPERIENCE_OPTIONS_BASE = [
  { id: 'highlights', resultKey: 'essential' },
  { id: 'retail', resultKey: 'retail' },
  { id: 'tech', resultKey: 'tech' },
  { id: 'immersive', resultKey: 'grandTour' },
  { id: 'convenience', resultKey: 'convenience' },
  { id: 'specialty', resultKey: 'specialty' },
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
      q1: {
        eyebrow: 'Question 01',
        title: 'How much time do you have?',
        subtitle: 'This sets the pace of the visit.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'What kind of experience would you like to start with?',
        subtitleSingle: 'Pick one path to match your timing.',
        subtitleMulti: 'You can multi-select because you have no time limits.',
      },
    },
    helpers: {
      q1: 'Pick a time slot. Selecting "Only 15 minutes" or "Around 30 minutes" keeps the next step to a single choice.',
      q2Single: 'Based on your time, select just one starting point for your visit.',
      q2Multi:
        'With no time limits you can mix more than one experience. Choose up to two, or more than two to unlock the Grand Tour.',
    },
    buttons: {
      start: 'Start',
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
      express: {
        label: 'Only 15 minutes',
        description: 'A sharp sprint through the highlights.',
      },
      standard: {
        label: 'Around 30 minutes',
        description: 'Enough time for a complete showcase.',
      },
      'no-limit': {
        label: 'No time pressure',
        description: 'Take your time and mix multiple experiences.',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Must-see highlights',
        description: 'Start with the essentials everyone is talking about.',
      },
      retail: {
        label: 'Retail solutions walkthrough',
        description: 'Follow the entire journey of Epta retail solutions.',
      },
      tech: {
        label: 'Technical deep dives',
        description: 'Perfect for engineers and curious minds.',
      },
      immersive: {
        label: 'A full, immersive tour',
        description: 'See it all, from the hero stories to hidden gems.',
      },
      convenience: {
        label: 'Convenience store innovations',
        description: 'Fast, dynamic concepts for grab-and-go formats.',
      },
      specialty: {
        label: 'Specialty shop experiences',
        description: 'Immersive journeys for premium destinations.',
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
      q1: {
        eyebrow: 'Domanda 01',
        title: 'Quanto tempo hai a disposizione?',
        subtitle: 'Questo imposta il ritmo della visita.',
      },
      q2: {
        eyebrow: 'Domanda 02',
        title: 'Da quale esperienza vuoi partire?',
        subtitleSingle: 'Scegli un solo percorso in base al tempo.',
        subtitleMulti: 'Senza limiti di tempo puoi selezionare più percorsi.',
      },
    },
    helpers: {
      q1: "Scegli la fascia di tempo. Con 'Solo 15 minuti' o 'Circa 30 minuti' la domanda successiva accetta una sola scelta.",
      q2Single: 'In base al tempo a disposizione, seleziona un solo punto di partenza per la visita.',
      q2Multi:
        'Senza limiti di tempo puoi combinare più esperienze. Scegline fino a due, o più di due per attivare il Grand Tour.',
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
      express: {
        label: 'Solo 15 minuti',
        description: 'Un giro rapidissimo tra i punti imperdibili.',
      },
      standard: {
        label: 'Circa 30 minuti',
        description: 'Tempo sufficiente per una presentazione completa.',
      },
      'no-limit': {
        label: 'Nessuna fretta',
        description: 'Ritmo libero e possibilità di combinare più esperienze.',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Le tappe imperdibili',
        description: 'Parti dalle novità di cui parlano tutti.',
      },
      retail: {
        label: 'Percorso soluzioni retail',
        description: 'Segui il viaggio completo delle soluzioni integrate Epta.',
      },
      tech: {
        label: 'Approfondimenti tecnici',
        description: 'Ideale per ingegneri e per chi vuole capire i dettagli.',
      },
      immersive: {
        label: 'Tour immersivo completo',
        description: 'Vivi tutto, dalle hero stories ai dettagli più nascosti.',
      },
      convenience: {
        label: 'Innovazioni convenience',
        description: 'Focus rapido su format grab-and-go e soluzioni veloci.',
      },
      specialty: {
        label: 'Esperienze specialty shop',
        description: 'Un percorso curato per ambienti premium e ad alto coinvolgimento.',
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
      q1: {
        eyebrow: 'Pregunta 01',
        title: '¿Cuánto tiempo tienes?',
        subtitle: 'Esto marca el ritmo de la visita.',
      },
      q2: {
        eyebrow: 'Pregunta 02',
        title: '¿Con qué tipo de experiencia quieres empezar?',
        subtitleSingle: 'Elige un único camino según tu disponibilidad.',
        subtitleMulti: 'Sin límite de tiempo puedes seleccionar varias opciones.',
      },
    },
    helpers: {
      q1: "Elige un intervalo de tiempo. Si seleccionas 'Solo 15 minutos' o 'Alrededor de 30 minutos', la siguiente pregunta admite una sola opción.",
      q2Single: 'Según el tiempo disponible, selecciona un solo punto de partida.',
      q2Multi:
        'Sin límites puedes combinar más experiencias. Escoge hasta dos o más de dos para activar el Grand Tour.',
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
      express: {
        label: 'Solo 15 minutos',
        description: 'Un repaso veloz por lo imprescindible.',
      },
      standard: {
        label: 'Alrededor de 30 minutos',
        description: 'Tiempo suficiente para la presentación completa.',
      },
      'no-limit': {
        label: 'Sin presión de tiempo',
        description: 'Tómate todo el tiempo y combina varias experiencias.',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Momentos imprescindibles',
        description: 'Empieza con lo esencial de lo que todos hablan.',
      },
      retail: {
        label: 'Recorrido soluciones retail',
        description: 'Sigue el circuito completo de las soluciones integrales de Epta.',
      },
      tech: {
        label: 'Inmersión técnica',
        description: 'Perfecto para ingenieros y mentes curiosas.',
      },
      immersive: {
        label: 'Tour inmersivo completo',
        description: 'Vívelo todo, de las historias principales a los detalles ocultos.',
      },
      convenience: {
        label: 'Innovaciones convenience',
        description: 'Un recorrido ágil por los formatos grab-and-go.',
      },
      specialty: {
        label: 'Experiencias specialty shop',
        description: 'Un viaje curado para espacios premium y de alto engagement.',
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
      q1: {
        eyebrow: 'Question 01',
        title: 'Combien de temps avez-vous ?',
        subtitle: 'Cela définit le rythme de votre visite.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: "Avec quel type d'expérience souhaitez-vous commencer ?",
        subtitleSingle: 'Choisissez un seul parcours en fonction de votre temps.',
        subtitleMulti: 'Sans contrainte de temps, vous pouvez sélectionner plusieurs parcours.',
      },
    },
    helpers: {
      q1: "Choisissez une durée. Si vous sélectionnez 'Seulement 15 minutes' ou 'Environ 30 minutes', l'étape suivante n'accepte qu'un choix.",
      q2Single: 'Selon votre temps, choisissez un seul point de départ pour la visite.',
      q2Multi:
        "Sans contrainte de temps, combinez plusieurs expériences. Choisissez-en jusqu'à deux, ou plus de deux pour activer le Grand Tour.",
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
      express: {
        label: 'Seulement 15 minutes',
        description: 'Un sprint rapide à travers les essentiels.',
      },
      standard: {
        label: 'Environ 30 minutes',
        description: 'Assez de temps pour une présentation complète.',
      },
      'no-limit': {
        label: 'Aucune contrainte',
        description: 'Prenez votre temps et combinez plusieurs expériences.',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Moments incontournables',
        description: 'Commencez par les essentiels dont tout le monde parle.',
      },
      retail: {
        label: 'Parcours solutions retail',
        description: 'Suivez le circuit complet des solutions intégrées Epta.',
      },
      tech: {
        label: 'Immersions techniques',
        description: 'Parfait pour les ingénieurs et les esprits curieux.',
      },
      immersive: {
        label: 'Tour immersif complet',
        description: 'Voyez tout, des hero stories aux détails cachés.',
      },
      convenience: {
        label: 'Innovations convenience',
        description: 'Un trajet dynamique dédié aux formats grab-and-go.',
      },
      specialty: {
        label: 'Expériences boutique spécialisée',
        description: 'Un voyage soigné pour les espaces premium et à forte implication.',
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
      q1: {
        eyebrow: 'Frage 01',
        title: 'Wie viel Zeit hast du?',
        subtitle: 'Das bestimmt das Tempo des Besuchs.',
      },
      q2: {
        eyebrow: 'Frage 02',
        title: 'Mit welcher Art von Erlebnis möchtest du starten?',
        subtitleSingle: 'Wähle einen Pfad, der zu deiner Zeit passt.',
        subtitleMulti: 'Ohne Zeitlimit kannst du mehrere Pfade kombinieren.',
      },
    },
    helpers: {
      q1: "Wähle einen Zeitrahmen. Bei 'Nur 15 Minuten' oder 'Rund 30 Minuten' ist im nächsten Schritt nur eine Auswahl möglich.",
      q2Single: 'Basierend auf deiner Zeit kannst du nur einen Startpunkt wählen.',
      q2Multi:
        'Ohne Zeitdruck darfst du bis zu zwei Erlebnisse kombinieren oder mehr als zwei für den Grand Tour wählen.',
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
      express: {
        label: 'Nur 15 Minuten',
        description: 'Ein schneller Sprint durch die Highlights.',
      },
      standard: {
        label: 'Rund 30 Minuten',
        description: 'Genug Zeit für eine komplette Vorstellung.',
      },
      'no-limit': {
        label: 'Kein Zeitdruck',
        description: 'Nimm dir alle Zeit und kombiniere mehrere Erlebnisse.',
      },
    },
    experienceOptions: {
      highlights: {
        label: 'Unverzichtbare Highlights',
        description: 'Starte mit den Essentials, über die alle sprechen.',
      },
      retail: {
        label: 'Retail-Lösungen Rundgang',
        description: 'Folge dem kompletten Loop der integrierten Epta Lösungen.',
      },
      tech: {
        label: 'Technische Deep Dives',
        description: 'Ideal für Ingenieure und neugierige Köpfe.',
      },
      immersive: {
        label: 'Voller, immersiver Rundgang',
        description: 'Sieh alles, von Hero Stories bis zu versteckten Details.',
      },
      convenience: {
        label: 'Convenience-Innovationen',
        description: 'Ein schneller Blick auf Konzepte für Grab-and-go.',
      },
      specialty: {
        label: 'Specialty-Shop Erlebnisse',
        description: 'Ein kuratierter Weg für Premium- und Erlebnisflächen.',
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
