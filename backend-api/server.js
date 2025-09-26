import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import providerRoutes from './routes/provider.routes.js';
import serviceRoutes from './routes/service.routes.js';
import availabilityRoutes from './routes/availability.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(cors()); 
app.use(express.json());

app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/availability', availabilityRoutes);

app.get('/', (req, res) => {
  res.send('The marketplace API is running.');
});

app.listen(PORT, () => {
  console.log(`Server running at the port: ${PORT}`);
});