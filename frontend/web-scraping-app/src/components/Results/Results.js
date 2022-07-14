import classes from './Results.module.css'
 
 
const Results  = (props) => {
  
   const onClickHandler = (event) => {
     event.preventDefault()
     const value = event.target.textContent.trim();
     props.onClickResult(value)
   }
 
   return <div>
        <div>
            <div className={classes.main}>

              {props.results.address? 
              props.results.address.slice(0,12).map( (result,index) => <button key={index} onClick={onClickHandler} className={classes.button}> {result.split(" ").slice(0,5).join(" ")} </button> ) 
              : null}

            </div>
          </div>
          <div>
              <button onClick={props.onSubmit} className={classes.submitButton}>Ajouter les résultats</button>
          </div>
     </div>
  
 
 }
 export default Results; 
 


 

