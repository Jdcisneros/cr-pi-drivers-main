const { Router } = require("express");
const { getDrivers, getDetailDriver, createDriver, } = require("../handlers/driverHandlers");
const { getTeams } = require("../handlers/teamHandlers");
const router = Router();

router.get("/drivers", getDrivers);

router.get("/drivers/:id", getDetailDriver);

router.post("/drivers", createDriver);

router.get("/teams", getTeams)

module.exports = router;