export const USER_ROLES = {
    ADMIN: 'ADMIN',
    OWNER: 'OWNER',
    USER: 'USER',
} as const;

export const DIPLOMA_KEYS={
    list:(page:number,limit:number=12)=>['diploma-list', page, limit] as const 
} as const