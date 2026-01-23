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
  THANK_YOU: 'thank-you',
};

export const TIME_OPTIONS_BASE = [
  { id: 'essentials' },
  { id: 'balanced' },
  { id: 'deep' },
];

export const EXPERIENCE_OPTIONS_BASE = [
  { id: 'highlights', resultKey: 'essential' },
  { id: 'retail', resultKey: 'retail' },
  { id: 'tech', resultKey: 'tech' },
  { id: 'convenience', resultKey: 'convenience' },
  { id: 'specialty', resultKey: 'specialty' },
  { id: 'fresh' },
  { id: 'prepacked' },
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
        title: 'What kind of retail experience are you most curious about today?',
        subtitle: 'Tap one option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'How much time do you want to spend exploring us?',
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
      scanLabel: 'Scan QR',
      printLabel: 'Print Map',
      doneLabel: 'Done',
      emptyTitle: 'Pick an experience first',
      emptyBody: 'Return to the previous step and let us know which journey you want to focus on.',
    },
    printing: {
      title: 'Printing your map',
      subtitle: 'Please wait while we send it to the printer.',
    },
    timeOptions: {
      essentials: { label: 'Just the essentials - quick and impactful' },
      balanced: { label: 'A balanced visit - key topics and solutions' },
      deep: { label: 'Take me deep - full, immersive experience' },
    },
    experienceOptions: {
      highlights: { label: 'Must-see highlights' },
      retail: { label: 'Integrated retail solutions' },
      tech: { label: 'Retail technology & mechanics' },
      convenience: { label: 'Convenience & grab-and-go formats' },
      specialty: { label: 'Premium & specialty shops' },
      fresh: { label: 'Fresh food experiences' },
      prepacked: { label: 'Pre-packed food solutions' },
      immersive: { label: 'I want to see everything' },
    },
    results: {
      1: {
        title: 'The Essential Trail',
        description: 'Your hand-picked map of the top highlights you can’t miss.',
      },
      2: {
        title: 'The Retail Explorer Path',
        description: 'A guided loop through complete, integrated end-to-end solutions.',
      },
      3: {
        title: 'The Tech Insider Route',
        description: 'Perfect if you want to understand the mechanics behind the world of retail.',
      },
      4: {
        title: 'The Convenience Compass',
        description: 'A quick, dynamic trail spotlighting innovations for convenience and grab-and-go formats.',
      },
      5: {
        title: 'The Specialty Shop Path',
        description: 'A curated journey into premium and high-engagement specialty shops.',
      },
      6: {
        title: 'The Grand Tour',
        description: 'The most immersive and comprehensive experience of the booth.',
      },
      7: {
        title: 'The Fresh Market Journey',
        description: 'A sensory-rich path focused on super-fresh food, foodservice, and fresh retail excellence.',
      },
      8: {
        title: 'The Smart Pack Trail',
        description: 'A practical route dedicated to pre-packed food, efficiency, scalability, and ready-to-sell solutions',
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
        title: 'Quale esperienza retail ti incuriosisce di più oggi?',
        subtitle: 'Seleziona un\'opzione.',
      },
      q2: {
        eyebrow: 'Domanda 02',
        title: 'Quanto tempo vuoi dedicare alla scoperta della nostre soluzioni?',
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
      start: 'Cross the Gateway',
      back: 'Indietro',
      showResult: 'Mostra risultato',
      restart: 'Ricomincia il percorso',
    },
    result: {
      eyebrow: 'Il tuo itinerario su misura',
      title: 'La tua mappa personalizzata!',
      subtitle: 'Scansiona o stampa la tua mappa',
      scanLabel: 'Scansiona',
      printLabel: 'Stampa',
      doneLabel: 'Fine',
      emptyTitle: "Seleziona prima un'esperienza",
      emptyBody: 'Torna al passo precedente e raccontaci quale percorso vuoi prioritizzare.',
    },
    printing: {
      title: 'Stampa in corso',
      subtitle: 'Attendi mentre inviamo la mappa alla stampante.',
    },
    timeOptions: {
      essentials: { label: "Solo l'essenziale - veloce e di grande impatto" },
      balanced: { label: 'Una visita equilibrata: argomenti chiave' },
      deep: { label: "Un'esperienza completa – coinvolgente e approfondita" },
    },
    experienceOptions: {
      highlights: { label: 'Highlights dello stand' },
      retail: { label: 'Soluzioni integrate per il Retail' },
      tech: { label: 'Tecnologie e sistemi per la refrigerazione' },
      convenience: { label: 'Soluzioni per Convenience e gli acquisti di impulso' },
      specialty: { label: 'Punti vendita specializzati' },
      fresh: { label: 'Esperienze gastronomiche fresche' },
      prepacked: { label: 'Soluzioni per prodotti confezionati' },
      immersive: { label: 'Voglio vedere tutto' },
    },
    results: {
      1: {
        title: 'Il Percorso Essenziale',
        description: 'La tua mappa personalizzata con le principali attrazioni da non perdere.',
      },
      2: {
        title: 'Il Percorso Dei Negozi Al Dettaglio',
        description: 'Un percorso guidato attraverso soluzioni complete, integrate e end-to-end.',
      },
      3: {
        title: 'Il Percorso Degli Esperti In Tecnologia',
        description: 'Perfetto se vuoi comprendere i meccanismi che regolano il mondo della vendita al dettaglio.',
      },
      4: {
        title: 'Il Percorso Dei Convenience',
        description: 'Un percorso rapido e dinamico che mette in luce le innovazioni per la praticità e i formati da asporto.',
      },
      5: {
        title: 'Il Percorso Dei Negozi Specializzati',
        description: 'Un viaggio curato alla scoperta di negozi specializzati di alta qualità e dal forte coinvolgimento.',
      },
      6: {
        title: 'Il Grande Tour',
        description: "L'esperienza più coinvolgente e completa dello stand.",
      },
      7: {
        title: 'Il Viaggio dei Fresh Market',
        description:
          'Un percorso ricco di sensazioni incentrato su alimenti freschissimi, ristorazione e eccellenza nella vendita al dettaglio di prodotti freschi.',
      },
      8: {
        title: 'Il Percorso Smart Pack',
        description:
          "Un percorso pratico dedicato agli alimenti preconfezionati, all'efficienza, alla scalabilità e alle soluzioni pronte per la vendita.",
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
        title: '¿Qué tipo de experiencia en tienda te despierta más curiosidad hoy en día?',
        subtitle: 'Toca una opción.',
      },
      q2: {
        eyebrow: 'Pregunta 02',
        title: '¿Cuánto tiempo quieres dedicar a conocernos?',
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
      start: 'Cross the Gateway',
      back: 'Atrás',
      showResult: 'Mostrar resultado',
      restart: 'Reiniciar flujo',
    },
    result: {
      eyebrow: 'Tu ruta a medida',
      title: '¡Tu mapa personalizado!',
      subtitle: 'Escanea o imprime tu mapa',
      scanLabel: 'Escanee',
      printLabel: 'Imprime',
      doneLabel: 'Listo',
      emptyTitle: 'Elige antes una experiencia',
      emptyBody: 'Regresa al paso anterior y cuéntanos qué recorrido deseas priorizar.',
    },
    printing: {
      title: 'Imprimiendo tu mapa',
      subtitle: 'Espera mientras lo enviamos a la impresora.',
    },
    timeOptions: {
      essentials: { label: 'Solo lo esencial: rápido y eficaz.' },
      balanced: { label: 'Una visita equilibrada: temas clave y soluciones' },
      deep: { label: 'Llévame a lo más profundo: una experiencia completa y envolvente.' },
    },
    experienceOptions: {
      highlights: { label: 'Lo más destacado que no te puedes perder' },
      retail: { label: 'Soluciones integradas para el comercio minorista' },
      tech: { label: 'Tecnología y mecánica minorista' },
      convenience: { label: 'Formatos prácticos y para llevar' },
      specialty: { label: 'Tiendas premium y especializadas' },
      fresh: { label: 'Experiencias gastronómicas con alimentos frescos' },
      prepacked: { label: 'Soluciones alimentarias preenvasadas' },
      immersive: { label: 'Quiero verlo todo' },
    },
    results: {
      1: {
        title: 'El sendero esencial',
        description: 'Tu mapa personalizado con los principales lugares de interés que no te puedes perder.',
      },
      2: {
        title: 'La ruta del  retailer explorador',
        description: 'Un recorrido guiado por soluciones completas e integradas de extremo a extremo.',
      },
      3: {
        title: 'La ruta del experto en tecnología',
        description: 'Perfecto si quieres comprender los mecanismos que hay detrás del mundo de la distribución.',
      },
      4: {
        title: 'La brújula de la comodidad',
        description: 'Un recorrido rápido y dinámico que destaca las innovaciones en formatos prácticos y para llevar.',
      },
      5: {
        title: 'La ruta de las tiendas especializadas',
        description: 'Un recorrido seleccionado por tiendas especializadas de alta gama y gran atractivo.',
      },
      6: {
        title: 'El Gran Tour',
        description: 'La experiencia más inmersiva y completa del estand.',
      },
      7: {
        title: 'El viaje por el  mercado del fresco',
        description:
          'Un recorrido rico en sensaciones centrado en la excelencia de los alimentos súper frescos, los servicios de restauración y la venta minorista de productos frescos.',
      },
      8: {
        title: 'El sendero Smart Pack',
        description:
          'Una ruta práctica dedicada a los alimentos preenvasados, la eficiencia, la escalabilidad y las soluciones listas para comer.',
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
        title: "Quel type d'expérience Retail vous intéresse le plus aujourd'hui?",
        subtitle: 'Appuyez sur une option.',
      },
      q2: {
        eyebrow: 'Question 02',
        title: 'Combien de temps voulez-vous prendre pour cette découverte ?',
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
      start: 'Cross the Gateway',
      back: 'Retour',
      showResult: 'Afficher le résultat',
      restart: 'Recommencer le parcours',
    },
    result: {
      eyebrow: 'Votre parcours personnalisé',
      title: 'Votre carte personnalisée !',
      subtitle: 'Scannez ou imprimez votre carte',
      scanLabel: 'Scannez',
      printLabel: 'Imprimer',
      doneLabel: 'Terminé',
      emptyTitle: "Choisissez d'abord une expérience",
      emptyBody: "Retournez à l'étape précédente et dites-nous quel parcours vous voulez privilégier.",
    },
    printing: {
      title: 'Impression en cours',
      subtitle: "Veuillez patienter pendant l'envoi à l’imprimante.",
    },
    timeOptions: {
      essentials: { label: "L'essentiel seulement - Rapide & Percutant" },
      balanced: { label: 'Une visite équilibrée - Sujets Clé et solutions' },
      deep: { label: 'Accompagnez-moi dans une expérience immersive globale' },
    },
    experienceOptions: {
      highlights: { label: 'Les incontournables' },
      retail: { label: 'Solutions Intégrées pour le Retail' },
      tech: { label: 'Technologie Meubles et Centrales en magasin' },
      convenience: { label: 'Solutions pour Snacking  et ventes à emporter, Petite Proxi' },
      specialty: { label: 'Boutiques Premium spécialisées' },
      fresh: { label: 'Zone Marché Frais' },
      prepacked: { label: 'Frais LS , Surgelés LS' },
      immersive: { label: "Je veux tout voir" },
    },
    results: {
      1: {
        title: 'Le sentier essentiel',
        description: 'Votre carte personnalisée des incontournables à ne pas manquer.',
      },
      2: {
        title: 'Le parcours Retail Explorer',
        description: 'Une boucle guidée à travers des solutions complètes, intégrées et de bout en bout.',
      },
      3: {
        title: 'La voie des initiés à la technologie',
        description:
          'Parfait si vous souhaitez comprendre les mécanismes qui régissent le monde du commerce de détail.',
      },
      4: {
        title: 'La boussole du confort',
        description:
          'Un parcours rapide et dynamique mettant en avant les innovations en matière de commodité et de formats à emporter.',
      },
      5: {
        title: 'Le chemin des boutiques spécialisées',
        description: 'Un voyage organisé dans des boutiques spécialisées haut de gamme et très fréquentées.',
      },
      6: {
        title: 'Le Grand Tour',
        description: "L'expérience la plus immersive et la plus complète du stand.",
      },
      7: {
        title: 'Le parcours du marché frais',
        description:
          "Un parcours riche en sensations, axé sur les aliments ultra-frais, la restauration et l'excellence dans la vente au détail de produits frais.",
      },
      8: {
        title: 'Le sentier Smart Pack',
        description:
          "Une solution pratique dédiée aux aliments préemballés, à l'efficacité, à l'évolutivité et aux solutions prêtes à la vente.",
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
        title: 'Welche Art von Einkaufserlebnis interessiert Sie heute am meisten?',
        subtitle: 'Eine Option antippen.',
      },
      q2: {
        eyebrow: 'Frage 02',
        title: 'Wie viel Zeit möchten Sie damit verbringen, unseren Stand zu erkunden?',
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
      start: 'Cross the Gateway',
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
      doneLabel: 'Fertig',
      emptyTitle: 'Wähle zuerst ein Erlebnis',
      emptyBody: 'Gehe einen Schritt zurück und sag uns, welcher Pfad prioritisiert werden soll.',
    },
    printing: {
      title: 'Druckvorgang läuft',
      subtitle: 'Bitte warten, wir senden die Karte an den Drucker.',
    },
    timeOptions: {
      essentials: { label: 'Nur das Wesentliche – schnell und wirkungsvoll' },
      balanced: { label: 'Ein ausgewogener Besuch – zentrale Themen und Lösungen' },
      deep: { label: 'Detaillierte Informationen zu unserem Angebot' },
    },
    experienceOptions: {
      highlights: { label: 'Sehenswerte Highlights' },
      retail: { label: 'Integrierte Einzelhandelslösungen' },
      tech: { label: 'Einzelhandelstechnologie und -mechanik' },
      convenience: { label: 'Convenience- und Grab-and-Go-Format' },
      specialty: { label: 'Premium- und Spezialitätengeschäfte' },
      fresh: { label: 'Erlebnisse mit frischen Lebensmitteln' },
      prepacked: { label: 'Lösungen für vorverpackte Lebensmittel' },
      immersive: { label: 'Ich möchte alles sehen.' },
    },
    results: {
      1: {
        title: 'Der unverzichtbare Weg',
        description: 'Ihre handverlesene Karte mit den wichtigsten Sehenswürdigkeiten, die Sie nicht verpassen sollten.',
      },
      2: {
        title: 'Der Weg zum Einzelhandels-Entdecker',
        description: 'Eine geführte Tour durch vollständige, integrierte End-to-End-Lösungen.',
      },
      3: {
        title: 'Der Tech-Insider-Weg',
        description: 'Perfekt, wenn Sie die Mechanismen hinter der Welt des Einzelhandels verstehen möchten.',
      },
      4: {
        title: 'Der Komfortkompass',
        description: 'Ein kurzer, dynamischer Überblick über Innovationen für Convenience- und Grab-and-Go-Formate.',
      },
      5: {
        title: 'Der Weg zum Fachgeschäft',
        description: 'Eine kuratierte Reise zu hochwertigen und hochgradig engagierten Fachgeschäften.',
      },
      6: {
        title: 'Die große Tour',
        description: 'Das eindrucksvollste und umfassendste Erlebnis am Stand.',
      },
      7: {
        title: 'Die Reise zum Frischmarkt',
        description:
          'Ein sinnlicher Weg, der sich auf superfrische Lebensmittel, Gastronomie und herausragende Frische im Einzelhandel konzentriert.',
      },
      8: {
        title: 'Der Smart Pack Trail',
        description:
          'Ein praktischer Weg, der sich auf vorverpackte Lebensmittel, Effizienz, Skalierbarkeit und verkaufsfertige Lösungen konzentriert.',
      },
    },
  },
};
