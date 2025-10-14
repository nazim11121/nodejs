
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const db = require('./db'); 

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
