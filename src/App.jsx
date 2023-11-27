import {NASA_URL, NASA_API_KEY} from './components/apiconfig'
import { useState,useEffect } from 'react'
import Figure from './components/Figure';
import axios from 'axios';
import './App.css'

function App() {
  
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const handleInput = (ev) => {
  setDate(ev.target.value.toLocaleString());
  };

  const fetchData = () => {
    // Construir la URL para la solicitud con Axios
    const apiUrl = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`;

    // Realizar la solicitud con Axios
    axios.get(apiUrl)
      .then(response => {
        setApodData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  };

  return (
    <>
   <h1>Nasa James Webb</h1>
  
    <div className='container'>
     <div>
      <p>Fecha actual: {today}</p>
      <input
        type="date"
        value={date}
        onChange={handleInput}
        max={today}
      />
      <button className='button' onClick={fetchData}>Obtener datos de la NASA</button>
    </div>
    
    {apodData && (
        <Figure
          title={apodData.title}
          date={date}
          explanation={apodData.explanation}
          url={apodData.url}
          copyright={apodData.copyright}
        />
      )}
        </div>
        </>
      )}
export default App
