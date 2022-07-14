import classes from './ScreenShots.module.css';
 
const ScreenShots = (props) => {
 
   let image = undefined;
   if(props.image !== undefined){
       const imgBase64 = props.image
       image = btoa(imgBase64.reduce((data, byte) => data + String.fromCharCode(byte), ''))
   }
  
  
  // images : image, text, results,url
 
   return (
 
       <div className={classes.main}>
 
           {props.image!== undefined ? <img src={`data:image/png;base64,${image}`} className={classes.image}/> : <p>Erreur dans la lecture de la page: {props.message}</p>}
 
           {props.images.length > 0? props.images.map((image, index) => {
               let img;
 
               if(image.type === 1){
 
                   img = btoa(image.buffer.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    return <div key={index} className={classes.images}>
                               <p>{image.text} <a href={image.url} target="_blank" >{image.url}</a></p>
                               { image.type === 1 && <img src={`data:image/png;base64,${img}`} className={classes['images-img']}/>}
                           </div>
 
               } else if(image.type === 2) {
 
                    return <div key={index} className={classes.images}>
                                <p>{image.text} <a href={image.url} target="_blank">{image.url}</a></p>
                           </div>
               }
 
           }) : null}
 
       </div>
   )
}
export default ScreenShots;
 
 
 
 

