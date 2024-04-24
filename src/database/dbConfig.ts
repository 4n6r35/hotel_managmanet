import { DatabaseEnv } from "../utils";
import { Dialect, Sequelize } from "sequelize";


export class Database {
    private static instance: Database;
    private readonly dataSource: Sequelize;

    constructor() {
        const databaseEnv = DatabaseEnv.getInstance();
        this.dataSource = new Sequelize({
            dialect: databaseEnv.DB_DIALECT as unknown as Dialect,
            host: databaseEnv.DB_HOST,
            port: databaseEnv.DB_PORT,
            username: databaseEnv.DB_USER,
            password: databaseEnv.DB_PASS,
            database: databaseEnv.DB_NAME
        });

    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance
    }

    public get getDataSource() {
		return this.dataSource;
	}

    public async connect() {
        try {
            await this.dataSource.authenticate();
            console.log('Conexion exitosa con la base de datos.')
        } catch (error) {
            console.log('Ha ocurrido un error al conectarse a la base de datos.')
            console.log(error)
        }
    }
}
