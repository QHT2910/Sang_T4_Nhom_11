import express from 'express';
import cors from 'cors';
import productRoute from './routes/productRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api", productRoute);
app.listen(PORT, () => {
    console.log(`[SERVER] Server is running on http://localhost:${PORT}`);
});