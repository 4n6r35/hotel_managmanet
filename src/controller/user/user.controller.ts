import { Request, Response } from "express";
import { UserInputDTO } from "../../DTOs/user.dto";
import { Database } from "../../database";
import { User } from "../../models";



export const RegistreUser = async(req:Request, res:Response) =>{
    const {...data} = req.body as UserInputDTO
    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();

    try {
        await User.create(data,{
            transaction
        });

        transaction.commit()
        return res.status(200).json({
            status: true,
            message: "Registro exitoso"
        })
    } catch (error) {
        transaction.rollback
        return res.status(500).json({
            status:false,
            message: "Ha surgido un error el procesar la solicitud de regitro",
            err: error
        })
    }
}