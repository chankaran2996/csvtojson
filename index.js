     
      // Method to upload a valid csv file
      function upload() {
        var files = document.getElementById('file_upload').files;
        if(files.length==0){
          alert("Please choose any file...");
          return;
        }
        var filename = files[0].name;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension == '.CSV') {
            //Here calling another method to read CSV file into json
            csvFileToJSON(files[0]);
        }else{
            alert("Please select a valid csv file.");
        }
      }
       
      //Method to read csv file and convert it into JSON 
      function csvFileToJSON(file){
          try {
            let reader = new FileReader();
            console.log(typeof(FileReader));
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
                console.log(e);
                let jsonData = [];
                let headers = [];
                let rows = e.target.result.split("\r\n");    
                console.log(rows);           
                for (let i = 0; i < rows.length; i++) {
                    let cells = rows[i].split(",");
                    console.log(cells);
                    let rowData = {};
                    for(let j=0;j<cells.length;j++){
                        if(i==0){
                            let headerName = cells[j].trim();
                            headers.push(headerName);
                        }else{
                            // let key = headers[j];
                            if(headers[j]){
                                rowData[headers[j]] = cells[j].trim();
                            }
                        }
                    }
                    //skip the first row (header) data
                    if(i!=0){
                        jsonData.push(rowData);
                    }
                }
                  
                //displaying the json result in string format
                document.getElementById("display_data_in_readable_format").value=JSON.stringify(jsonData,null,4);
                }
            }catch(e){
                console.error(e);
            }
      }
       