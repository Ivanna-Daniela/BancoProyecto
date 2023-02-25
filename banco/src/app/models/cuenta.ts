export class Cuenta{
    constructor(
        public _id:string,
        public numero:string,
        public tipo:string,
        public estado:Number,
        public cliente:String,
        public limiteDiario:number
    ){}
}