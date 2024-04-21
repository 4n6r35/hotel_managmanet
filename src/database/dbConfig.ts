import { Sequelize } from "sequelize-typescript";
import { DatabaseEnv } from "../utils";
import { Dialect } from "sequelize";


export class Database {
    private readonly _databaseConfig: Sequelize;

    constructor() {
        const databaseEnv = DatabaseEnv.getInstance();

        this._databaseConfig = new Sequelize({
            dialect: databaseEnv.DB_DIALECT as unknown as Dialect,
            host: databaseEnv.DB_HOST,
            port: databaseEnv.DB_PORT,
            username: databaseEnv.DB_USER,
            password: databaseEnv.DB_PASS,
            database: databaseEnv.DB_DIALECT
        });

    }

    public async connect() {
        try {
            await this._databaseConfig.authenticate();
            console.log('Conexion exitosa con la base de datos.')
        } catch (error) {
            console.log('Ha ocurrido un error al conectarse a la base de datos.')
            console.log(error)
        }
    }
}
