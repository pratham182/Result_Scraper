import prisma from "./prisma-main";


export const createMarks=async(response:any)=>{
    try{
        const { rollno, marksDetails } = response;
        const rollnoBigInt = BigInt(rollno)

        const student = await prisma.student.findUnique({
            where: { rollno: BigInt(rollno) },
        });
        if (!student) {
            throw new Error(`Student with rollno ${rollno} not found`);
        }


        marksDetails.map(async(ele:any,index:number)=>{
            const { subjectId, marksObtained, internalObtainedMarks, gradePoint } = ele;
            const subject = await prisma.subject.findUnique({
                where: { subjectCode: subjectId },
            });

            
             //subject not found
            if (!subject) {
                throw new Error(`Subject with code ${subjectId} not found`);
            }
             let internalObtained:string="";
             (internalObtainedMarks==''?internalObtained='0':internalObtained=internalObtainedMarks);
            


             const existingMark = await prisma.mark.findUnique({
                where: {
                    studentId_subjectId: {
                        studentId: rollnoBigInt,
                        subjectId: subjectId,
                    },
                },
            });

            if (existingMark) {
                console.log(`Mark record for studentId ${rollnoBigInt} and subjectId ${subjectId} already exists`);
                await prisma.mark.update({
                    where: {
                        studentId_subjectId: {
                            studentId: rollnoBigInt,
                            subjectId: subjectId,
                        },
                    },
                    data: {
                        marksObtained: marksObtained,
                    internalObtained: internalObtained,
                    gradePoint: parseFloat(gradePoint),
                        
                    },
                });
            }else{
            
             await prisma.mark.create({
                data: {
                    marksObtained: marksObtained,
                    internalObtained: internalObtained,
                    gradePoint: parseFloat(gradePoint),
                    student: {
                        connect: { rollno: rollnoBigInt }, 
                    },
                    subject: {
                        connect: { subjectCode: subjectId }, 
                    },
                },
            });}

        })
        console.log("Marks created successfully");


    }catch(err){
        console.log(err);
    }

}