import prisma from "./prisma-main";


export const createSubject=async(response:any)=>{
    try{
        
        response.map(async(ele:any,index:number)=>{
            const result = await prisma.subject.findFirst({
                where: {
                  subjectCode:ele.subjectId
                }
              });
              console.log(ele.internalMaxMarks)
              if(!result){
                let internal_max:string;
                (ele.internalMaxMarks==''?internal_max="0":internal_max=ele.internalMaxMarks)

             const subject=await prisma.subject.create({
                data:{
                    subjectCode:ele.subjectId,
                    subjectName:ele.subjectName,
                    maxMarks:parseInt(ele.maxMarks),
                    internalMax:parseInt(internal_max),
                    credit:parseFloat(ele.credits)
    
                }});      



            
                console.log(subject);
                
            }
        })
        

    }catch(err){
        console.log(err);
    }
}