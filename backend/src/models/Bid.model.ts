import mongoose, { Schema, Document } from 'mongoose';
import { BidStatus } from '../types';

export interface IBid extends Document {
  listingId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  message?: string;
  status: BidStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BidSchema = new Schema<IBid>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    message: String,
    status: {
      type: String,
      enum: ['placed', 'accepted', 'rejected', 'expired'],
      default: 'placed',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BidSchema.index({ listingId: 1, status: 1 });
BidSchema.index({ buyerId: 1, status: 1 });
BidSchema.index({ expiresAt: 1 });

export const Bid = mongoose.model<IBid>('Bid', BidSchema);