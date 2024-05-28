import { Router } from "express";
import { CreateRoomController, DeleteRoomController, GetRoomByCodeController, ListRoomController, UpdateRoomController } from "../controller";
import { TokenMiddleware } from "../middleware";

export const roomRouter = Router();

roomRouter.get('/list', ListRoomController)

roomRouter.get('/get-by-code', GetRoomByCodeController)

roomRouter.post('/create', TokenMiddleware, CreateRoomController)

roomRouter.post('/update', TokenMiddleware ,UpdateRoomController)

roomRouter.delete('/delete', TokenMiddleware,DeleteRoomController)