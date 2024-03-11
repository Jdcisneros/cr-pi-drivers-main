const { createDriverDB, getDriverById, getAllDrivers, getDriverByname} = require("../controllers/driverController");

const getDetailDriver = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api"

    try {

        const response = await getDriverById(id,source)
        res.status(200).json(response)
        return
        
    } catch (error) {

        res.status(400).json({error:error.message})
        return
    }
}




const getDrivers = async (req, res) => {

    const { name} = req.query;
try {
    if(name) {
        
        const DriverByName = await getDriverByname(name)
        res.status(200).json(DriverByName)
    } else {
        const AllDrivers = await getAllDrivers()
        res.status(200).json(AllDrivers)
    }
 
} catch (error) {
    res.status(400).json({error:error.message})
    
}


}

const createDriver = async (req, res) => {
    const {forename, surname, description, image, nationality, teams, dob} = req.body

    try {
        
        const response = await createDriverDB(forename, surname, description, image, nationality, teams, dob)
        res.status(200).json(response)

    } catch (error) {
        console.error("Error creando conductor:", error);
        res.status(400).json({ error: "No se pudo crear el conductor" });
    }

}

module.exports = {
    getDetailDriver,
    createDriver,
    getDrivers
}