export interface BookingInputDataDTO {
    id_room: bigint,
    client_name: string
    client_number: number,
    date_entry: Date,
    date_exit: Date,
    reservation_date: Date,
}