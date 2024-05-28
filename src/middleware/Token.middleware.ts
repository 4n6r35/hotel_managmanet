import { NextFunction, Request, Response } from "express"
import { SecurityImpl } from "../security/token.security";
import { TokenData, User } from "../models";

interface CustomRequest extends Request {
    userDataToken?: TokenData;
}

export const TokenMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    const security = SecurityImpl.getInstance();

    const token = authorization?.replace(/(\s|bearer|Bearer)/g, "");

    if (token !== undefined) {
        const decodeToken = security.decodeJsonWebToken<TokenData>(token)
        if (decodeToken === null) {
            return res.status(400).json({
                status: false,
                message: "El token ha expirado"
            })
        }
    }

    if (token !== undefined) {
        const decodeToken = security.decodeJsonWebToken<TokenData>(token)

        const userDataToken = await User.findOne({
            where: {
                id_user: decodeToken?.user.id_user
            }
        })

        const addRequest: TokenData = {
            id_user: userDataToken?.id_user,
            user_name: `${userDataToken?.first_name} ${userDataToken?.first_surname}`,
            role: userDataToken?.role
        }

        req.userDataToken = addRequest
        return next();


    }

    return res.status(400).json({
        status: false,
        message: "No se ha encontrado token en la peticion"
    })

}