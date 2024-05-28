export interface JWTpayloadBase<T> {
    user: T;
    check: boolean;
    date: string;
}

export interface SecurityBase {
    encryptSHA256: (str: string) => string;
        
    createTokenWithExpirence: <T>(options: {
        data: T;
        expiresIn: string | number;
        hashEncode?: string;
        keyPrivate?: string;
    }) => string;
    
    decodeJsonWebToken: <T>(
        tokenText: string,
        keyPublic?: string
    ) => JWTpayloadBase<T> | null;
}