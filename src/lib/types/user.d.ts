import { USER_ROLES } from '../constants/api.constant'
import { IDocumentFields } from './api';

export type TRole = (typeof USER_ROLES)[keyof (typeof USER_ROLES)]

export interface IUser extends IDocumentFields{
user:{

    id: string,
    username: string,
    email: string,
    phone: string | null,
    firstName: string,
    lastName: string
    profilePhoto: string | null,
    emailVerified: boolean,
    phoneVerified: boolean,
    role: TRole,
}
}
