const path = require('path')
 
const Excel = require("xlsx");
const ExcelJs = require('exceljs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios')
const express = require('express')
const { Cluster } = require("puppeteer-cluster");
 
const app = express();
const PORT = 8080;
 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
 
 
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
 
 
 
// fonctions
const getLinks = require('./functions/getLinks')
const getScreenShot = require('./functions/getScreenShot')
const getPaths = require('./functions/getPaths')
const facebookScraper = require('./functions/facebookScraper')
 
 
/// Fichier Excel
 
const fileReadData = Excel.readFile('./file/occitanie.xlsx');
const fileSendData = './file/occitanie.xlsx';
const sheetName = fileReadData.SheetNames;
const data = Excel.utils.sheet_to_json(fileReadData.Sheets[sheetName[0]], {defval: ""});
const workbook = new ExcelJs.Workbook();
 
 
 
let festivals = [];

// Obtenir les festivals où les données sont absentes
 
data.forEach( festival => {
  const isDataMissing = !festival.num_voie && !festival.type_voie && !festival.nom_voie && !festival.complement_adresse;
  ;
  if(isDataMissing){
       return festivals.push({ id: festival.identifiant, name: festival.Nom, url: festival.site_internet})  ;
  } else {
       return;
  }
})
 
 
 
 
const scraper = async (festivals) => {
 
  const festivalsResults = [];
 
    const cluster = await Cluster.launch({
              concurrency: Cluster.CONCURRENCY_PAGE,
              maxConcurrency: 100,
              monitor: true,
              puppeteerOptions: {
                headless: true,
                defaultViewport: false,
                userDataDir: "./cluster",
              },
    });
 
    cluster.on("taskerror", (err, data) => {
          console.log(`Error crawling ${data}: ${err.message}`);
          return festivalsResults.push({id: festivals[data].id, name: festivals[data].name,url: festivals[data].url, image: '', results: [], images: [], messsage: `Erreur au cours de la lecture de la page: ${err.message}` })
    });
 
    await cluster.task(async ({ page, data : i }) => {
 
      let festival = festivals[i];
      await page.setDefaultNavigationTimeout(0);
      await page.setViewport({ width: 1280, height: 1024 });
 
      const isFacebookUrl= festival.url.match(/facebook/gi)
 
      if(isFacebookUrl){
 
        festival = await facebookScraper(festival)
        festivalsResults.push(festival);
 
      } else {
        await page.goto(festival.url)
 
        const response  = await axios.get(festival.url);
 
        const isDownloadable = await response.headers['content-disposition'] === undefined? false : true ;
 
        if(!isDownloadable){
 
            const $ = await cheerio.load(response.data);
 
            let resultsLinks = await getLinks($, festival)

 
            festival.image = [];
 
            const festivalResult =  await getScreenShot(festival,$,page,1000);
            festival.image = festivalResult.image;
            festival.results = festivalResult.results
            festival.message = '';
 
 
            // Obtenir les screenshots des pages intéressantes sur le site à partir de l'url du festival
 
            if(resultsLinks.length > 0){
 
                  const imageUrls = await getPaths(resultsLinks,festival,0)
                  festival.images = imageUrls
                  
                  festivalsResults.push(festival);
 
            } else {
              festival.images = []
              festivalsResults.push(festival);
            }
 
        } else {
 
           festival.message = "Le contenu est téléchargeable, il ne peut pas être lu. "
           festival.image = ''
           festival.images = []
           festival.results = []
           festivalsResults.push(festival);
        }
 
      }
      
    
    })
 
      for(let i = 0; i < festivals.length; i++){
          const iString = i.toString()
          await cluster.queue(iString);
      }
 
          
      
      await cluster.idle();
      await cluster.close();
      return festivalsResults
 
 
}
 
 
// routes
 
// Afficher les trois premières pages de résultats

app.get('/', (req,res,next) => {
 
  const totalFestival = Number(festivals.length);
  const perPage = 3;
  const totalPage = Math.ceil(totalFestival / perPage)
  
  const scrapers = scraper(festivals.slice(0,3));
 
  scrapers.then( festivals => {
    res.status(200).json([{totalPage: totalPage, data: festivals}])
    console.log(festivals)
  })
})
 
// Afficher les pages suivantes 
 
app.get('/results/', (req,res,next) => {
  const currentPage = Number(req.query.page) || 1;
  const lastPage = currentPage - 1;
  // 3 festivals par page
  const perPage = 3;
  let start = lastPage * perPage;
  let end = currentPage * perPage;
 
  const scrapers = scraper(festivals.slice(start,end));
 
  scrapers.then( festivals => {
    res.status(200).json(festivals)
    console.log(festivals)
  })
 
})

// Sauvegarder les résultats dans le fichier
console.log('last',festivals[festivals.length-1]);
 
app.post('/save/', (req,res,next) => {
  const results = req.body;
  const lastFestival = festivals[festivals.length-1];
  const lastResult = results[results.length-1];

  console.log('BODY',results) // [ {id, name, season, discipline, adress {num,type,name, place}}...]
 
  workbook.xlsx.readFile(fileSendData)
          .then( function () {

                // Colonne id
               const worksheet = workbook.getWorksheet(sheetName[0]);
               const idColumn = worksheet.getColumn('A');
 
               results.forEach(result => {
                    idColumn.eachCell( (cell, rowNumber) => {
                        if(cell.text === result.id.toString() ){
                            let row = worksheet.getRow(rowNumber);
                            row.getCell('P').value = result.season;
                            row.getCell('R').value = result.adress.num;
                            row.getCell('S').value = result.adress.type;
                            row.getCell('T').value = result.adress.name;
                            row.getCell('U').value = result.adress.place;
                            row.getCell('Z').value = result.discipline;
                            row.getCell('AE').value = result.comment;
                            row.commit();
                        }
                    })
               })
    return workbook.xlsx.writeFile(fileSendData);
 
})
.catch(err => console.log(err))
let message = 'Sauvegarde réussie'
message = lastFestival.id === lastResult.id? 'Terminé!' : 'Sauvegarde réussie';

res.status(200).json(message)
 
})
 
 
app.listen(PORT, () => console.log('server is running'))
 
 
 
 

