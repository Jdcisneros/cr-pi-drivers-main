const axios = require('axios')
const {Teams} = require("../db")

const apiURL = 'http://localhost:3001/drivers/'


const getAllTeams = async (req, res) => {
  try {
    const DbVacio = (await Teams.count()) === 0;
    

    if (isDbEmpty) {
      const DbVacio = (await axios.get("http://localhost:3001/drivers")).data;
      const teamsApi = drivers.map((driver) => driver.teams).join(',').split(',');


      const uniqueTeamNames = [...new Set(teamsApi)];
     


      const teamsToSave = uniqueTeamNames.map((teamName) => ({ teams: teamName }));
      await Teams.bulkCreate(teamsToSave);
    
    }

    const teamsFromDb = await Teams.findAll();

    return res.json(teamsFromDb);
  } catch (error) {
    console.error('Error en getTeams:', error.message);
    return res.status(500).json({ error: 'Error al obtener equipos' });
  }
};

module.exports = {
    getAllTeams,
};