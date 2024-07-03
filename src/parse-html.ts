import cheerio from "cheerio";
export const parseHtml = (htmlContent: string) => {
    const $ = cheerio.load(htmlContent);
  
    //name
    const nameSelector = "body > table:nth-of-type(2) > tbody > tr:nth-child(3) > td:nth-child(2)";
    let name: string=parseSpecificField($,nameSelector);
    
    
    // rollno
    
    const rollnoSelector = "body > table:nth-of-type(2) > tbody > tr:nth-child(2) > td:nth-child(2)";
    let rollno: string=parseSpecificField($,rollnoSelector);
  
   
  
  
  //marks 
    const markselector = "body > table:nth-of-type(3) > tbody > tr:nth-child(3) > td:nth-child(2)"
    let marks: string=parseSpecificField($,markselector);
   

    //individual subject marks
    

    const tbody = $("body > table:nth-child(7) > tbody"); // Adjust index if necessary
    interface MarkDetail {
      slNo: string;
      subjectName: string;
      subjectId:string,
      
      maxMarks: string;
      marksObtained: string;
      internalMaxMarks?:string;
      internalObtainedMarks?:string;
      credits: string;
      gradePoint: string;
  }

  const marksDetails: MarkDetail[] = [];
// Extract data from the tbody
tbody.find('tr').each((index, ele) => {
    const cells = $(ele).children('td');
  //  console.log(cells.length);
   
    //length 6 means in tr there are 6 td element 
    //and index is greater than 5
    if (cells.length === 6 && index > 6) { // Adjust index as needed to skip headers
      
        let theoryMarks:string="";
        let internalMarks:string="";
        const marksObtained = $(cells[3]).html()?.toString();
        marksObtained?.split('<br>').map((ele,index)=>{
          
           (index==0?theoryMarks=ele.trim():internalMarks=ele.trim())
        })



        //extract subject name and subject id
        let subject_Name:string="";
        let subject_Id:string="";
        $(cells[1]).html()?.toString().split("<br>").map((ele,index)=>{
            (index==0?subject_Id=ele.trim():subject_Name=ele.trim());
        })



       let theoryMax:string="";
       let internalMax:string="";
       const maxMarks=$(cells[2]).html()?.toString();
       maxMarks?.split('<br>').map((ele,index)=>{
        (index==0?theoryMax=ele.trim():internalMax=ele.trim());
       })
      
      const detail = {
            slNo: $(cells[0]).text().trim(),
            
            subjectId: subject_Id,
            subjectName:subject_Name,
            maxMarks:theoryMax,
            marksObtained:theoryMarks,
            internalMaxMarks:internalMax,
            internalObtainedMarks:internalMarks,
            
            credits: $(cells[4]).text().trim(),
            gradePoint: $(cells[5]).text().trim()
            
        };
        marksDetails.push(detail);
    }
});

// Log the extracted marks details
marksDetails.pop();
// console.log('Marks Details:', marksDetails);

  

//fetch branch
const branchName = $('table tbody tr').filter((i, el) => {
  return $(el).text().includes('B.TECH.');
}).text().trim();



    if (marks == 'N/A')
      return null;
    // console.log(marksDetails);
    return {
      name, rollno,marks,
      branchName,marksDetails
    }
  
  
    //later rafactored this code by making a function
  }

  const parseSpecificField=(loadable:any,selector:any):string=>{
    const element = loadable(selector); 
    return element.text().trim() || 'N/A';
  }
    



