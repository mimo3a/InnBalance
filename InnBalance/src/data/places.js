export const places = [
    {
        id: 1,
        name: 'Botanic park',
        info: 'Seit über 100 Jahren befindet sich der Botanische Garten nunmehr in Hötting und ist nicht nur unverzichtbar als Lehr- und Forschungsstätte des Institutes für Botanik der Universität Innsbruck, sondern auch Bildungs- und Erholungsort für Kinder, Jugendliche und Erwachsene. Über 7000 Pflanzenarten aus den verschiedensten Lebensräumen der Erde werden hier kultiviert.',
        rating: 4.5,
        image: require('../Images/Places/BotanischeGarten.png'),
        category: 'Park',
        distance: 1.2,
        // 47.26797188904323, 11.378399662284254
        lat: 47.26797188904323,
        lng: 11.378399662284254,
        acces: 'Public'
    },
    {
        id: 2,
        name: 'MCI',
        info: 'Das MCI-Bauprojekt in Innsbruck befindet sich auf dem Gelände der ehemaligen Fennerkaserne, das oft als „grüne Wiese“ oder Brache im Stadtzentrum (nahe dem Hofgarten) bezeichnet wurde. ',
        rating: 5.0,
        image: require('../Images/Places/mci.png'),
        category: 'Park',
        distance: 2.5,
        // 47.26947108309961, 11.398268543930676
        lat: 47.26947108309961,
        lng: 11.398268543930676,
        acces: 'Public'
    },
    {
        id: 3,
        name: 'Hofgarten',
        info: 'A beautiful historic garden located in the heart of Innsbruck, perfect for a relaxing stroll and enjoying nature.',
        rating: 5,
        image: require('../Images/Places/Hofgarten.png'),
        category: 'Garden',
        distance: 0.8,
        // 47.270984155660464, 11.396819215384598
        lat: 47.270984155660464,
        lng: 11.396819215384598,
        acces: 'Public'
    },
    {
        id: 4,
        name: 'Rapoldipark',
        info: 'Rapoldipark is a large public park in Innsbruck, Austria, situated east of the city center near the Sill River. It serves as one of Innsbruck’s principal urban green spaces, offering residents and visitors a place for leisure, recreation, and cultural events within easy reach of downtown.',
        rating: 5.0,
        image: require('../Images/Places/Rapoldi.png'),
        category: 'Park',
        distance: 1.0,
        //47.26641255543528, 11.405865678870567
        lat: 47.26641255543528,
        lng: 11.405865678870567,
        acces: 'Public'
    },
    {
        id: 5,
        name: 'Innpromenade',
        info: 'The Innpromenade is a scenic riverside walkway along the Inn River in Innsbruck, Austria. It stretches through the city center and provides a tranquil route flanked by historic facades, alpine views, and green embankments. The promenade is a favored spot for walking, cycling, and enjoying vistas of the Nordkette mountain range.',
        rating: 4.2,
        image: require('../Images/Places/Innpromenade.png'),
        category: 'Promenade',
        distance: 3.3,
        //47.26788707514538, 11.390497377933551
        lat: 47.26788707514538,
        lng: 11.390497377933551,
        acces: 'Public'
    },
    {
        id: 6,
        name: 'Nordkette',
        info: 'Nordkette is a prominent mountain range forming part of the Karwendel Mountains, located directly north of Innsbruck, Austria. Often called “the Jewel of the Alps,” it marks the southernmost chain of the Karwendel and serves as a dramatic natural backdrop to the city, easily accessible from the urban center via cableways and trails.',
        rating: 3.8,
        image: require('../Images/Places/Nordkette.png'),
        category: 'Mountain',
        distance: 2.1,
        //47.27044998750584, 11.395056634680664
        lat: 47.27044998750584,
        lng: 11.395056634680664,
        acces: 'Public'
    },
    {
        id: 7,
        name: 'Vill',
        info: 'Vill is a district (Stadtteil) of Innsbruck, located on the southern outskirts of the city in the Austrian state of Tyrol. It was an independent rural village until its incorporation into Innsbruck in 1942 and remains notable for its traditional Alpine character within proximity to the city center.',
        rating: 3.8,
        image: require('../Images/Places/Vill.png'),
        category: 'District',
        distance: 2.1,
        //47.23471025006762, 11.400970969748117
        lat: 47.23471025006762,
        lng: 11.400970969748117,
        acces: 'Public'
    },
    {
        id: 8,
        name: 'Ambraser Schlosspark',
        info: 'Weitläufige Parkanlage im englischen Stil rund um das Schloss Ambras. Besonders ruhig sind die versteckten Wege im oberen Teil des Gartens.',
        rating: 4.7,
        image: require('../Images/Places/Schlosspark.png'),
        category: 'Park',
        distance: 3.5,
        lat: 47.2564,
        lng: 11.4351,
        acces: 'Public'
    },
    {
        id: 9,
        name: 'Tiroler Volkskunstmuseum',
        info: 'Ein Ort der Stille. Die detaillierten Bauernstuben und das angeschlossene Kloster bieten eine fast meditative Atmosphäre abseits der Touristenströme.',
        rating: 4.6,
        image: require('../Images/Places/Volkskunstmuseum.png'),
        category: 'Museum',
        distance: 0.5,
        lat: 47.2685,
        lng: 11.3967,
        acces: 'Public'
    },
    {
        id: 10,
        name: 'Audioversum',
        info: 'Ein interaktives Museum zum Thema Hören. Viele Installationen sind sehr beruhigend gestaltet und laden zum bewussten Wahrnehmen von Klängen ein.',
        rating: 4.4,
        image: require('../Images/Places/Audioversum.png'),
        category: 'Museum',
        distance: 0.8,
        lat: 47.2642,
        lng: 11.3961,
        acces: 'Public'
    },
    {
        id: 11,
        name: 'haepinest',
        info: 'Dieses minimalistisch eingerichtete Café bietet exzellenten Specialty Coffee und eine sehr entspannte, ruhige Akustik – ideal zum Lesen oder Nachdenken.',
        rating: 4.7,
        image: require('../Images/Places/Haepinest.png'),
        category: 'Cafe',
        distance: 0.7,
        lat: 47.2704,
        lng: 11.3912,
        acces: 'Public'
    },
    {
        id: 12,
        name: 'Café Konditorei Munding',
        info: 'Das älteste Café Tirols liegt in einer ruhigen Gasse der Altstadt. Es verströmt gemütlichen Charme und bietet hausgemachte Pralinen in historischem Ambiente.',
        rating: 4.3,
        image: require('../Images/Places/Munding.png'),
        category: 'Cafe',
        distance: 0.2,
        lat: 47.2681,
        lng: 11.3921,
        acces: 'Public'
    },
    {
        id: 13,
        name: 'Café Arkadenhof',
        info: 'Ein verborgener Juwel in einem Innenhof der Maria-Theresien-Straße. Die grüne Terrasse ist eine wahre Ruheinsel mitten im lebhaften Zentrum.',
        rating: 4.5,
        image: require('../Images/Places/Arkadenhof.png'),
        category: 'Cafe',
        distance: 0.4,
        lat: 47.2655,
        lng: 11.3941,
        acces: 'Public'
    },
    {
        id: 14,
        name: 'Restaurant Sitzwohl',
        info: 'Helle, klare Architektur und viel Platz zwischen den Tischen sorgen hier für ein sehr entspanntes und unaufgeregtes Speiseerlebnis auf hohem Niveau.',
        rating: 4.5,
        image: require('../Images/Places/Sitzwohl.png'),
        category: 'Restaurant',
        distance: 0.4,
        lat: 47.2662,
        lng: 11.3965,
        acces: 'Public'
    },
    {
        id: 15,
        name: 'Restaurant Ottoburg',
        info: 'In einem der ältesten Gebäude der Stadt speist man in gemütlichen, kleinen Stuben mit Blick auf den Inn – eine sehr heimelige und ruhige Atmosphäre.',
        rating: 4.6,
        image: require('../Images/Places/Ottoburg.png'),
        category: 'Restaurant',
        distance: 0.1,
        lat: 47.2683,
        lng: 11.3919,
        acces: 'Public'
    }


];
