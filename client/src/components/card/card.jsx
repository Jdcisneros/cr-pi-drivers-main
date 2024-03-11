/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import style from './card.module.css'; 




const Card = ({ image, forename, surname, teams, id }) => {
  return (
    <div className={style.cardContainer}>
      <Link to={`${id}`} className={style.link}>
      <img src={image?.url || "https://www.teleadhesivo.com/es/img/spc029-jpg/folder/products-listado-merchanthover/pegatinas-coches-motos-piloto-formula-1.jpg"} alt={`${forename} ${surname}`} />
      
      <h2>{forename} {surname}</h2>
      <div className={style.teamContainer}>
      <p>TEAM</p>
      <p>{teams}</p>
      </div>
      </Link>
      </div>
  );
}

export default Card;