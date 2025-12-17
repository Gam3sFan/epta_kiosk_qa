import flagEn from '../../assets/flags/gb.svg';
import flagIt from '../../assets/flags/it.svg';
import flagEs from '../../assets/flags/es.svg';
import flagFr from '../../assets/flags/fr.svg';
import flagDe from '../../assets/flags/de.svg';

export const SCREENS = {
  HERO: 'hero',
  BRAND_STORY: 'brand-story',
  QUESTION_A: 'question-a',
  QUESTION_B: 'question-b',
  RESULT: 'result',
};

export const TIME_OPTIONS_BASE = [
  { id: '15' },
  { id: '30' },
  { id: '60' },
  { id: 'no-limit' },
];

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
    brandStory: {
      ctaLabel: 'Good never stops',
      title: 'Good never stops',
      description:
        "'Good never stops' represents our evolution: we don't just offer advanced products, we are constantly committed to designing and implementing integrated, reliable solutions that meet customer needs and improve the shopping experience. We embark on this journey together with our customers, offering customised solutions, interpreting global trends and innovating in a conscious manner, with a focus on sustainability. We look to the future by focusing on servitisation, developing services that support our customers' businesses and strengthen the partnership between manufacturer and customer",
      closeLabel: 'Close',
    },
    stepLabel: 'Step',
    questions: {
      q0: {
        eyebrow: 'Question 01',
        title: 'What kind of experience would you like to start with?',
        subtitle: 'Tap one option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'How much time do you have?',
        subtitleSingle: 'Tap an option.',
        subtitleMulti: 'Tap an option.',
      },
    },
    helpers: {
      q0: 'Select one experience to continue.',
      q2Single: 'Choose the time you have available.',
      q2Multi: 'Choose the time you have available.',
    },
    buttons: {
      start: 'Cross the Gateway',
      back: 'Back',
      showResult: 'Show result',
      restart: 'Restart flow',
    },
    result: {
      eyebrow: 'Your tailored route',
      title: 'Your personalized map!',
      subtitle: 'Scan or print your map.',
      scanLabel: 'Scan here',
      printLabel: 'Print here',
      emptyTitle: 'Pick an experience first',
      emptyBody: 'Return to the previous step and let us know which journey you want to focus on.',
    },
    timeOptions: {
      15: { label: 'Only 15 minutes' },
      30: { label: 'Around 30 minutes' },
      60: { label: 'Around 1 hour' },
      'no-limit': { label: 'No time pressure' },
    },
    experienceOptions: {
      highlights: { label: 'Must-see highlights' },
      retail: { label: 'Retail solutions walkthrough' },
      tech: { label: 'Technical deep dives' },
      specialty: { label: 'Specialty shop experiences' },
      convenience: { label: 'Convenience store innovations' },
      immersive: { label: 'A full, immersive tour' },
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
    brandStory: {
      ctaLabel: 'Good never stops',
      title: 'Good never stops',
      description:
        "'Good never stops' represents our evolution: we don't just offer advanced products, we are constantly committed to designing and implementing integrated, reliable solutions that meet customer needs and improve the shopping experience. We embark on this journey together with our customers, offering customised solutions, interpreting global trends and innovating in a conscious manner, with a focus on sustainability. We look to the future by focusing on servitisation, developing services that support our customers' businesses and strengthen the partnership between manufacturer and customer",
      closeLabel: 'Chiudi',
    },
    stepLabel: 'Passo',
    questions: {
      q0: {
        eyebrow: 'Domanda 01',
        title: 'Con quale tipo di esperienza vorresti iniziare?',
        subtitle: 'Seleziona un\'opzione.',
      },
      q2: {
        eyebrow: 'Domanda 02',
        title: 'Quanto tempo hai a disposizione?',
        subtitleSingle: "Tocca un'opzione.",
        subtitleMulti: "Tocca un'opzione.",
      },
    },
    helpers: {
      q0: 'Seleziona una sola esperienza per continuare.',
      q2Single: 'Indica il tempo che hai a disposizione.',
      q2Multi: 'Indica il tempo che hai a disposizione.',
    },
    buttons: {
      start: 'Attraversa il portale',
      back: 'Indietro',
      showResult: 'Mostra risultato',
      restart: 'Ricomincia il percorso',
    },
    result: {
      eyebrow: 'Il tuo itinerario su misura',
      title: 'La tua mappa personalizzata!',
      subtitle: 'Scansiona o stampa la tua mappa',
      scanLabel: 'Scansiona qui',
      printLabel: 'Stampa qui',
      emptyTitle: "Seleziona prima un'esperienza",
      emptyBody: 'Torna al passo precedente e raccontaci quale percorso vuoi prioritizzare.',
    },
    timeOptions: {
      15: { label: 'Solo 15 minuti' },
      30: { label: "Intorno alla mezz'ora" },
      60: { label: 'Circa 1 ora' },
      'no-limit': { label: 'Non ho fretta' },
    },
    experienceOptions: {
      highlights: { label: 'Assolutamente da vedere' },
      retail: { label: 'Panoramica delle soluzioni retail' },
      tech: { label: 'Approfondimenti tecnici' },
      specialty: { label: 'Esperienze nei negozi specializzati' },
      convenience: { label: 'Innovazioni nei minimarket' },
      immersive: { label: 'Un tour completo a 360 gradi' },
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
    brandStory: {
      ctaLabel: 'Good never stops',
      title: 'Good never stops',
      description:
        "'Good never stops' represents our evolution: we don't just offer advanced products, we are constantly committed to designing and implementing integrated, reliable solutions that meet customer needs and improve the shopping experience. We embark on this journey together with our customers, offering customised solutions, interpreting global trends and innovating in a conscious manner, with a focus on sustainability. We look to the future by focusing on servitisation, developing services that support our customers' businesses and strengthen the partnership between manufacturer and customer",
      closeLabel: 'Cerrar',
    },
    stepLabel: 'Paso',
    questions: {
      q0: {
        eyebrow: 'Pregunta 01',
        title: '¿Con qué tipo de experiencia te gustaría empezar?',
        subtitle: 'Toca una opción.',
      },
      q2: {
        eyebrow: 'Pregunta 02',
        title: '¿Cuánto tiempo tienes?',
        subtitleSingle: 'Toca una opción.',
        subtitleMulti: 'Toca una opción.',
      },
    },
    helpers: {
      q0: 'Selecciona una sola experiencia para continuar.',
      q2Single: 'Indica el tiempo que tienes disponible.',
      q2Multi: 'Indica el tiempo que tienes disponible.',
    },
    buttons: {
      start: 'Cruza la puerta',
      back: 'Atrás',
      showResult: 'Mostrar resultado',
      restart: 'Reiniciar flujo',
    },
    result: {
      eyebrow: 'Tu ruta a medida',
      title: '¡Tu mapa personalizado!',
      subtitle: 'Escanea o imprime tu mapa',
      scanLabel: 'Escanee aquí',
      printLabel: 'Imprime aquí',
      emptyTitle: 'Elige antes una experiencia',
      emptyBody: 'Regresa al paso anterior y cuéntanos qué recorrido deseas priorizar.',
    },
    timeOptions: {
      15: { label: 'Solo 15 minutos' },
      30: { label: 'Alrededor de 30 minutos' },
      60: { label: 'Aproximadamente 1 hora' },
      'no-limit': { label: 'No tengo prisa' },
    },
    experienceOptions: {
      highlights: { label: 'Lo más destacado, lo que no te puedes perder' },
      retail: { label: 'Guía de soluciones para minoristas' },
      tech: { label: 'Análisis técnicos en profundidad' },
      specialty: { label: 'Experiencias en tiendas especializadas' },
      convenience: { label: 'Innovaciones en las tiendas de conveniencia' },
      immersive: { label: 'Una visita completa y envolvente.' },
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
    brandStory: {
      ctaLabel: 'Good never stops',
      title: 'Good never stops',
      description:
        "'Good never stops' represents our evolution: we don't just offer advanced products, we are constantly committed to designing and implementing integrated, reliable solutions that meet customer needs and improve the shopping experience. We embark on this journey together with our customers, offering customised solutions, interpreting global trends and innovating in a conscious manner, with a focus on sustainability. We look to the future by focusing on servitisation, developing services that support our customers' businesses and strengthen the partnership between manufacturer and customer",
      closeLabel: 'Fermer',
    },
    stepLabel: 'Étape',
    questions: {
      q0: {
        eyebrow: 'Question 01',
        title: "Par quel type d'expérience souhaitez-vous commencer ?",
        subtitle: 'Appuyez sur une option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'Combien de temps avez-vous ?',
        subtitleSingle: 'Touchez une option.',
        subtitleMulti: 'Touchez une option.',
      },
    },
    helpers: {
      q0: 'Choisissez une seule expérience pour continuer.',
      q2Single: 'Indiquez le temps dont vous disposez.',
      q2Multi: 'Indiquez le temps dont vous disposez.',
    },
    buttons: {
      start: 'Franchissez la porte',
      back: 'Retour',
      showResult: 'Afficher le résultat',
      restart: 'Recommencer le parcours',
    },
    result: {
      eyebrow: 'Votre parcours personnalisé',
      title: 'Votre carte personnalisée !',
      subtitle: 'Scannez ou imprimez votre carte',
      scanLabel: 'Scannez ici',
      printLabel: 'Imprimer ici',
      emptyTitle: "Choisissez d'abord une expérience",
      emptyBody: "Retournez à l'étape précédente et dites-nous quel parcours vous voulez privilégier.",
    },
    timeOptions: {
      15: { label: 'Seulement 15 minutes' },
      30: { label: 'Environ 30 minutes' },
      60: { label: 'Environ 1 heure' },
      'no-limit': { label: 'Pas de contrainte de temps' },
    },
    experienceOptions: {
      highlights: { label: 'Les incontournables' },
      retail: { label: 'Présentation des solutions pour le commerce de détail' },
      tech: { label: 'Analyses techniques approfondies' },
      specialty: { label: 'Expériences dans les boutiques spécialisées' },
      convenience: { label: 'Innovations dans les magasins de proximité' },
      immersive: { label: 'Une visite complète et immersive' },
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
    brandStory: {
      ctaLabel: 'Good never stops',
      title: 'Good never stops',
      description:
        "'Good never stops' represents our evolution: we don't just offer advanced products, we are constantly committed to designing and implementing integrated, reliable solutions that meet customer needs and improve the shopping experience. We embark on this journey together with our customers, offering customised solutions, interpreting global trends and innovating in a conscious manner, with a focus on sustainability. We look to the future by focusing on servitisation, developing services that support our customers' businesses and strengthen the partnership between manufacturer and customer",
      closeLabel: 'Schließen',
    },
    stepLabel: 'Schritt',
    questions: {
      q0: {
        eyebrow: 'Frage 01',
        title: 'Mit welcher Art von Erlebnis möchten Sie beginnen?',
        subtitle: 'Eine Option antippen.',
      },
      q2: {
        eyebrow: 'Frage 02',
        title: 'Wie viel Zeit hast du zur Verfügung?',
        subtitleSingle: 'Tippe auf eine Option.',
        subtitleMulti: 'Tippe auf eine Option.',
      },
    },
    helpers: {
      q0: 'Wähle genau ein Erlebnis, um fortzufahren.',
      q2Single: 'Gib an, wie viel Zeit du hast.',
      q2Multi: 'Gib an, wie viel Zeit du hast.',
    },
    buttons: {
      start: 'Das Tor durchschreiten',
      back: 'Zurück',
      showResult: 'Ergebnis anzeigen',
      restart: 'Flow neu starten',
    },
    result: {
      eyebrow: 'Deine kuratierte Route',
      title: 'Dein personalisierter Lageplan!',
      subtitle: 'Scannen oder drucken Sie Ihre Karte',
      scanLabel: 'Hier scannen',
      printLabel: 'Hier drucken',
      emptyTitle: 'Wähle zuerst ein Erlebnis',
      emptyBody: 'Gehe einen Schritt zurück und sag uns, welcher Pfad prioritisiert werden soll.',
    },
    timeOptions: {
      15: { label: 'Nur 15 Minuten' },
      30: { label: 'Ungefähr 30 Minuten' },
      60: { label: 'Ungefähr 1 Stunde' },
      'no-limit': { label: 'Ich habe keinen Zeitdruck' },
    },
    experienceOptions: {
      highlights: { label: 'Unverzichtbare Highlights' },
      retail: { label: 'Überblick der Lösungen für den Einzelhandel' },
      tech: { label: 'Detaillierte technische Einblicke' },
      specialty: { label: 'Erlebnisse für Fachgeschäfte' },
      convenience: { label: 'Innovationen im Convenience-Store-Bereich' },
      immersive: { label: 'Eine umfassende, 360-Grad-Tour' },
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
