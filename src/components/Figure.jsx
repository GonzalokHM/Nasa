import PropTypes from 'prop-types';

const Figure = ({ title, date, explanation, url, copyright }) => {
  return (
    <div className='figure'>
      <h2>{title}</h2>
      <img src={url} alt={title} />
      <div>
        <p>{explanation}</p>
        <div className='figure-footer'>
        <p>Esta imagen corresponde con la fecha: {date}</p>
        <p>copyright:{copyright}</p>
        </div>
      </div>
    </div>
  );
};

Figure.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    copyright: PropTypes.string.isRequired,
  };

export default Figure;
