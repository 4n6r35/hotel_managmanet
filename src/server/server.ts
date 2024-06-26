import express, { Application } from "express";
import { Database } from "../database";
import cors from "cors";
import { SystemEnvironment } from "../interfaces";
import { SystemEnv } from "../utils";
import { bookingRouter, roomRouter, userRouter } from "../routes";

export class Server {
    private readonly app: Application;
    private readonly _sysEnv: SystemEnvironment;
    private paths = {
        room: '/api/room/',
        booking: '/api/booking',
        user: '/api/user'
    }

    constructor() {
        this.app = express();
        this._sysEnv = SystemEnv.getInstance();
        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    middlewares() {
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static("public"))
    }

    async dbConnection() {
        //se crea la instancia de la clase Database
        const db = new Database();
        await db.connect();
    }

    routes() {
        this.app.use(this.paths.room, roomRouter)
        this.app.use(this.paths.booking, bookingRouter)
        this.app.use(this.paths.user, userRouter)
    }

    listen() {
        this.app.listen(this._sysEnv.REST_PORT, () => {
            console.log(`Servidor corriendo en el puerto ${this._sysEnv.REST_PORT}`)
        })
    }


}