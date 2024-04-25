import { DataTypes, Model } from "sequelize";
import { BookingEntity } from "../entities";
import { Database } from "../database";



interface BookingModel extends Model<PartialAnyable<BookingEntity>>, BookingEntity { };

export const Booking = Database.getInstance().getDataSource.define<BookingModel>(
    "Room",
    {
        id_booking: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        id_room: DataTypes.BIGINT,
        client_name: DataTypes.STRING(255),
        client_number: DataTypes.BIGINT,
        date_entry: DataTypes.DATE,
        date_exit: DataTypes.DATE,
        reservation_date: DataTypes.DATE,

        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        tableName: 'booking',
        createdAt: true,
        updatedAt: true
    }
)