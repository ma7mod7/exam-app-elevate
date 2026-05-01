import {IUser} from './user'

export interface ILoginFields {
    username:string,
    password:string
}


export interface ILoginResponse {
    token:string,
    user:IUser
}
