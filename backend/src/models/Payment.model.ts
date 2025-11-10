import mongoose, { Schema, Document } from 'mongoose';
import { PaymentStatus } from '../types';

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  phone: string;
  type: 'payment' | 'payout';
  provider: 'mpesa';
  status: PaymentStatus;
  providerRef?: string; // M-Pesa transaction ID
  idempotencyKey: string; // Unique key to prevent duplicate processing
  checkoutRequestId?: string; // M-Pesa STK Push ID
  resultCode?: string;
  resultDesc?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['payment', 'payout'],
      required: true,
    },
    provider: {
      type: String,
      enum: ['mpesa'],
      default: 'mpesa',
    },
    status: {
      type: String,
      enum: ['initiated', 'confirmed', 'failed', 'refunded'],
      default: 'initiated',
    },
    providerRef: String,
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
    },
    checkoutRequestId: String,
    resultCode: String,
    resultDesc: String,
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({ orderId: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ idempotencyKey: 1 });
PaymentSchema.index({ checkoutRequestId: 1 });

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);