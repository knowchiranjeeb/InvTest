// Required Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const btypeRoutes = require('./src/BusinessType');
const compRoutes = require('./src/Company');
const contRoutes = require('./src/Country');
const datformatRoutes = require('./src/DateFormat');
const fiscalRoutes = require('./src/FiscalYear');
const indtypeRoutes = require('./src/IndustryType');
const langRoutes = require('./src/Language');
const stateRoutes = require('./src/State');
const userRoutes = require('./src/Users');
const cors = require('cors');
const app = express();
const port = 7000;


app.use(cors());

// Middleware
app.use(bodyParser.json());


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Test API",
        version: "1.0.0",
        description: "Test API",
        contact: {
          name: "Chiranjeeb",
        },
        servers: ["https:*localhost:5000"],
      },
    },    
    apis: ["./src/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// API endpoints
app.use('/', btypeRoutes);
app.use('/', indtypeRoutes);
app.use('/', fiscalRoutes);
app.use('/', contRoutes);
app.use('/', langRoutes);
app.use('/', datformatRoutes);
app.use('/', stateRoutes);
app.use('/', compRoutes);
app.use('/', userRoutes);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
