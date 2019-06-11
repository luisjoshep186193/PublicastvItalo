export class ElementModel {

    id: string;
    name: string;
    description: string;
    duration: number;
    status: boolean;
    dateCreated: Date;



    constructor() {
         this.status = true;
         this.duration = 5;
         this.dateCreated = new Date();
    }
}