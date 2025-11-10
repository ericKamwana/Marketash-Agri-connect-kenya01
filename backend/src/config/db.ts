import mongoose from 'mongoose';

const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri, {
      // recommended options handled by current mongoose versions
      // useUnifiedTopology/useNewUrlParser not required in v6+
    } as mongoose.ConnectOptions);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

export default connectDB;