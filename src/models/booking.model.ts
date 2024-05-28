import { DataTypes, Model } from "sequelize";
import { BookingEntity } from "../entities";
import { Database } from "../database";



interface BookingModel extends Model<PartialAnyable<BookingEntity>>, BookingEntity { };

export const Booking = Database.getInstance().getDataSource.define<BookingModel>(
    "Booking",
    {
        id_booking: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        id_room: DataTypes.BIGINT,
        id_user: DataTypes.BIGINT,
        entry_date: DataTypes.DATE,
        exit_date: DataTypes.DATE,

        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    },
    {
        tableName: 'bookings',
        createdAt: true,
        updatedAt: true
    }
)