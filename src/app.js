const express = require('express');
const bodyParser = require('body-parser');
const matterRoutes = require('./routes/matterRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use('/matters', matterRoutes);

sequelize.sync().then(() => console.log('Database synced.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
