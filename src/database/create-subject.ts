import prisma from "./prisma-main";


export const createSubject=async(response:any)=>{
    try{
        
        response.map(async(ele:any,index:number)=>{
            console.log(ele.internalMaxMarks);
            const result = await prisma.subject.findFirst({
                where: {
                  subjectCode:ele.subject_Id
                }
              });
              if(!result){

             await prisma.subject.create({
                data:{
                    subjectCode:ele.subjectId,
                    subjectName:ele.subjectName,
                    maxMarks:parseInt(ele.maxMarks),
                    internalMax:parseInt(ele.internalMaxMarks),
                    credit:parseFloat(ele.credits)
    
                }});
                console.log("Subject created");
            }
        })
        

    }catch(err){
        console.log(err);
    }
}