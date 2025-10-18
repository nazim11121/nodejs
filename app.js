
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const path = require('path'); 
const db = require('./db'); 

dotenv.config();

const app = express();
app.use(express.json());

// Serve images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', productRoutes);
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
