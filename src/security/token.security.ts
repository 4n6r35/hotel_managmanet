import { SecurityEnvironment } from "../interfaces";
import { JWTpayloadBase, SecurityBase } from "../models";
import { SecurityEnv } from "../utils";
import jwt, { Algorithm } from "jsonwebtoken";
import CryptoJS from 'crypto-js';


export class SecurityImpl implements SecurityBase {
    private static _instance: SecurityImpl;
    private _securityEnv: SecurityEnvironment;

    private constructor() {
        this._securityEnv = SecurityEnv.getInstance();
    }

    public static getInstance(): SecurityImpl {
        if (!SecurityImpl._instance) {
            SecurityImpl._instance = new SecurityImpl();
        }

        return SecurityImpl._instance;
    }

    public encryptSHA256(str: string): string {
        return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
    }


    public createTokenWithExpirence<T>(options: {
        data: T;
        expiresIn: string | number;
        hashEncode?: string;
        keyPrivate?: string;
    }): string {
        const { hashEncode = "HS512", keyPrivate = this._securityEnv.SECRET_KEY_TOKEN } = options;
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const timestap = today.toISOString();
        const payLoad = {
            user: options.data as T,
            check: true,
            date: timestap
        };
        return jwt.sign(payLoad, keyPrivate, {
            algorithm: hashEncode as Algorithm,
            expiresIn: options.expiresIn
        });
    }


    public decodeJsonWebToken<T>(
        token: string,
        keyPublic: string = this._securityEnv.SECRET_KEY_TOKEN 
    ): JWTpayloadBase<T> | null {
        try {
            const response = jwt.verify(token, keyPublic) as JWTpayloadBase<T>;
            return response;
        } catch (error) {
            return null;
        }
    }
}