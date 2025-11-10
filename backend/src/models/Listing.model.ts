import mongoose, { Schema, Document } from 'mongoose';
import { ILocation, ListingStatus } from '../types';

export interface IListing extends Document {
  sellerId: mongoose.Types.ObjectId;
  product: string;
  grade: string;
  quantity: number;
  unit: string; // kg, bags, crates, etc.
  unitPrice?: number; // Optional for bid-only listings
  description?: string;
  harvestDate: Date;
  location: ILocation;
  photos: string[]; // S3 URLs
  status: ListingStatus;
  viewCount: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      enum: ['Grade 1', 'Grade 2', 'Grade 3', 'Mixed'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'bags', 'crates', 'pieces'],
    },
    unitPrice: {
      type: Number,
      min: 0,
    },
    description: String,
    harvestDate: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: String,
    },
    photos: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'sold', 'expired', 'removed'],
      default: 'draft',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Compound indexes for search and filtering
ListingSchema.index({ location: '2dsphere' });
ListingSchema.index({ product: 1, status: 1 });
ListingSchema.index({ sellerId: 1, status: 1 });
ListingSchema.index({ status: 1, createdAt: -1 });

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);