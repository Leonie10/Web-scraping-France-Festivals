const getMatch = require('./getMatch')
 
 
const getScreenShot = async (festival,$,page,timeout) => {
  let results = {address: [], others: []};
 
  $('section,strong,select,br,div,img,span,a,i,b,li,p,h1,h2,h3,h4').each( function () {
 
    let html = $.html($(this).clone().children().remove().end()); // html parent without children
    let text = $(this).clone().children().remove().end().text().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
 
    // Trouve les résultats dans le text il retourne [[adress match], [adress,discipline,season]]
    let match = getMatch(text,festival);
 
    // Vérifie si il y a des résultats d'adressage
    let adressLength = match[0].length > 0? match[0].length : null;
 
    let textReplace = text;
    
    // Vérifie si getMatch a trouvé des resultats
       if(match[1].length > 0){
 
         // iterate all result
        for(let i = 0; i < match[1].length; i++){
                textReplace = textReplace.replace(/(\(|\))/gi, ' ')
                if(adressLength && i <= adressLength - 1){
                 const removeParenthesesTxt = text.replace(/(\(|\))/gi, ' ');
                 const indexStart = removeParenthesesTxt.indexOf(match[1][i])
                 const indexEnd = indexStart + 50;
                 const additionalTextAdress = removeParenthesesTxt.slice(indexStart + match[1][i].length, indexEnd).split(' ').slice(0,6).join(' ')
                 const fullAdress = match[1][i] + additionalTextAdress;
                 results.address.push(fullAdress);
                 const regexMatch = new RegExp(fullAdress,'gi');
 
                 textReplace = textReplace.replace(regexMatch,`<span style="background-color: #ad2d37;color:yellow;font-size:30px;">${fullAdress}</span>`);
                } else {
                  const regexMatch = new RegExp(match[1][i],'gi');
                  results.others.push(match[1][i])
                  textReplace = textReplace.replace(regexMatch,`<span style="background-color:#f5c907;font-size: 30px;">${match[1][i]}</span>`);
                }
        }
        
       const replaceParent = $.html($(this).children().remove().end().html(textReplace))
    
    }
})
const idImage = festival.id + festival.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'", '').split(' ').join('') + Math.round(Math.random()*10000) + '.jpg';
const path = './images/'+ idImage;
 
await page.setContent($.html())
await page.waitForTimeout(timeout)
// const image = await page.screenshot({ path: path, fullPage: true })
const b64string = await page.screenshot({ encoding: "base64", fullPage: true })
const buffer = Buffer.from(b64string, "base64");
 
const resultsFilter = {address: [...new Set(results.address)], others: results.others }
 
return {image: buffer, results: resultsFilter};
}
 
module.exports = getScreenShot
 
 
 
 

