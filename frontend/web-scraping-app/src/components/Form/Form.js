import {useState,useRef, useEffect} from 'react';
import getDiscipline from '../../utils/getDiscipline';
import getSeason from '../../utils/getSeason';
import validationInput from '../../utils/validationInput'
import classes from './Form.module.css'
import Results from '../Results/Results'
 
const regexBeginTypeAdress = /^(rue|boulevard|place|allee|route|avenue|carrer|impasse|chemin)\b/gi
const regexTypeAdress = /\b(rue|boulevard|place|allee|route|avenue|carrer|impasse|chemin)\b/gi
const regexHasBis = /[0-9]{0,4}[,;.-]?\s?\b(bis)\b/gi
const regexIsAdress = /^[0-9]/gi;
 
 
const Form = (props) => {
 
 let getdiscipline = 'Saison (21 juin - 5 septembre)';
 let getseason = 'Musique';
 
 if(props.results.others){
 
   const resultsLower = props.results.others.map(result => result.toLowerCase())
   const resultsString = resultsLower.join(" ");
 
   getdiscipline = getDiscipline(resultsString);
   getseason = getSeason(resultsString);
 
 
 }
  
  const [adressClicked,setAdressClicked] = useState();
 
  // Refs des inputs
 
   const numRef = useRef()
   const typeRef = useRef()
   const nameRef = useRef()
   const placeRef = useRef()
   const disciplineRef = useRef()
   const seasonRef = useRef()
   const commentRef = useRef()
 
  // Remplit le formulaire au click sur un résultat
 
    if (adressClicked) {
 
       let num = adressClicked.trim().match(regexIsAdress) // begin by a number
       const hasBis = adressClicked.match(regexHasBis) // contain bis
       const type = adressClicked.match(regexTypeAdress) // contains type 
       const isBeginType = adressClicked.trim().match(regexBeginTypeAdress) // begin by type
 
       if(num){
         num = hasBis? hasBis[0] : num[0];
         numRef.current.value = type? num[0] : '';
         typeRef.current.value = type? type[0].charAt(0).toUpperCase() + type[0].slice(1) : '';
         const indexType = type? adressClicked.indexOf(type[0]) + type[0].length + 1 : null;
         const name =  indexType? adressClicked.slice(indexType).charAt(0).toUpperCase() + adressClicked.slice(indexType+1) : '' ;
         nameRef.current.value = name;
         placeRef.current.value = !type && !name? adressClicked : '';
 
       } else if(isBeginType) {
         const typeCapitalize = isBeginType[0].charAt(0).toUpperCase() + isBeginType[0].slice(1)
         const indexType = adressClicked.indexOf(isBeginType[0]) + isBeginType[0].length + 1
         numRef.current.value = '';
         typeRef.current.value = typeCapitalize;
         nameRef.current.value = adressClicked.slice(indexType).charAt(0).toUpperCase() + adressClicked.slice(indexType + 1);
 
       } else {
 
         placeRef.current.value = adressClicked;
 
       }
 
    }
 
 
   // Ajouter le résultat au formulaire
 
    const onAdressClicked = (value) => {
      setAdressClicked(value)
    }
 
 
  // Envoyer les valeurs du formulaire pour les enregistrer sur le fichier excel
  
    const onSubmitHandler = (e) => {
      const numCapitalize = validationInput(numRef.current.value);
      const typeCapitalize = validationInput(typeRef.current.value);
      const nameCapitalize = validationInput(nameRef.current.value);
      const placeCapitalize = validationInput(placeRef.current.value);
      console.log('numCapitalize', numCapitalize)
      console.log('typeCapitalize', typeCapitalize)
      console.log('nameCapitalize', nameCapitalize)
      console.log('placeCapitalize', placeCapitalize)
      
      e.preventDefault();
 
      props.onSubmit({
        discipline: disciplineRef.current.value,
        season: seasonRef.current.value,
        num: numCapitalize,
        type: typeCapitalize,
        name: nameCapitalize,
        place: placeCapitalize,
        comment: commentRef.current.value
      })
    }
 
 
 
   return (
 
     <form className={classes.form}>
 
         <div className={classes.info}>
            <p className={classes.festivalName}>ID{props.id} {props.name}</p>
            <a href={props.url} target="_blank" className={classes.festivalUrl}>{props.url}</a>
            <p className={classes.selectResult}>{getdiscipline}</p>
            <p className={classes.selectResult}>{getseason}</p>
         </div>
 
 
        <div>
              <div>
                <select ref={seasonRef} defaultValue={getSeason} className={classes.input} >
                  <option value="Saison (21 juin - 5 septembre)" >Saison (21 juin - 5 septembre)</option>
                  <option value="Après-saison (6 septembre - 31 décembre)">Après-saison (6 septembre - 31 décembre)</option>
                  <option value="Avant-saison (1er janvier - 20 juin)">Avant-saison (1er janvier - 20 juin)</option>
                </select>
              </div>
 
                <div>
        
                <select ref={disciplineRef} defaultValue={getdiscipline} className={classes.input} >
                  <option value="Musique" >Musique</option>
                  <option value="Cinéma,audiovisuel">Cinéma,audiovisuel</option>
                  <option value="Livre,littérature">Livre,littérature</option>
                  <option value="Spectacle vivant">Spectacle vivant</option>
                  <option value="Arts visuels,arts numériques">Arts visuels,arts numériques</option>
                  <option value="Pluridisciplinaire">Pluridisciplinaire</option>
                </select>
              </div>
        </div>
 
 
        <div>
              <div className={classes['font-link']}>Adresse</div>
              <div>
                <input type="text" ref={numRef} className={classes.input} placeholder="n° de voie ex: 10" />
              </div>
 
              <div>
                <input type="text" ref={typeRef} className={classes.input} placeholder="type de voie ex: Rue, Boulevard.." />
              </div>
 
              <div>
                <input type="text" ref={nameRef} className={classes.input} placeholder="nom de la voie" />
              </div>
                <div>
                <textarea type="text" ref={placeRef} className={`${classes.input} + ${classes.textarea}`} placeholder="Complément d'adresse(lieu-dit)" />
              </div>
        
              <div>
                <div >Commentaire </div>
                <textarea type="text" ref={commentRef} className={classes.input} />
              </div>
 
        </div>
 
       <Results onClickResult={onAdressClicked} results={props.results} onSubmit={onSubmitHandler}/>

      
 
     </form>
   )
 }
 
 
 export default Form;
 
 

