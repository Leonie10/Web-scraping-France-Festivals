import { useState, useEffect } from "react";
import Festival from "./Festival";

const Festivals = () => {
  const [data, setData] = useState([]);
  const [loadNextPage, setLoadNextPage] = useState();
  const [results, setResults] = useState([]);
  const [sendData, setSendData] = useState();
  const [resMessage, setResMessage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [callsToAPI, setCallsToAPI] = useState();

  // get first time data from backend

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

  // load next page data

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

  // send data

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

        });
    }
  }, [sendData, resMessage]);

  console.log(results);

  const onGetResults = (data) => {
    setResults((results) => [...results, data]);
  };
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
  const onCloseApp = () => {
    window.localStorage.removeItem("totalPage");
  };

  console.log(data);

  return (
    <div>
      {data.length
        ? data.map((element, index) =>
            element ? (
              <Festival
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

      {data.length > 0 && currentPage === callsToAPI && (
        <button onClick={onSendData}>sauvegarder</button>
      )}
      {(totalPage ? Number(totalPage) === callsToAPI : false) && currentPage === totalPage &&(
        <button onClick={onCloseApp}>Terminer</button>
      )}
      {data && <p>{currentPage ? currentPage : null}</p>}
      <div>Nombre de pages :{totalPage ? totalPage : null} </div>
    </div>
  );
};

export default Festivals;
