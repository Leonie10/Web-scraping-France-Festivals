const { Cluster } = require("puppeteer-cluster");
const getScreenShot = require('./getScreenShot')
const cheerio = require('cheerio');
const axios = require('axios')

// Prend des screenshots des page intéressantes du site pour trouver les données
 
const getPaths = async (links, festival,timeout) => {
 
      let images = [];
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
          return images;
      });
    
      await cluster.task(async ({ page, data : url }) => {
    
          await page.setViewport({ width: 1280, height: 1024 });
        
            const response  = await axios.get(url);
            const isDownloadable = await response.headers['content-disposition'] === undefined? false : true ;
        
                if(!isDownloadable){
            
                    await page.goto(url)
                    const $ = await cheerio.load(response.data);
                    const results = await getScreenShot(festival,$,page,timeout)
                    links[0].forEach( link => {
                      if(link.url === url){
                        images.push({ type: 1, text: link.text, url: url,buffer: results.image, results: results.results})
                      }
                    })
            
                } else {
                  links[0].forEach( link => {
                    if(link.url === url){
                      links[1].push({type: 2,text: link.text,url: url })
                      
                    }
                  })
 
                }
          
      })
          
      for(const link of links[0]){
            await cluster.queue(link.url);
      }
      
      await cluster.idle();
      await cluster.close();
      images = [...images,...links[1]]
      return images;
 
}
 
module.exports = getPaths