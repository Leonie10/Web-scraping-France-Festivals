import logo from './logo.svg';
import Festivals from './components/Festivals/Festivals'
import './App.css';
import { useState } from 'react';

function App() {
const [data,setData] = useState()

const getData = (data) => {
  setData(data);
}
  return (
    <div className="App">
      <Festivals datas={getData}/>
    </div>
  );
}

export default App;
