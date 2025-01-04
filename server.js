const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport'); // Add Passport configuration

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', shortUrlRoutes);
app.use('/api', analyticsRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
