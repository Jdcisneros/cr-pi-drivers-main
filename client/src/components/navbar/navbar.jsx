/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import style from './navbar.module.css'
import f1 from '../../../../F1.svg'
import { Link } from 'react-router-dom'

function Navbar({handleChange, handleSubmit, isHome}) {
  return (
    <div className={style.navContainer}>

      {!isHome && (<Link to="/drivers">
            <button className={style.searchButton}>ATRAS</button>
         </Link>)}
       <Link to={`/drivers`}>
            <div className={style.logo}>
                 <img src={f1} className={style.logosize}/>
            </div>
        </Link>
        <div className={style.searchContainer}>
        <Link to="/drivers/form">
            <button className={style.searchButton}>Crear Driver</button>
         </Link>
            <form onSubmit={handleSubmit}>
                 <input  placeholder='Buscar' type="search" className={style.searchBar} onChange={handleChange} />
                 <button type='submit' className={style.searchButton}>Buscar</button>
           </form>
        </div>
    </div>
  )
}

export default Navbar