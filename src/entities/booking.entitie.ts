export interface BookingEntity{
id_booking: bigint,
id_room:bigint,
client_name: string
client_number: number,
date_entry:Date,
date_exit:Date,
reservation_date: Date,
state: boolean,
createdAt: Date,
updateAt: Date
}