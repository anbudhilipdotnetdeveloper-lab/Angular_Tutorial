
// export class curdDto{
//     TopicId:number;
//     TopicName:string;
//     TopicDefinition:string;
//     WhyItsNeed:string;
//     RealTimeUs:string;
//     CreatedOn:string;
//     RefId:number;

//     constructor (){
//         this.TopicId=0;
//         this.TopicName ="";
//         this.TopicDefinition ="";
//         this.WhyItsNeed ="";
//         this.RealTimeUs ="";
//         this.CreatedOn ="";
//         this.RefId =0;
//     }
// }
export interface curdtbl {
    TopicId:number;
    TopicName:string;
    TopicDefinition:string;
    WhyItsNeed:string;
    RealTimeUse:string;
    CreatedOn:string;
    RefId:number;
}
export interface Post {
    Id:string;
    Topic: string;
    Question: string;
    Answer:string;
}