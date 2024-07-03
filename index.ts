import { createBranch } from './src/database/create-branch';
import { createStudent } from './src/database/create-student';
import { createSubject } from './src/database/create-subject';
import { fetch_result } from './src/fetch-result';

import dotenv from 'dotenv'; 

dotenv.config();
interface Result{
   name:string,
   rollno:string,
   marks:string
}



export const main = async () => {
  let overall_result: Result[] = [];

  
  let iterate_rollno: number = 210010130001;
  let response;

  let year:any=new Date().getFullYear();
   year=year.toString();
  
  while (iterate_rollno<=210010139020) {  
     response = await fetch_result(iterate_rollno.toString(), "DEC2023", "5", "MAIN");
    if (response) {
    //  console.log(response);
      // overall_result.push(response);
      createBranch(response.branchName);
      createStudent(response);
      createSubject(response.marksDetails);
    }iterate_rollno++;
    
    
    if (iterate_rollno ==210010130200) {
      iterate_rollno = 210010139001
     

    }
    
    

    



  }

 
  }

main();







//send batch request
//30 request


// createBranch();
// createStudent();