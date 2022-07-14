const address = require('../regex/addressRegex')
const discipline = require('../regex/disciplineRegex')
const season = require('../regex/seasonRegex')

// Permet de trouver les résultats de l'adressage, la saisonnalité et la discipline dans le texte de la page 

const getMatch = (bodytext,festival) => {
    let festivalNameRegex = new RegExp(festival.name,'gi');

    let bodyMatch;

    let addressMatch = bodytext.match(address);
    let disciplineMatch = bodytext.match(discipline);
    let seasonMatch = bodytext.match(season);
    let festivalNameMatch = bodytext.match(festivalNameRegex)
    addressMatch = addressMatch? addressMatch : [];
    seasonMatch = seasonMatch? seasonMatch : [];
    disciplineMatch = disciplineMatch? disciplineMatch : [];
    festivalNameMatch = festivalNameMatch? festivalNameMatch : [];

    bodyMatch = [addressMatch, [...addressMatch,...disciplineMatch,...seasonMatch,...festivalNameMatch]];
    
    return bodyMatch;

}

module.exports = getMatch;