export class Cuenta{
    constructor(
        public _id:string,
        public numero:Number,
        public nombre:string,
        public tipo:string,
        public estado:Number,
        public cliente:string,
        public limiteDiario:number
    ){}
}