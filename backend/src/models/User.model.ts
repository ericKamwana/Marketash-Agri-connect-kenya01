import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, UserStatus, KYCStatus } from '../types';

export interface IUser extends Document {
  phone: string; // Safaricom number
  email: string;
  nationalId: string; // Kenyan National ID
  fullNames: string;
  role: UserRole;
  status: UserStatus;
  kycStatus: KYCStatus;
  passwordHash?: string; // Optional for future password login
  refreshTokens: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^254[0-9]{9}$/, // Kenyan format: 254XXXXXXXXX
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullNames: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['farmer', 'buyer', 'driver', 'admin', 'cooperative_manager'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'pending'],
      default: 'pending',
    },
    kycStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    passwordHash: {
      type: String,
      select: false, // Don't include by default in queries
    },
    refreshTokens: [
      {
        type: String,
      },
    ],
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
UserSchema.index({ phone: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ nationalId: 1 });
UserSchema.index({ role: 1, status: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);