import { DataTypes, Model } from "sequelize";
import { UserEntity } from "../entities";
import { Database } from "../database";



interface UserModel extends Model<PartialAnyable<UserEntity>>, UserEntity { };

export const User = Database.getInstance().getDataSource.define<UserModel>(
    "Room",
    {
        id_user: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        identification_type: DataTypes.STRING(255),
        identification_number: DataTypes.BIGINT,
        first_name: DataTypes.STRING(255),
        second_name: DataTypes.STRING(255),
        first_surname: DataTypes.STRING(255),
        second_surname: DataTypes.STRING(255),
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        
    },
    {
        tableName: 'users',
        createdAt: true,
        updatedAt: true
    }
)