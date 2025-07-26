import mongoose from 'mongoose';
import app from './app.js';

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));