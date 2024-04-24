import { Request, Response } from "express";
import { Room } from "../../models";



export const ListRoomController = async (req: Request, res: Response) => {

    // const { page, size } = req.query

    const {rows} = await Room.findAndCountAll();
    const rooms = rows.map(x => x.dataValues)
    if (rooms.length < 0) {
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