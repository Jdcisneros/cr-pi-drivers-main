const {getAllTeams} = require("../controllers/teamsControllers")



const getTeams = async (req, res) => {
    try {
      const teamExist = await getAllTeams(req, res);
      res.status(200).json(teamExist);
    } catch (error) {
      console.error('Error en getTeams:', error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getTeams
}