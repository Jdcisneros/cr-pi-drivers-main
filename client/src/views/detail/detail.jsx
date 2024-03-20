import { useParams } from 'react-router-dom'
import style from './detail.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';




function Detail() {

  const params = useParams();

  const [drivers, setDrivers] = useState({})

  useEffect(()=>{
  axios(`http://localhost:3001/drivers/${params?.id}`).then(({data}) => {

    if(data?.name || data?.forename) {
      setDrivers(data);
    } else {
      alert('no existe ese driver')
    }

    if (data?.dob) {
      data.dob = data.dob.toString().split('',10)
    }

    

  })
  .catch(()=> {
      console.log('Se rompió')
  })

  return ()=> setDrivers({});
},[params?.id])

  return (
    <div>
    <Navbar/>
    
    <div className={style.container}>
       <div className={style.image}>
            <img src={drivers?.image?.url || "https://www.teleadhesivo.com/es/img/spc029-jpg/folder/products-listado-merchanthover/pegatinas-coches-motos-piloto-formula-1.jpg"
            } alt={drivers?.name?.forename && drivers?.name?.surname}/>
            </div>
            <div className={style.cardDetail}>
            <h2>Name: {drivers?.name?.forename || drivers?.forename}</h2>
            <h2>Surname: {drivers?.name?.surname || drivers?.surname}</h2>
            <p>Id: {drivers?.id}</p>
            <p>Nationality: {drivers?.nationality}</p>
            <p>Date of Birdth: {drivers?.dob}</p>
            <p>Teams:</p>
            <ul>
              <li>{drivers?.teams}</li>
            </ul>
            <h3>Description:</h3>
            <p> {drivers?.description}</p>
            </div>
    </div>
    </div>
  )
}


export default Detail