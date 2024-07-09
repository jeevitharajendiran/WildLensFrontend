import './Card.css'
import { PropTypes } from "prop-types";
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import star from "@/assets/icons/star.svg"

const Card = ( { tour, className } ) => {
  
  let rating = 4;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tours/${tour["_id"]}`, { state:{ tour } } );
    console.log( tour );
  }

  return (
    <div className={`content shadow-lg transition-all duration-300 ` + ( className ? className : '')} onClick={ handleClick }>
      <div className='img_cont'>
        <img src={`${config.API_URI}${tour.image}`} className='imgs overflow-y-hidden object-cover object-center shadow-lg' alt="image" />
        <div className='off'>
          <h6 className='offing'>{tour.offer}% off</h6>
        </div>
      </div>
      <div className="cont_div">
        <h4 className="topic">{tour.name}</h4>
        <h5 className="desc line-clamp-3 text-ellipsis min-h-20">{tour.description}</h5>
        <div className="footer">

          <div className="flex justify-center items-center gap-1.5">
            {Array.from( {length: rating}, ( _, ind ) => (
              <img key={ind} width="18px" src={star} alt="Rating Star"/>
            ))}
          </div>

          <h4 className="cost">{tour.price}/person</h4>
        </div>
      </div>
    </div>
  )
}

export default Card;

Card.propTypes = {
  tour: PropTypes.object.isRequired,
  className: PropTypes.string
}
