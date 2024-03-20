const { Driver } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const mapApi = (array) => {
  return array.map((driver) => {
    return {
      id: driver.id,
      name: {
        forename: driver.name.forename,
        surname: driver.name.surname,
      },
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      teams: driver.teams,
      dob: driver.dob,
      created: false,
    };
  });
};

const createDriverDB = async (
  forename,
  surname,
  description,
  image,
  nationality,
  teams,
  dob
) => {
  try {
    const [createdDriver, created] = await Driver.findOrCreate({
      where: { forename, surname, description, image, nationality, dob, teams, source:"db" },
    });

    return createdDriver;
  } catch (error) {
    console.error("Error creando conductor en la base de datos:", error);
    throw new Error(
      `No se pudo crear el conductor en la base de datos: ${error.message}`
    );
  }
};

const getDriverById = async (id, source) => {
  const driver =
    source === "api"
      ? (await axios.get(`http://localhost:5000/drivers/${id}`)).data
      : await Driver.findByPk(id);
  console.log(driver);
  return driver;
};

const getAllDrivers = async () => {
  try {
    const driverDB = await Driver.findAll();

    const driversApi = mapApi(
      (await axios.get(`http://localhost:5000/drivers`)).data
    );

    const resultadoalldrivers = [...driverDB, ...driversApi];
    return resultadoalldrivers;
  } catch (error) {
    console.error("Error al obtener datos de la base de datos:", error);
  }
};

const getDriverByname = async (name) => {
  const driversApi = mapApi(
    (await axios.get(`http://localhost:5000/drivers/`)).data
  );

  const driverFilterApi = driversApi.filter(
    (driver) => driver.name.forename.toLowerCase() === name.toLowerCase()
  );

  const driverFindDB = await Driver.findAll({
    where: { forename: { [Op.iLike]: `%${name}%` } },
  });

  const DriverResult = [...driverFilterApi, ...driverFindDB];

  return DriverResult.slice(0, 15);
};

module.exports = {
  createDriverDB,
  getDriverById,
  getAllDrivers,
  getDriverByname,
};
