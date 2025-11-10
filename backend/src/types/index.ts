export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
}

export type UserRole = 'farmer' | 'buyer' | 'driver' | 'admin' | 'cooperative_manager';
export type UserStatus = 'active' | 'suspended' | 'pending';
export type KYCStatus = 'pending' | 'verified' | 'rejected';
export type ListingStatus = 'draft' | 'published' | 'sold' | 'expired' | 'removed';
export type OrderStatus = 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentStatus = 'initiated' | 'confirmed' | 'failed' | 'refunded';
export type DeliveryStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
export type BidStatus = 'placed' | 'accepted' | 'rejected' | 'expired';