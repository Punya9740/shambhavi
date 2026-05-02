export type UserRole = 'patient' | 'doctor';

export interface UserRecord {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  onboarded: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any;
}

export interface PatientProfile {
  bloodGroup: string;
  gender: string;
  age: number;
  address: string;
}

export interface DoctorProfile {
  degree: string;
  address: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}
