 
const disciplineRegex = new RegExp([
    "\\b(festival|programme|programmation|film court|film|court-metrage|long-metrage|court metrage|courts-metrage|cine|projections|grand ecran|grands ecrans|",
    "productions|films|cinema|documentaire|documentaires|audiovisuel|animes|musique|jazz|funk|electro|electronique|",
    "danser|danse|danses|guitare|piano|medievale|concert|activites|tango|flamenco|reggae|spectacle|spectacles|soirees",
    "|soiree|spectacle vivant|spectacles vivants|ateliers|enfants|rencontres|recontre|arts|art|cultures|culture",
    "|pluri disciplinaire|pluridisciplinaire|arts de rue|arts de la rue|art de rue|cirque|theatre|fete|fetes|chants|choristes|expositions|exposition",
    "|animations|rock|blues|musicale|rock’n’roll|africaine|latinos|latino|debats|comedie|conferences|ecritures|ecriture",
    "|litterature|litteraire|lectures|ecologie|randonnee|violon|violoncelle|poesie|voix|electronique|classique|rap",
    "|hip hop|gospel|latine|afrique|orgue|graffiti|peinture|bachata|folklorique|choregraphie|humour|humouristique",
    "|rire|livre|ecrivains|autrice|contes|conteurs|roman|manifestations|patrimoine|echanger|echanges|spirituelle|spirituel|mode",
    "|styliste|solidarite|feministe|feminin|feminisme|femme|voyage|voyageurs|artisanal|tradition|epistolaire",
    "|horreur|western|policier|fiction|maitre|pianiste|conservatoire|a capella|photo|photographies|claquette|claquettes|ballet|ballets)\\b"
].join(''), 'gi');
 
 
 
module.exports = disciplineRegex;

