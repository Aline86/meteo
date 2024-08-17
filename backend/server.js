const app =  express();
const serverless = require('serverless-http');

const bodyParser = require('body-parser');

app.use(bodyParser);

app.get('/towns/:name', (req, res) => {
const newValue = getTowns(res.body);
res.json(newValue);
})
app.get('/town/:name', (req, res) => {
const newValue = getTown(res.body);
res.json(newValue);
})
app.get('/showmap/:latitude/:longitude', (req, res) => {
const newValue = getMap(res.body);
res.json(newValue);
})

module.exports.handler = serverless(app);