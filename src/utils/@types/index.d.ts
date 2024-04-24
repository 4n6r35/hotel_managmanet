export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REST_PORT: string,
            DB_DIALECT: string,
            DB_NAME: string,
            DB_USER: string,
            DB_PASS: string,
            DB_HOST: string,
            DB_PORT: number,
        }
    }

    // Propiedad Personalizada del Partial<T> para permitir el alamcenamiento de valores nullos en las propiedades del objeto
    type PartialNullable<T> = {
        [P in keyof T]?: T[P] | null;
    };

    type PartialAnyable<T> = {
        [P in keyof T]?: unknown;
    };
}

