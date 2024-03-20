const axios = require("axios");
const { Teams } = require("../db");

const getAllTeams = async (req, res) => {
  try {
    const dbTeams = await Teams.findAll();
    if (dbTeams.length === 0) {
      const driversApiRes = await axios.get(`http://localhost:5000/drivers`);
      const driversApi = driversApiRes.data;
      const teamsApi = driversApi.flatMap((driver) => {
        if (driver.teams && typeof driver.teams === "string") {
          return driver.teams.split(",").map((team) => team.trim());
        } else {
          return [];
        }
      });

      const teamsFromDb = await Promise.all(
        teamsApi.map(async (teamName) => {
          await Teams.findOrCreate({ where: { teams: teamName } });
        })
      );

      const updatedDbTeams = await Teams.findAll();
      return updatedDbTeams;
    }

    return dbTeams;
  } catch (error) {
    console.error("Error en getTeams:", error.message);
    return res;
  }
};

module.exports = {
  getAllTeams,
};
