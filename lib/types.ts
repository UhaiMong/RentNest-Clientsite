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

export interface Category {
  id: string;
  propertyType: string;
  usageType: string;
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

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface Payment {
  id: string;
  rental: Rental;
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
  totalUsers: number;
  totalProperties: number;
  totalRentals: number;
  totalRevenue: number;
  [key: string]: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
