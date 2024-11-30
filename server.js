import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requestes per `window` (15 minutes)
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
});

app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
