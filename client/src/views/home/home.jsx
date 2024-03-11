/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getByName, getDrivers, orderDob} from '../../redux/actions'




import Cards from '../../components/cards/cards'
import Navbar from '../../components/navbar/navbar'




import style from './home.module.css'



function Home() {
  
  
  
  const dispatch = useDispatch();
  const allDrivers = useSelector((state)=> state.allDrivers)
  const [filtered, setFiltered] = useState(allDrivers)
  const [searchString, setSearchString] = useState("")
  const [selectedOrderName, setSelectedOrderName] = useState("asc")
  const [selectedOrderDob, setSelectedOrderDob] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1)
  const driversPerPage = 9;

 
  
  
  useEffect(() => {
    const filteredDrivers = allDrivers.filter((driver) =>
      `${driver.name?.forename || driver.forename} ${driver.name?.surname || driver.surname}`.toLowerCase().includes(searchString)
    );
    setFiltered(filteredDrivers);
  }, [allDrivers, searchString]);


  function handleChange(e){
    setSearchString(e.target.value.toLowerCase())
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString))
  }
  
  useEffect(()=>{
    dispatch(getDrivers())
  },[dispatch])
  
  useEffect(() => {
    setFiltered(allDrivers);
  }, [allDrivers]);
  
  const startIndex = (currentPage - 1)* driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const displayDrivers = allDrivers.slice(startIndex,endIndex)
  
  const totalpages = Math.ceil(allDrivers.length / driversPerPage);
  
  const changePage = (page) => {
    setCurrentPage(page);
  }

  const getPagesNumber = () => {
    const maxPageButton = 5;
    const halfMaxPageButtons = Math.floor(maxPageButton / 2)
    const startPage = Math.max(1, currentPage - halfMaxPageButtons)
    const endPage = Math.min(startPage +maxPageButton -1, totalpages)
    return Array.from({ length: endPage - startPage + 1}, (_,i)=>startPage + i)

    }

  const pageNumbers = getPagesNumber();   
  

  const handleOrderChange = (e) => {
    setSelectedOrderName(e.target.value);
    dispatch({ type: 'ORDER_NAME', acending: e.target.value === 'asc' });
  };


  const handleOrderDobChange = (e) => {
    setSelectedOrderDob(e.target.value);
    dispatch(orderDob(e.target.value === 'asc'));
  };

  return (
    <div className={style.home}>
      
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <div className={style.button}>
        
       <label>
          Ordenar por nombre:
          <select value={selectedOrderName} onChange={handleOrderChange}  className={style.select}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>
        <label>Ordenar por Fecha de Nacimiento: </label>
    <select value={selectedOrderDob} onChange={handleOrderDobChange} className={style.select}>
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>

         
      </div>
      <Cards filtered={displayDrivers} />
      <div  className={style.pages}>
        {currentPage !== 1 && (
          <button onClick={() => changePage(currentPage - 1)}>Anterior</button>
            )}
             {pageNumbers.map((pageNumber) =>(
          <button
              key={pageNumber}
              className={currentPage === pageNumber ? style.active : ''}
              onClick={()=> changePage(pageNumber)}>
             {pageNumber}
          </button>
             ))}
         {currentPage !== totalpages && (
          <button onClick={() => changePage(currentPage + 1)}>Siguiente</button>
        )}
      </div>
    </div>
  ) }

export default Home
