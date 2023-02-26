export class Cuenta{
    constructor(
        public _id:string,
        public numero:Number,
        public nombre:string,
        public tipo:string,
        public saldo:Number,
        public cliente:string,
        public estado:string,
        public limiteDiario:number
    ){}
}