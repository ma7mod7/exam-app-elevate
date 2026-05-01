import { IDocumentFields } from "./api";



export interface IExam extends IDocumentFields{
    id:string;
    title:string;
    description:string;
    image:string | null;
    duration:number;
    questionsCount:number;
    diplomaId:string;
    diploma:{
        id:string;
        title:string;
    }
    immutable:boolean;

}