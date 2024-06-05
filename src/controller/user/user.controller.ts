import { Request, Response } from "express";
import { UserInputDTO } from "../../DTOs/user.dto";
import { Database } from "../../database";
import { TokenData, User } from "../../models";
import { SecurityImpl } from "../../security/token.security";

const security = SecurityImpl.getInstance();


export const RegisterUserController = async (req: Request, res: Response) => {
    const { password, id_type, id_number, ...data } = req.body as UserInputDTO

    const hashPassword = security.encryptSHA256(password);

    const db = Database.getInstance();
    const transaction = await db.getDataSource.transaction();

    try {
        await User.create({ password: hashPassword, identification_type: id_type, identification_number: id_number, ...data }, {
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
            status: false,
            message: "Ha surgido un error el procesar la solicitud de regitro",
            err: error
        })
    }
}

export const AuthController = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).json({
            successful: false,
            message: "Debes de enviar el username o email para inicio de sesión",
        });
    }

        const query: any = {};
        const hashPassword = security.encryptSHA256(password);

        if (email) {
            query.email = email;
        }

        if (username) {
            query.username = username;
        }

        if (hashPassword !== "") {
            query.password = hashPassword
        }


        const userAuth = await User.findOne({ where: query })


        if (userAuth !== null) {

            const { id_user, first_name, first_surname, role } = userAuth
            const token = security.createTokenWithExpirence<TokenData>({
                data: {
                    id_user: id_user,
                    user_name: `${first_name} ${first_surname}`,
                    role: role
                }, expiresIn: '1h'
            });
            
            return res.status(200).json({
                successful: true,
                token: token
            })
        }
        
        return res.status(404).json({
            message: `Ups, ha ocurrido un error, por favor verifique las credenciales.`,
        })
    }

