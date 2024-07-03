import prisma from "./prisma-main";

export const createStudent=async(Student:any)=>{
    
    try{

        const result = await prisma.student.findFirst({
            where: {
              rollno: Student.rollno,
            }
          });
          if(!result){
    await prisma.student.create({
        data:{
            name:Student.name,
            rollno:parseInt(Student.rollno),
            branch:{
                connect:{
                    name:Student.branchName
                }
            }
        }
    })
}else{
   

    // console.log("Already exists");
}

}
    catch(err){
        console.log(err);
    }
}


