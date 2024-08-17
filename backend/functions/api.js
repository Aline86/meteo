const express = require('express')
const api = express()
const router = Router();
const cors = require('cors')
const serverless = require("serverless-http");

const { getTowns, getTown} = require("../controller/town")
const { getMap } = require("../controller/weather")

router.get('/towns/:name', getTowns)
router.get('/town/:name', getTown)
router.get('/showmap/:latitude/:longitude', getMap)
api.use(cors())
api.use("/api/", router);

export const handler = serverless(api);