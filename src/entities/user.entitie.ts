export interface UserEntity {
    id_user: bigint,
    identification_type: string,
    identification_number: bigint
    first_name: string,
    second_name: string,
    first_surname: string,
    second_surname: string,
    username: string;
    email: string;
    password: string;
    role: string;
}