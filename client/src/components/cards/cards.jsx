/* eslint-disable react/prop-types */
import Card from '../card/card'
import style from './cards.module.css'

function Cards({ filtered }) {
  return (
    <div className={style.cardlist}>
      
      {filtered.map((driver) => (
        <Card 
          key={driver.id}
          id={driver.id} 
          image={driver.image} 
          forename={driver.name?.forename || driver.forename} 
          surname={driver.name?.surname || driver.surname}
          teams={driver.teams || []} 
          />
      ))}
    </div>
  );
}


export default Cards