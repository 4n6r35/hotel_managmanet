export interface RoomEntity {
    id_room: bigint,
    number: bigint,
    type: string,
    value: number,
    is_available: boolean,
    state:boolean
    createdAt: Date;
    updateAt: Date;
}