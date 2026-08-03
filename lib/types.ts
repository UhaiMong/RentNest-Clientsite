export type LoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type Role = "TENANT" | "LANDLORD" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export type PropertyType =
  | "APARTMENT"
  | "HOUSE"
  | "STUDIO"
  | "SHOP"
  | "SUPER_SHOP"
  | "OFFICE"
  | "OTHER";

export type UsageType =
  | "RESIDENTIAL"
  | "NON_RESIDENTIAL"
  | "COMMERCIAL"
  | "OTHER";

export const PROPERTY_TYPES = [
  "APARTMENT",
  "HOUSE",
  "STUDIO",
  "SHOP",
  "SUPER_SHOP",
  "OFFICE",
  "OTHER",
] as const;
export const USAGE_TYPES = [
  "RESIDENTIAL",
  "NON_RESIDENTIAL",
  "COMMERCIAL",
  "OTHER",
] as const;

export interface Category {
  id: string;
  propertyType: PropertyType;
  usageType: UsageType;
  createdAt?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  bedrooms?: number;
  bathrooms?: number;
  category?: Category;
  categoryId?: string;
  landlord?: Pick<User, "id" | "name" | "email" | "phone">;
  landlordId?: string;
  createdAt: string;
  updatedAt?: string;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface Rental {
  id: string;
  property: Property;
  propertyId: string;
  tenant?: Pick<User, "id" | "name" | "email">;
  tenantId?: string;
  status: RentalStatus;
  moveInDate: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  rentalRequest: Rental;
  rentalId: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  property: Pick<Property, "id" | "title">;
  propertyId: string;
  user?: Pick<User, "id" | "name">;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminStats {
  total_user: number;
  total_active_user: number;
  total_property: number;
  total_rental: number;
  total_review: number;
  total_revenue: number;
  [key: string]: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
