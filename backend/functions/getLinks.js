const secondFilterUrlsRegex = new RegExp([
   "^(plan|informations|informations et contact|informations et reservation|information|presentation|edito|archives|archives 2020|archives 2021|edition 2020|edition 2021|editions precedentes|editions passées|reservations)$"
    ].join(''), 'gi');
  
  
 const filterUrlRegex = require('../regex/filterUrls');
 const filterLinks = require('./filterLinks')
  
 const getLinks = ($, festival) => {
  
    let linksToFilter = [];
    const linkObjects = $('a');
    let links = [[],[]];
    const isRelevantLinks = [];
  
    // On récupère le lien et le nom du lien puis on l'ajoute dans l'array des résultats
  
    linkObjects.each((index, element) => {
        const urlText = $(element).text().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim();
  
          if(urlText){
  
                 const url = $(element).attr('href')
  
                 const isUrlRelevant = urlText.match(filterUrlRegex)
                 const isUrlRelevantSecond = urlText.match(secondFilterUrlsRegex);
  
  
                 if(isUrlRelevant){
                     return linksToFilter.push({type: 1,text: urlText.toLowerCase(), url: url});
                 }
  
  
                 if(isUrlRelevantSecond){
                   return linksToFilter.push({type: 2,text: urlText.toLowerCase(), url: url});
                 }
             }
  
    });
  
    // Suprime les doublons 
    linksToFilter = [...new Map(linksToFilter.map(link => [link.text, link])).values()]
    linksToFilter = [...new Map(linksToFilter.map(link => [link.url, link])).values()]
    
    linksToFilter.forEach(link => {
      if(link.url && link.url !== "#"){
  
        if(link.type === 1){
  
           filterLinks(festival,link.url)?  links[0].push({type: 1,text: link.text, url: filterLinks(festival,link.url)}) : false;
  
        } else if(link.type === 2){
           filterLinks(festival,link.url)?  links[1].push({type: 2,text: link.text, url: filterLinks(festival,link.url)}) : false;
        }
     }
    })
  
    return links;
  
 }
  
 module.exports = getLinks
  
  
 
 