import { IDocumentFields } from "./api";


interface IAnswer{
    id:string,
    text:string,
    isCorrect:boolean
}
export interface IQuestion extends IDocumentFields{
    id: string;
    text: string;
    examId: string;
    immutable: boolean;
    answers: IAnswer[];
    exam:{
        id:string;
        title:string;
    }

}
export interface IQuestions{
    questions:IQuestion[]
}


interface ISubmitExamAnswer{
    questionId:string;
    answerId:string;
}
export interface ISubmitExamData{
    examId:string;
    answers:ISubmitExamAnswer[],
    startedAt:string;
}

interface IAnalyzedAnswer{
    questionId:string;
    questionText:string;
    isCorrect:boolean;
    selectedAnswer:IAnswer;
    correctAnswer:IAnswer;
}


export interface IExamSubmission{
    submission:{
        id:string;
        userId:string;
        examId:string;
        examTitle:string;
        exam:{
        id:string;
        title:string;
        duration:number;
        };
        score:number;
        totalQuestions:number,
        correctAnswers:number;
        wrongAnswers:number;
        startedAt:string;
        submittedAt:string;
        createdAt:string;
        updatedAt:string;
    }
    analytics:IAnalyzedAnswer[];
}

export interface IExamSubmissionsResponse{
    message:string;
    submission:{
    id:string;
    userId:string;
    examId:string;
    examTitle:string;
    exam:{
    id:string;
    title:string;
    duration:number;
    };
    score:number;
    totalQuestions:number,
    correctAnswers:number;
    wrongAnswers:number;
    startedAt:string;
    submittedAt:string;
    createdAt:string;
    updatedAt:string;
    analytics:IAnalyzedAnswer[];
    }
}
    