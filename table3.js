// Load the Visualization API and the controls package.
google.charts.load('current', {'packages':['bar','corechart', 'controls', 'table']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawDashboard);

// Callback that creates and populates a data table,
// instantiates a dashboard, a range slider and a pie chart,
// passes in the data and draws it.
function drawDashboard() {
    // Create our data table.
    _data = new google.visualization.DataTable(_jsonIn);
    //data = _jsonIn;

    // Create a dashboard.
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // Create a range slider, passing some options
    var scoreRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filter_score_div',
        'options': {
        'filterColumnLabel': 'Score'
        }
    });
    // Create a range slider, passing some options
    var exDateRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'DateRangeFilter',
        'containerId': 'filter_exdate_div',
        'options': {
        'filterColumnLabel': 'ExDate'
        }
    });
    // Create a range slider, passing some options
    /*
    var donutRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filter_div',
        'options': {
        'filterColumnLabel': 'Donuts eaten'
        }
    });
    */
    // 
    var linkedTable = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'table_div',
        'options': {
            //'width': 
            //'height': 400
        }
    });
    //dashboard.bind(scoreRangeSlider, linkedTable);
    dashboard.bind(exDateRangeSlider, linkedTable);
    // Draw the dashboard.
    dashboard.draw(_data);
}
function showData(){
    drawDashboard();
}

//================== LOAD DATA =============================
document.querySelector("#btn_load").addEventListener('click', loadData);
const _path = "./sec_t.json"
let _jsonIn = null;     // data 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    console.log(this.readyState, this.status, " length: " , xhttp.responseText.length);
    if (this.readyState == 4 ) {    // staus is zero when src is local
    //if (this.readyState == 4 && this.status == 200) {
       _jsonIn = JSON.parse(xhttp.responseText);
       showData();
    }
};
function loadData(){
    // Send the GET request
    xhttp.open("GET", _path, true);
    xhttp.send();
}

//================== TEST DATA =============================
function wait_here(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 };

document.querySelector("#btn_test").addEventListener('click', testData);
function testData(){
    //console.log(_jsonIn);

};
