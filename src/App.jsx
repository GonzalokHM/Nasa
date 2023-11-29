import {NASA_URL, NASA_API_KEY} from './components/apiconfig'
import { useState,useEffect } from 'react'
import Figure from './components/Figure';
import axios from 'axios';
import './App.css'

function App() {
  
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedApi, setSelectedApi] = useState('apod');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date,selectedApi])

  const handleInput = (ev) => {
  setDate(ev.target.value.toLocaleString());
  };

  const handleApiChange = (ev) => {
    setSelectedApi(ev.target.value);
  };

  const fetchApodData = () => {
    setLoading(true);
    const apiUrl = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log('Response from apod API:', response.data);
        setApodData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMarsRoversData = () => {
    setLoading(true);
    // Construir la URL para la solicitud de Mars Rovers con Axios
    const apiUrl = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=fhaz&api_key=${NASA_API_KEY}`;
console.log(apiUrl)
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('Response from Mars Rovers API:', response.data);
        const firstPhoto = response.data.photos[0];

        setMarsData({
          title: firstPhoto.camera.full_name,
          date: firstPhoto.earth_date,
          explanation: 'Mars Rover Photo',
          url: firstPhoto.img_src,
          sol: firstPhoto.sol,
          camera: firstPhoto.camera,
          earth_date: firstPhoto.earth_date,
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API de Mars Rovers', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = () => {
    if (selectedApi === 'apod') {
      fetchApodData();
    } else if (selectedApi === 'marsRovers') {
      fetchMarsRoversData();
    }
  };

  return (
    <>
   <h1>Nasa James Webb</h1>
  
    <div className='container'>
     <div>
      <p>Fecha actual: {today}</p>
      <label>
            Selecciona una API:{' '}
            <select value={selectedApi} onChange={handleApiChange}>
              <option value='apod'>APOD</option>
              <option value='marsRovers'>Mars Rovers</option>
            </select>
          </label>
      <input
        type="date"
        value={date}
        onChange={handleInput}
        max={today}
      />
      <button className='button' onClick={fetchData} disabled={loading}>
      {loading ? 'Cargando...' : 'Obtener datos de la NASA'}
      </button>
    </div>
    {(selectedApi === 'apod' && apodData) || (selectedApi === 'marsRovers' && marsData) ? (
  <Figure
    {...(selectedApi === 'apod' ? apodData : marsData)}
    date={date}
    api={selectedApi}
  />
) : null}
        </div>
        </>
      );
    }
export default App
