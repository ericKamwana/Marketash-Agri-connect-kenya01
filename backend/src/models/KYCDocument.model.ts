import mongoose, { Schema, Document } from 'mongoose';
import { KYCStatus } from '../types';

export interface IKYCDocument extends Document {
  userId: mongoose.Types.ObjectId;
  documentType: 'national_id' | 'business_permit';
  documentUrl: string; // S3 URL (encrypted)
  status: KYCStatus;
  rejectionReason?: string;
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const KYCDocumentSchema = new Schema<IKYCDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentType: {
      type: String,
      enum: ['national_id', 'business_permit'],
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    rejectionReason: String,
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: Date,
  },
  {
    timestamps: true,
  }
);

KYCDocumentSchema.index({ userId: 1 });

export const KYCDocument = mongoose.model<IKYCDocument>('KYCDocument', KYCDocumentSchema);