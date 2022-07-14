const facebookAccount = require('../utils/facebookAccount')
const puppeteer = require('puppeteer');
 
 

 
const facebookScraper = async (festival) => {

  try {
    const browser = await puppeteer.launch({headless: false, args: ['--disable-notifications']});
    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1280, height: 1024 });
    await page.goto(festival.url)
 
   const cookieButtonSelector = 'div[aria-label="Autoriser les cookies essentiels et optionnels"]'
   const cookieButtonSelector2 = 'button[data-cookiebanner="accept_button"]'
 
   let cookieButtonExist = (await page.$(cookieButtonSelector)) ? cookieButtonSelector 
    : ((await page.$(cookieButtonSelector2)) ? cookieButtonSelector2 
    : "" );
 
    if(cookieButtonExist){
 
        await page.waitForSelector(cookieButtonExist)
        await page.waitForTimeout(1000)
 
        await page.click(cookieButtonExist)
 
        const emailInput = 'input[placeholder="Adresse e-mail ou téléphone"]'
        const emailInput2 = 'input[placeholder="Adresse e-mail ou numéro de tél."]' 
        const passwordInput = 'input[placeholder="Mot de passe"]'
 
        let emailInputExist = (await page.$(emailInput)) ? emailInput
        : ((await page.$(emailInput2)) ? emailInput2
        : "" );
 
        if(emailInputExist){
 
          await page.waitForSelector(emailInputExist)
          await page.waitForSelector(passwordInput)
 
          await page.evaluate((login,password,emailInputExist, passwordInput) => {
          document.querySelector(emailInputExist).value = login;
          document.querySelector(passwordInput).value = password;
          }, facebookAccount.login,facebookAccount.password,emailInputExist, passwordInput)
 
          await page.waitForTimeout(1000)
 
          const submitButton = 'div[aria-label="Accessible login button"]'
          const submitButton2 = 'button[id="loginbutton"]'
 
          let submitButtonExist = (await page.$(submitButton)) ? submitButton
          : ((await page.$(submitButton2)) ? submitButton2
          : "" );
 
 
          if(submitButtonExist){
            await page.waitForSelector(submitButtonExist)
            await page.click(submitButtonExist)
 
            await page.waitForNavigation()
            const b64string = await page.screenshot({ encoding: "base64", fullPage: true })
            const buffer = Buffer.from(b64string, "base64");
            festival.image = buffer
            festival.images = []
            festival.results = []
            festival.message = ''
            await browser.close()
          
            return festival
            
          }
 
        } else {
          // si le bouton se connecter n'existe pas alors on prend un screenshot de la page
          const b64string = await page.screenshot({ encoding: "base64", fullPage: true })
          const buffer = Buffer.from(b64string, "base64");
          festival.image = buffer
          festival.images = []
          festival.results = []
          festival.message = ''
          await browser.close()
        
          return festival
        }
 
    } else {
        // si les champs se connecter n'existent pas on prend un screenshot de la page
        const b64string = await page.screenshot({ encoding: "base64", fullPage: true })
        const buffer = Buffer.from(b64string, "base64");
        festival.image = buffer
        festival.images = []
        festival.results = []
        festival.message = ''
        await browser.close()
      
        return festival
 
    }
 
  } catch(err){
 
      return {id: festival.id, name: festival.name, url: festival.url, image: '', results: [], images: [], message: `Erreur au cours de la lecture: ${err}`}
  }
  
}
 
module.exports = facebookScraper
 

