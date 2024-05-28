export interface BookingEntity{
id_booking: bigint,
id_room:bigint,
id_user: number,
entry_date:Date,
exit_date: Date,
state: boolean,
createdAt: Date,
updateAt: Date
}