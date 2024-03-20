/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getByName, getDrivers, orderDob, getTeams } from "../../redux/actions";

import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";

import style from "./home.module.css";
function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const [filtered, setFiltered] = useState(allDrivers);
  const [searchString, setSearchString] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [selectTeam, setSelectTeam] = useState("");

  const [selectedOrderName, setSelectedOrderName] = useState("asc");
  const [selectedOrderDob, setSelectedOrderDob] = useState("asc");
  const [Page, setPage] = useState(1);
  const forPage = 9;

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  //filtrado por nombre y por apellido

  useEffect(() => {
    const filteredDrivers = allDrivers.filter((driver) =>
      `${driver.name?.forename || driver.forename} ${
        driver.name?.surname || driver.surname
      }`
        .toLowerCase()
        .includes(searchString)
    );
    setFiltered(filteredDrivers);
    setPage(1);
  }, [searchString, allDrivers]);

  useEffect(() => {
    if (selectTeam === "") {
      setFilteredTeam(allDrivers);
    } else {
      const filterbyTeam = allDrivers.filter(
        (driver) =>
          driver.teams &&
          driver.teams.toLowerCase().includes(selectTeam.toLowerCase())
      );
      setPage(1);
      setFilteredTeam(filterbyTeam);
      console.log("el filteredTeamNames", filterbyTeam);
    }
  }, [selectTeam, allDrivers]);

  //PAGINADO
  const indiceUltDriver = Page * forPage;
  const indicePritDriver = indiceUltDriver - forPage;
  const currentDrivers = filtered.slice(indicePritDriver, indiceUltDriver);

  const indiceUltFilteredDriver = Page * forPage;
  const indicePritFilteredDriver = indiceUltFilteredDriver - forPage;
  const currentFilteredDrivers = filteredTeam.slice(
    indicePritFilteredDriver,
    indiceUltFilteredDriver
  );

  const prevPage = () => {
    if (Page > 1) {
      setPage(Page - 1);
    }
  };

  const nextPage = () => {
    if (indiceUltDriver < filtered.length) {
      setPage(Page + 1);
    }
  };

  useEffect(() => {
    if (Page > Math.ceil(filtered.length / forPage)) {
      setPage(Math.ceil(filtered.length / forPage));
    }
  }, [filtered, Page, forPage]);

  // SEARCH

  function handleChange(e) {
    setSearchString(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  //ORDENAMIENTO
  const handleOrderChange = (e) => {
    setSelectedOrderName(e.target.value);
    dispatch({ type: "ORDER_NAME", acending: e.target.value === "asc" });
  };

  const handleOrderDobChange = (e) => {
    setSelectedOrderDob(e.target.value);
    dispatch(orderDob(e.target.value === "asc"));
  };

  const resetOrder = () => {
    setFiltered(allDrivers);
    setSelectedOrderName("asc");
    setSelectedOrderDob("asc");
    dispatch(getDrivers());
  };

  // filtar por team

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSelectTeam(e.target.value);
  };

  return (
    <div className={style.home}>
      <Navbar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isHome={true}
      />
      <div className={style.order}>
        <label>Buscar por equipos:</label>

        <select
          value={selectTeam}
          onChange={handleSearchChange}
          className={style.select}
        >
          <option value="">Todos los equipos</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.teams}>
              {team.teams}
            </option>
          ))}
        </select>

        <label>Ordenar por nombre:</label>
        <select
          value={selectedOrderName}
          onChange={handleOrderChange}
          className={style.select}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <label>Ordenar por Fecha de Nacimiento: </label>
        <select
          value={selectedOrderDob}
          onChange={handleOrderDobChange}
          className={style.select}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label></label>
        <button onClick={resetOrder} className={style.select}>
          Restablecer orden
        </button>
      </div>
      <Cards filtered={selectTeam ? currentFilteredDrivers : currentDrivers} />
      <div className={style.pages}>
        <button onClick={prevPage} disabled={Page === 1}>
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={indiceUltDriver >= allDrivers.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;
