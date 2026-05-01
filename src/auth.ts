
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ILoginResponse } from './lib/types/auth'
import { IApiResponse } from './lib/types/api';


export const authOptions: NextAuthOptions = {
    pages:
    {
        signIn: '/login'
        , error: '/login'
    },

    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {}
            },
            //it tell you if you login or not ,credentials=> this param its value come from the credentials that you specify before [username,password]
            authorize: async (credentials) => {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${baseUrl}/api/auth/login`, {
                    method: 'POST',
                    //can't send credentials because it have more than the fields you put in it 
                    body: JSON.stringify({ username: credentials?.username, password: credentials?.password }),
                    headers: {
                        'content-Type': 'application/json'
                    }
                })
                console.log("Login Response from Backend:", response);
                const data: IApiResponse<ILoginResponse> = await response.json();
                if (!data.status) {

                    throw new Error(data.message)
                }
                const loginData = data.payload!;
                return {
                    id: loginData.user.id,
                    token: loginData.token,
                    user: loginData.user
                }
            }
        })
    ],
    callbacks: {
        //user => what return from authorize
        //token => what you need to save in jwt 
        jwt: ({ token, user }) => {
            if(user){
                token.user = user.user;
                token.token = user.token;
            }
            return token
        },
        //tell you the data that you can use in client side
        //params here the same idea as jwt take from token put in session , token take data from the return of jwt
        session: ({ session, token }) => {
            session.user = token.user;
            return session
        },
    },

}
