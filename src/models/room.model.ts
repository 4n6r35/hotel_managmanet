
import { CreationAttributes, DataTypes, Model } from "sequelize";
import { RoomEntity } from "../entities";
import { Database } from "../database";

interface RoomModel extends Model<PartialAnyable<RoomEntity>>, RoomEntity { };

export const Room = Database.getInstance().getDataSource.define<RoomModel>(
    "Room",
    {
        id_room: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        number: DataTypes.BIGINT,
        type: DataTypes.STRING(45),
        value: DataTypes.DECIMAL(10),
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },

        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        tableName: 'rooms',
        createdAt: true,
        updatedAt: true
    }
)