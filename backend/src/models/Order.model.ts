import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus, PaymentStatus } from '../types';

export interface IOrder extends Document {
  listingId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  sellerName: string; // For traceability
  sellerPhone: string; // For traceability
  buyerId: mongoose.Types.ObjectId;
  buyerName: string; // For traceability
  buyerPhone: string; // For traceability
  bidId?: mongoose.Types.ObjectId;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalAmount: number;
  platformFee: number; // 8% + KES 50
  taxAmount: number; // VAT on platform fee
  logisticsFee: number;
  netToSeller: number; // Amount seller receives
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  escrowHeld: boolean;
  escrowReleased: boolean;
  settlementStatus: 'pending' | 'processing' | 'completed' | 'failed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerPhone: {
      type: String,
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerPhone: {
      type: String,
      required: true,
    },
    bidId: {
      type: Schema.Types.ObjectId,
      ref: 'Bid',
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    platformFee: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    logisticsFee: {
      type: Number,
      default: 0,
    },
    netToSeller: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['initiated', 'confirmed', 'failed', 'refunded'],
      default: 'initiated',
    },
    escrowHeld: {
      type: Boolean,
      default: false,
    },
    escrowReleased: {
      type: Boolean,
      default: false,
    },
    settlementStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
OrderSchema.index({ buyerId: 1, createdAt: -1 });
OrderSchema.index({ sellerId: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);