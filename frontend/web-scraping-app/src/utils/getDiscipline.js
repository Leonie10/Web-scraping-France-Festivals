 
const regexCinema = /\b(film|films|court-metrage|long-metrage|court metrage|courts-metrage|cine|projections|grand ecran|grands ecrans|productions|films|film court|cinema|documentaire|documentaires|audiovisuel|animes)\b/g
const regexArtsVisuels = /\b(arts|art|arts de rue|arts de la rue|art de rue|expositions|exposition|graffiti|graffitis|peinture|peintures|photo|photographies)\b/g
const regexMusique = /\b(musique|concert|son|jazz|funk|electro|electronique|guitare|pianorock|blues|musicale|rock’n’roll|latine|africaine|violon|violoncelle|classique|rap|hip hop|gospel)\b/g
const regexLitterature = /\b(livre|poetique|poetiques|contes|conte|conteurs|ecrivains|autrice|roman|lectures|lecture|ecrire|epistolaire|ecriture|BD|manga)\b/g
const regexSpectacles = /\b(danser|chants|representations|danse|danses|tango|flamenco|bachata|spectacle|spectacles|soirees|spectacle vivant|spectacles vivants|cirque|comedietheatre|animations|choregraphie|humour|humouristique)\b/g
 
 // Trouver la discipline en fonction des résultats trouvés sur le site
 
function getDiscipline (result) {
 
    let discipline;
 
    let isCinema = result.match(regexCinema)
    let isMusique = result.match(regexMusique)
    let isSpectacles = result.match(regexSpectacles)
    let isArts = result.match(regexArtsVisuels)
    let isLitterature = result.match(regexLitterature)
 
    isCinema = isCinema? isCinema : [];
    isMusique = isMusique? isMusique : [];
    isSpectacles = isSpectacles? isSpectacles : [];
    isArts = isArts? isArts : [];
    isLitterature = isLitterature? isLitterature : [];
 
    const results = [isCinema,isMusique,isSpectacles,isArts,isLitterature];
 
    const resultSlice = result.split(' ').length > 20 ? result.split(' ').slice(0,15).join(" ") : result;
 
    const isCinemaSlice = resultSlice.match(regexCinema);
    const isMusiqueSlice = resultSlice.match(regexMusique);
    const isSpectaclesSlice = resultSlice.match(regexSpectacles);
    const isArtsSlice = resultSlice.match(regexArtsVisuels);
 
    if(!isCinema.length && !isMusique.length && !isSpectacles.length && !isArts.length && !isLitterature.length ){
 
      return discipline = 'Musique';
 
    } else {
 
      const lengths = results.map(a => a.length)
      const index = lengths.indexOf(Math.max(...lengths));
 
 
      const matchPluridiscipline = result.match(/(pluridisciplinaire|pluri disciplinaire)/g)
      const isPluridisciplinaire = matchPluridiscipline? true : false;
 
      if(isPluridisciplinaire){
 
        return discipline = 'Pluridisciplinaire';
 
      } else if((isCinemaSlice ? isCinemaSlice.length > 3 : null) && isMusiqueSlice && isSpectaclesSlice && isArtsSlice){
      
        return discipline = 'Pluridisciplinaire';
 
      }else if( (results[index][0] === isSpectacles[0]) || (isMusique.length && isSpectacles.length && isArts.length)){
        
        return discipline = "Spectacle vivant";
 
      } else {
         const getResult = results[index];
         return discipline = isCinema[0] === getResult[0]? 'Cinéma,audiovisuel': (isMusique[0] === getResult[0]? 'Musique': (isArts[0] === getResult[0]? 'Arts visuels,arts numériques': (isLitterature[0] === getResult[0]? 'Livre,littérature': "" ))) ;
 
      }
 
    }
    
 
 
 
}
 
 
 
 
 
export default getDiscipline;
 

