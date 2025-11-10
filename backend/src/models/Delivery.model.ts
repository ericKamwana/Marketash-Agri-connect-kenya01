import mongoose, { Schema, Document, Types } from 'mongoose';
import { DeliveryStatus, ILocation } from '../types';

export interface IDelivery extends Document {
  orderId: Types.ObjectId;
  driverId: Types.ObjectId;
  driverName: string;
  driverPhone: string;
  pickupLocation: ILocation;
  deliveryLocation: ILocation;
  status: DeliveryStatus;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  podPhotoUrl?: string;
  recipientName?: string;
  recipientSignatureUrl?: string;
  routeCoordinates?: number[][];
  estimatedDistance?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeliverySchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    pickupLocation: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
      address: { type: String },
    },
    deliveryLocation: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
      address: { type: String },
    },
    status: {
      type: String,
      enum: ['assigned', 'picked_up', 'in_transit', 'delivered', 'failed'],
      default: 'assigned',
    },
    pickedUpAt: { type: Date },
    deliveredAt: { type: Date },
    podPhotoUrl: { type: String },
    recipientName: { type: String },
    recipientSignatureUrl: { type: String },
    // use a simple array-of-arrays schema definition; keep cast when needed at model creation
    routeCoordinates: { type: [[Number]], default: [] },
    estimatedDistance: { type: Number },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

DeliverySchema.index({ orderId: 1 });
DeliverySchema.index({ driverId: 1, status: 1 });

// cast schema to any to avoid strict generic mismatch between mongoose types and TS generics
export const Delivery = mongoose.model<IDelivery>('Delivery', DeliverySchema as any);
export type { IDelivery };