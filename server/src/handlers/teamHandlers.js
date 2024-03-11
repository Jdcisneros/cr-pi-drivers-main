const {getAllTeams} = require("../controllers/teamsControllers")



const getTeams = async (req, res) => {
  console.log('Controlador ejecutándose...');
    try {
      const teamExist = await getAllTeams();
      console.log(teamExist)
      res.status(200).json(teamExist);
    } catch (error) {
      console.error('Error en getTeams:', error);
      let errorMessage = 'Error al obtener equipos.';
      
      // Agregar información específica sobre el tipo de error si es posible
      if (error.message.includes('timeout')) {
        errorMessage = 'Tiempo de espera agotado al intentar obtener equipos de la API.';
      }
  
      res.status(500).json({ error: errorMessage });
    }
  };

module.exports = {
    getTeams
}