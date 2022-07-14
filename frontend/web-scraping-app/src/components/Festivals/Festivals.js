import { useState, useEffect } from "react";
import Festival from "../Festivals/Festival/Festival";
import classes from './Festivals.module.css';

const Festivals = () => {
  const [data, setData] = useState([]);
  const [loadNextPage, setLoadNextPage] = useState();
  const [results, setResults] = useState([]);
  const [sendData, setSendData] = useState();
  const [resMessage, setResMessage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [callsToAPI, setCallsToAPI] = useState();

  // Charger les résultats des trois premières pages

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data[0].data);
        const calls = data[0].totalPage > 3 ? 3 : Math.ceil(data[0].totalPage);
        setCallsToAPI(calls);
        localStorage.setItem("totalPage", JSON.stringify(data[0].totalPage));
        setLoadNextPage(true);
        setCurrentPage(1);
      });
  }, []);

  let totalPage = localStorage.getItem("totalPage");

  // Charger les trois prochaines pages 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadNextPage && currentPage !== callsToAPI) {
        fetch(`http://localhost:8080/results/?page=${currentPage + 1}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            setData((data) => [...data, ...result]);
            setCurrentPage((prevState) => prevState + 1);
          });
      } else {
        setLoadNextPage(false);
      }
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [loadNextPage, currentPage]);




  // Envoyer les résultats au fichier excel

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(results),
  };

  useEffect(() => {
    if (sendData) {
      fetch("http://localhost:8080/save/", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((message) => {
          setResMessage(message);
          setResults([])

        });
    }
    return () => {setSendData(false)}
  }, [sendData, resMessage]);

  console.log('resultats', results);
  console.log('message', resMessage)

  // Obtenir les résultats des formulaires

  const onGetResults = (data) => {
    setResults((results) => [...results, data]);
  };
  console.log(results)



  const onSendData = () => {
    setSendData(true);
    setData([]);
    setCallsToAPI((prevState) => {
      return prevState + 3 > totalPage
        ? prevState + (totalPage - prevState)
        : prevState + 3;
    });
    setLoadNextPage(true);

    
  };

  // Suprime la valeur stockée dans localStorage

  const onCloseApp = () => {
    window.localStorage.removeItem("totalPage");
  };

  console.log(data);
  console.log('currentPage',currentPage)
  console.log('BOUTON TERMINE', resMessage === 'Sauvegarde réussie');
  console.log('=', currentPage === totalPage)

  return (
    <div className={classes.body}>
      {data.length
        ? data.map((element, index) =>
            element ? (
              <Festival
                key={index}
                id={element.id}
                name={element.name}
                url={element.url}
                image={element.image}
                images={element.images}
                results={element.results}
                onGetResults={onGetResults}
                message={element.message}
              />
            ) : null
          )
        : null}

      {data.length > 0 && (currentPage === callsToAPI) && (
        <button onClick={onSendData} className={classes.saveButton}>sauvegarder</button>
      )}
      {((currentPage? currentPage.toString() : currentPage) === (totalPage? totalPage.toString() : totalPage)) &&(
        <p className={classes.finishText}>Terminé! Pensez à sauvegarder</p>
      )}
      {data && <div className={classes.page}>{currentPage ? currentPage : null}</div>}
      <div className={classes.page}>Nombre de pages :{totalPage ? totalPage : null} </div>
    </div>
  );
};

export default Festivals;
