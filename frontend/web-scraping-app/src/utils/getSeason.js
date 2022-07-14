const regexSaison =/(juillet|aout)/g
const regexApresSaison = /(septembre|octobre|novembre|decembre)/g
const regexAvantSaison = /(janvier|fevrier|mars|avril|mai|juin)/g

// Trouver la saisonnalité en fonction des résultats trouvés sur le site
 
function getSeason (result) {
    let isSaison = result.match(regexSaison)
    let isApresSaison = result.match(regexApresSaison)
    let isAvantSaison = result.match(regexAvantSaison)
 
    isSaison = isSaison? isSaison : [];
    isApresSaison = isApresSaison? isApresSaison : [];
    isAvantSaison = isAvantSaison? isAvantSaison : [];
 
    const results = [isSaison,isApresSaison,isAvantSaison];
    const lengths = results.map(a => a.length)
    const index = lengths.indexOf(Math.max(...lengths));
    const getResult = results[index];
    const saisonnalite = isSaison[0] === getResult[0]? 'Saison (21 juin - 5 septembre)' 
    : (isAvantSaison[0] === getResult[0]? 'Avant-saison (1er janvier - 20 juin)' 
    : (isApresSaison[0] === getResult[0]? 'Après-saison (6 septembre - 31 décembre)' 
    : ''));
 
    return saisonnalite;
 
}
 
export default getSeason;

