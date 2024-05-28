import { Request, Response } from "express";
import { Database } from "../../database";
import { Booking } from "../../models";
import { BookingInputDataDTO } from "../../DTOs";
import { CustomRequest } from "../../interfaces/customRequest";

//OBTIENE TODOS LAS RESERVAS PAGINADAS
export const ListBookingsController = async (req: Request, res: Response) => {
    const { page, size } = req.query as any
    
    const { rows } = await Booking.findAndCountAll({
        where: {
            state: 1
        },
        limit: Number(size),
        offset: Number(page) - 1
    });

    const bookings = rows.map(x => x.dataValues)
    if (bookings.length > 0) {
        return res.status(200).json({
            message: "Se han obtenidos las reservas exitosamente.",
            data: bookings
        })
    }

    return res.status(404).json({
        message: "No se han encontrado reservas.",
        data: bookings
    })

}
//OBTIENE LAS RESERVAS POR CODE = ID
export const GetUserBookingController = async (req: Request, res: Response) => {
    const { code } = req.query as any
    const customReq = req as CustomRequest;
    const user = customReq.userDataToken;

    const booking = await Booking.findAndCountAll({
        where: {
            id_user: user?.id_user,
            state: 1
        }
    });

    if (booking !== null) {
        return res.status(200).json({
            message: "La reserva ha sido encontrada.",
            data: booking
        })
    }

    return res.status(404).json({
        message: `No se han encontrado reserva con el code ${code}.`,
    })
}

//CREATE RESERVA
export const CreateBokingController = async (req: Request, res: Response) => {

    const { id_user, ...data } = req.body as BookingInputDataDTO
    const customReq = req as CustomRequest;
    const user = customReq.userDataToken;
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();

    if (data.id_room === null || data.id_room === undefined) {
        return res.status(404).json({
            message: "El id_room es oblilgatorio para registrar la reserva"
        })
    }

    try {
        const newBooking = await Booking.create({id_user: user?.id_user ,...data}, {
            transaction
        });

        transaction.commit()
        return res.status(200).json({
            menssage: "Reserva cargada exitosamente",
            data: newBooking
        })
    } catch (error) {
        transaction.rollback
        return res.status(500).json({
            message: "Ha ocurrido un error al momento de cargar la reserva",
            err: error
        })
    }
}

//ACTUALIZAR DATA DE RESERVA
export const UpdateBookingController = async (req: Request, res: Response) => {

    const { id_booking, ...data } = req.body
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();
    try {
        await Booking.update(data, {
            where: {
                id_booking: id_booking
            },
            transaction: transaction

        });

        transaction.commit()
        return res.status(200).json({
            menssage: "Reserva actualizada exitosamente",
        })


    } catch (error) {
        transaction.rollback()
        return res.status(500).json({
            message: "Ha ocurrido un error al actualizar la reserva",
            err: error
        })
    }

}

//ELIMINAR UN RESERVA
export const DeleteBookingController = async (req: Request, res: Response) => {

    const { id_booking } = req.query
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();
    await Booking.update({ state: false }, {
        where: {
            id_booking: id_booking
        },
        transaction: transaction

    });

    transaction.commit()
    return res.status(200).json({
        menssage: "La reserva ha sido eliminada ",
    })
}