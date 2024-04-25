import { Router } from "express";
import { CreateRoomController, DeleteRoomController, GetRoomByCodeController, ListRoomController, UpdateRoomController } from "../controller";

export const roomRouter = Router();

roomRouter.get('/list', ListRoomController)

roomRouter.get('/get-by-code', GetRoomByCodeController)

roomRouter.post('/create', CreateRoomController)

roomRouter.patch('/update', UpdateRoomController)

roomRouter.delete('/delete', DeleteRoomController)