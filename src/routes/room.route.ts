import { Router } from "express";
import { ListRoomController } from "../controller";


export const roomRouter = Router();

roomRouter.get('/list', ListRoomController)