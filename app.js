var express = require('express');
const app = express();

//Routes
const patientRoute = require("./Routes/Patients");
app.use("/patients", patientRoute)

const nurseRoute = require("./Routes/Nurses");
app.use("/nurses", nurseRoute)

const commandsRoute = require("./Routes/Commands");
app.use("/commands", commandsRoute)

const alertsRoute = require("./Routes/Alerts");
app.use("/alerts", alertsRoute)


app.listen(3000);