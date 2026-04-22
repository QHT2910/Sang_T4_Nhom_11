  import express from 'express';
  import cors from 'cors';
  import productRoute from './routes/productRoutes.js';
  import authRoutes from './routes/authRoutes.js';
  import userRoutes from './routes/userRoutes.js';

  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());

  app.use(cors({
    origin: ['https://sang-t4-nhom-11.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use("/api", productRoute);
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.listen(PORT, () => {
      console.log(`[SERVER] Server is running on http://localhost:${PORT}`);
  });
