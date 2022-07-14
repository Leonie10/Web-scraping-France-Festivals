
const validationInput = (inputValue) => {

    const nonCapitalizeWordsRegex = /((\b(de|de la|la|le|les|à|a|en|ou|sur|un|une|des|aux|au|et|pour|par|dans|du)\b)|\b(d|l)['’-])/gi 
   
    if(inputValue){
        const inputValueArr = inputValue.split(" ");
        
        const inputValueArrRemoveFirst = inputValueArr.slice(1);
        const inputValueArrCapitalize = inputValueArrRemoveFirst.map( word => {
           const isMatch =  word.match(nonCapitalizeWordsRegex);
           console.log('inputValue', isMatch)
           const wordReturn = !isMatch? word.charAt(0).toUpperCase() + word.slice(1) : ((isMatch[0] === "d'") || (isMatch[0] === "d’") || (isMatch[0] === "l’") || (isMatch[0] === "l'")?
           isMatch[0] + word.charAt(2).toUpperCase() + word.slice(3) : word);
           return wordReturn;
        })
        const result = inputValueArr[0].charAt(0).toUpperCase() + inputValueArr[0].slice(1) + ' ' +  inputValueArrCapitalize.join(" ")
        return result;
    } else {
        return inputValue;
    }
    
}

export default validationInput;  