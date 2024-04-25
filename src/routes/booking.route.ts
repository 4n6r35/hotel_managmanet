import { Router } from "express";
import { CreateBokingController, DeleteBookingController, GetBookingByCodeController, ListBookingsController, UpdateBookingController } from "../controller";


export const bookingRouter = Router();

bookingRouter.get('/list', ListBookingsController)

bookingRouter.get('/get-by-code', GetBookingByCodeController)

bookingRouter.post('/create', CreateBokingController)

bookingRouter.patch('/update', UpdateBookingController)

bookingRouter.delete('/delete', DeleteBookingController)