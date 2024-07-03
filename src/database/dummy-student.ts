import prisma from "./prisma-main";

export const dummyStudent=async()=>{
    try{   
        const result = await prisma.branch.findFirst({
            where: {
              name: "B.TECH. (COMPUTER SCIENCE & ENGINEERING)",
            },include:{
                students:true,
                

            }
          });
          console.log(result);

    }catch(err){
        console.log(err);
    }
}