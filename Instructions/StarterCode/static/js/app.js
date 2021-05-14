// from data.js
var tableData = data;

// Select the button
var filterButton = d3.select("#filter-btn");
// Select the table
var tableContent = d3.select("tbody");
// Create event handlers
filterButton.on("click",runFilter);

tableData.forEach((datapoint) => 
{
    var row = tableContent.append("tr");
    Object.entries(datapoint).forEach(([key, value]) => 
    {
      var cell = row.append("td");
      cell.text(value);
    });
});

function runFilter() 
{
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select table data
    var filteredTableContent = tableData;
    // Select input values
    var dateInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value").toLowerCase().trim();
    var stateInput = d3.select("#state").property("value").toLowerCase().trim();
    var countryInput = d3.select("#country").property("value").toLowerCase().trim();
    var shapeInput = d3.select("#shape").property("value").toLowerCase().trim();
    // Create dictionary to hold input values
    var inputDictionary = {
        datetime:dateInput,
        city:cityInput,
        state:stateInput,
        country:countryInput,
        shape:shapeInput
    };
    // Make sure each input value is valid
    Object.entries(inputDictionary).forEach(([key, value]) => 
    {
        if(value==="")
        {
          delete dictUser[key];
        }   
    });
    // Filter data
    filteredTableContent = filteredTableContent.filter(row => 
    {
        return Object.entries(inputDictionary).every(item => 
        {
          const key = item[0];
          const value = item[1];
          return row[key] === value;
        });
    });
}
