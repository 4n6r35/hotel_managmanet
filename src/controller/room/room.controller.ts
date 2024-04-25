import { Request, Response } from "express";
import { Room } from "../../models";
import { RoomInputDataDTO } from "../../DTOs";
import { Database } from "../../database";

//OBTIENE TODOS LAS HABITACIONES PAGINADAS
export const ListRoomController = async (req: Request, res: Response) => {
    const { page, size } = req.query as any

    const { rows } = await Room.findAndCountAll({
        where: {
            state: true
        },
        limit: Number(size),
        offset: Number(page) - 1
    });

    const rooms = rows.map(x => x.dataValues)
    if (rooms.length > 0) {
        return res.status(200).json({
            message: "Se han obtenidos las habitaciones disponibles exitosamente.",
            data: rooms
        })
    }

    return res.status(404).json({
        message: "No se han encontrado habitaciones disponibles.",
        data: rooms
    })

}
//OBTIENE LAS HABITACIONES POR CODE = ID
export const GetRoomByCodeController = async (req: Request, res: Response) => {
    const { code } = req.query as any

    const room = await Room.findOne({
        where: {
            id_room: code,
            state: 1
        }
    });

    if (room !== null) {
        return res.status(200).json({
            message: "Habitacion obtenida exitosamente.",
            data: room
        })
    }

    return res.status(404).json({
        message: `No se han encontrado habitacion con el code ${code}.`,
    })
}

//CREATE NEW ROOM
export const CreateRoomController = async (req: Request, res: Response) => {

    const { ...data } = req.body as RoomInputDataDTO
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();
    try {
        const newRoom = await Room.create(data, {
            transaction
        });

        transaction.commit()
        return res.status(200).json({
            menssage: "Habitacion agregada exitosamente",
            data: newRoom
        })
    } catch (error) {
        transaction.rollback
        return res.status(500).json({
            message: "Ha ocurrido un error al momento de agregar la nueva habitacion",
            err: error
        })
    }
}

//ACTUALIZAR DATA DE UN ROOM
export const UpdateRoomController = async (req: Request, res: Response) => {

    const { id_room, ...data } = req.body
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();
    try {
        const updateRoom = await Room.update(data, {
            where: {
                id_room: id_room
            },
            transaction: transaction

        });

        transaction.commit()
        return res.status(200).json({
            menssage: "Habitacion actualizada exitosamente",
        })


    } catch (error) {
        transaction.rollback()
        return res.status(500).json({
            message: "Ha ocurrido un error al actualizar habitacion",
            err: error
        })
    }

}


//ElIMINAR UN ROOM
export const DeleteRoomController = async (req: Request, res: Response) => {

    const { id_room } = req.query
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();
    await Room.update({ state: false }, {
        where: {
            id_room: id_room
        },

        transaction: transaction

    });

    transaction.commit()
    return res.status(200).json({
        menssage: "Se ha eliminado la habitacion ",
    })
}