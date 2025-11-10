import mongoose, { Schema, Document } from 'mongoose';
import { ILocation } from '../types';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  location: ILocation;
  farmName?: string; // For farmers
  businessName?: string; // For buyers
  cooperativeId?: mongoose.Types.ObjectId; // For farmers in cooperatives
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: String,
    },
    farmName: String,
    businessName: String,
    cooperativeId: {
      type: Schema.Types.ObjectId,
      ref: 'Cooperative',
    },
    avatarUrl: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

// Geospatial index for location-based queries
ProfileSchema.index({ location: '2dsphere' });
ProfileSchema.index({ userId: 1 });

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);