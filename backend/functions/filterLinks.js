const filterLinks = (festival,url) => {
 
    const regexIsHTTP = /^http/gi;
    const regexisSubDirectoryUrl = /^\//gi;
    const regexisHTML = /(^document|^([a-zA-Z]|[#?%:;]|[0-9])|html$)/gi
    const regexIsMailTo = /^mail/gi
 
    const isHTTP = url.match(regexIsHTTP)!== null ? true : false;
    const isSubDirectory = url.match(regexisSubDirectoryUrl);
    const isHTML = url.match(regexisHTML)
    const isMailTo = url.match(regexIsMailTo);
 
 
    const regexDomain = /^(http|https):\/+[a-z0-9.&-]{2,60}/gi;
    const domain = festival.url.match(regexDomain)[0];
 
    let fullUrl = url;
 
    
    const isSocialMediaUrl = fullUrl.match(/(facebook|youtube|instagram|twitter|linkedin|tiktok|pinterest|flickr)/gi) !== null? true : false;
    const isPDForImage = fullUrl.match(/[.]+(pdf|jpg|jpeg|png)/gi) !== null ? true : false;
        
        if(isHTTP && !isSocialMediaUrl && !isPDForImage){
            return fullUrl;
        } else if(isSubDirectory  && !isSocialMediaUrl && !isPDForImage) {
            return fullUrl = domain + url;
        } else if(isHTML && !isMailTo && !isSocialMediaUrl && !isPDForImage){
            return fullUrl = domain + '/' + url
        }
 
}
 
module.exports = filterLinks;
 
 
 
 
 

