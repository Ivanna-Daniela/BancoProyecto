export class Cuenta{
    constructor(
        public _id:string,
        public nombre:string,
        public numero:string,
        public tipo:string,
        public estado:Number,
        public contrasenia:String,
        public cliente:string
    ){}
}