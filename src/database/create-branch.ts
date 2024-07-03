import prisma from "./prisma-main";


export const createBranch=async(branchName:any)=>{
    const result = await prisma.branch.findFirst({
        where: {
          name: branchName,
        },
        select: {
          name: true,
        },
      });
     
      if(!result){
    await prisma.branch.create({
        data:{
            name:branchName
        }
    })




}else{
   console.log("Already exists");
}

}
