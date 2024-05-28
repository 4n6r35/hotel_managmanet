import { Router } from "express";
import { CreateBokingController, DeleteBookingController, GetUserBookingController, ListBookingsController, UpdateBookingController } from "../controller";
import { TokenMiddleware } from "../middleware";


export const bookingRouter = Router();

bookingRouter.get('/list', TokenMiddleware, ListBookingsController)

bookingRouter.get('/get', TokenMiddleware, GetUserBookingController)

bookingRouter.post('/create', TokenMiddleware, CreateBokingController)

bookingRouter.post('/update', TokenMiddleware, UpdateBookingController)

bookingRouter.delete('/delete', TokenMiddleware, DeleteBookingController)