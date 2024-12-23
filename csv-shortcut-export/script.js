function processCSV() {

  // Get the CSV file
  var csvFile = document.getElementById("csv").files[0];

  //date cons, UTV preferred
  var csvAge = csvFile.lastModifiedDate;
  var reader = new FileReader();
  var summary;
  var rowCounter = 0;

  reader.onload = function(event) {
    var csvData = event.target.result;

    // Parse CSV data (https://www.papaparse.com/docs)
    var data = Papa.parse(csvData, {header: true, skipEmptyLines: true}).data;

    // Filter columns
    var outputData = data.map(function(row) {
      return {
        id: row.id,        
        name: row.name,
        //external_ticket_count: row.external_ticket_count,
        team: row.team,
        test: 'test' // Add extra column
      };
    });
    
    // Generate output table
    var outputTable = "<thead><tr><th>&nbsp;</th><th>Customers notified / Support hero(s) who checked</th><th>ID</th><th>Name</th><th>Team</th><th>Notes / Questions</th></tr></thead><tbody>";

    outputData.forEach(function(row) {
      rowCounter++;
      outputTable += "<tr><td>" + rowCounter + "</td><td>&nbsp;</td><td><a href='https://app.agorapulse.com/backoffice/stories/" + row.id + "'>" + row.id + "</a></td><td>" + row.name + "</td><td>" + row.team + "</td><td>&nbsp;</td></tr>";
    });

    outputTable += "</tbody>";

    // Create a summary also for copying over
    summary = (outputData.length) + " bugs output. Export file was created " + csvAge; 
    document.getElementById("summary").innerHTML = summary;

    // Display output table
    document.getElementById("output").innerHTML = outputTable;

    
  };

  reader.readAsText(csvFile);

  // Hacky way to hide, to make copying the output out easier
  document.getElementById("uploader").style.display = "none";
}
