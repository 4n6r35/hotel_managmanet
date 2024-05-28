import { SecurityEnvironment } from "../../interfaces";
import "dotenv/config"
import {env} from 'process'


export class SecurityEnv implements SecurityEnvironment{
    private static _instance: SecurityEnv;

    public SECRET_KEY_TOKEN = env.SECRET_KEY_TOKEN;

    private constructor() {}

    public static getInstance(): SecurityEnv{
        if (!SecurityEnv._instance) {
            SecurityEnv._instance = new SecurityEnv();
        }

        return SecurityEnv._instance;
    }
}