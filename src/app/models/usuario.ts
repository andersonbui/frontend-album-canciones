export class Usuario {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public email: string,
        public clave: string,
        public rol: string,
        public imagen: string
    ) {}
}
