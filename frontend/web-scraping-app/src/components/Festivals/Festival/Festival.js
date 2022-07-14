 
import {useState,useRef, useEffect} from 'react';
import ScreenShots from '../../Screenshots/ScreenShots';
import Form from '../../Form/Form';
import Results from '../../Results/Results';
import classes from './Festival.module.css'
const regexTypeAdress = /(rue|boulevard|place|allee|route|avenue|carrer|impasse|chemin)/gi
const regexHasBis = /[0-9]\s?(bis)\s+?/gi
const regexIsAdress = /^[0-9]/gi;
 
 
const Festival  = (props) => {
 
  // Ajouter les résultats du formulaire aux résultats totaux pour envoyer au fichier excel ensuite
  const addResult = (data) => {
   props.onGetResults({
     id: props.id,
     name: props.name,
     season: data.season,
     discipline: data.discipline,
     adress: {
       num: data.num,
       type: data.type,
       name: data.name,
       place: data.place
     },
     comment: data.comment
   })
  }
 
     return (
        <div className={classes.main}>
 
           <Form
           id={props.id}
           url={props.url}
           name={props.name}
           onSubmit={addResult}
           results={props.results}
           />
           <ScreenShots url={props.url} image={props.image.data} images={props.images} message={props.message}/>
         </div>
     )
 }
 
 export default Festival;
 
 
 
 

