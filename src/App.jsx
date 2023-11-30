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
    try {
      fetchData();
    } catch (error) {
      console.error('Error al cargar datos iniciales', error);
    }
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
    const cameras = ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'];
    const tryNextCamera = (currentIndex) => {
      if (currentIndex < cameras.length) {
        const camera = cameras[currentIndex];

      const apiUrl = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${NASA_API_KEY}`;
  console.log(apiUrl)
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('Response from Mars Rovers API:', response.data);
        if (response.data.photos.length > 0) {
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
    } else {
            // Intentar la siguiente cámara si no hay fotos en la actual
            tryNextCamera(currentIndex + 1);
          }
        })
      .catch((error) => {
        ('Error al obtener datos de la API de Mars Rovers para la cámara', camera, error);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      // Si no hay fotos en ninguna cámara
      console.log('No hay fotos disponibles para ninguna cámara');
      setLoading(false);
    }
  };

  tryNextCamera(0);
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
