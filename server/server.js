  import express from 'express';
  import cors from 'cors';
  import productRoute from './routes/productRoutes.js';
  import authRoutes from './routes/authRoutes.js';
  import userRoutes from './routes/userRoutes.js';
  import orderRoutes from './routes/orderRoutes.js';
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
 

  app.use(cors({
    origin: ['https://sang-t4-nhom-11.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,  
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use("/api", productRoute);
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", orderRoutes);
  app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});
  app.listen(PORT, () => {
      console.log(`[SERVER] Server is running on http://localhost:${PORT}`);
  });
