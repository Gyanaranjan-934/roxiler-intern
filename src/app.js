import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Product } from "./models/product.js";
import axios from 'axios'
import transactionRouter from './routes/transactions.routes.js'

const app = express();


// used to set the security frontend url for incoming requests
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// set how much size of cookie can be requested to server
app.use(express.json({ limit: "16kb" }));
// to encode the urls and limit the query size after request
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"))
app.use(cookieParser());

app.get('/initialize-database', async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        // Extract products from the API response
        const products = response.data;

        // Insert products into the database
        await Product.insertMany(products);

        res.json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error('Error initializing database:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/api/v1', transactionRouter); // Corrected the URL path

export { app }