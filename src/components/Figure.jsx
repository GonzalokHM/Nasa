import PropTypes from 'prop-types';

const Figure = ({ title, date, explanation, url, copyright, img_src, camera, earth_date, sol, api }) => {
  // Obtener el nombre de la cámara
  const cameraName = camera ? camera.full_name : null;

 // Verificar si el título y la URL están presentes, de lo contrario, usar propiedades de la cámara
 const renderedTitle = title || cameraName;
 const renderedUrl = url ||img_src; 

  return (
    <div className='figure'>
      <h2>{renderedTitle}</h2>
      <img src={renderedUrl} alt={title || cameraName}/>
      <div>
        <p>{explanation} || This image corresponds to the Martian sol:{sol}</p>
        <div className='figure-footer'>
        <p>This image corresponds to date: {date||earth_date}</p>
        {api === 'apod' && <p>copyright:{copyright}</p>}
        </div>
      </div>
    </div>
  );
};

Figure.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    explanation: PropTypes.string,
    url: PropTypes.string,
    copyright: PropTypes.string,
    camera: PropTypes.shape({
      full_name: PropTypes.string
    }),
    earth_date: PropTypes.string,
    img_src: PropTypes.string,
    sol:PropTypes.number,
    api: PropTypes.string
  };

export default Figure;
