export class Cuenta{
    constructor(
        public _id:string,
        public numero:number,
        public nombre:string,
        public tipo:string,
        public saldo:number,
        public cliente:string,
        public estado:string,
        public limiteDiario:number
    ){}
}