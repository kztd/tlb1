function showData2(){
    dt = new google.visualization.DataTable();
    cols = _jsonIn.columns
    for (x in cols){
        console.log(x, cols[x]);
        switch (cols[x]) {
            case "IPODtX":
                dt.addColumn("date", cols[x], x.toString())
                break;
            case "LiqPrc":
            case "Coupon":
            case "Score":
            case "ExDate":
            case "IPODt":
                dt.addColumn("number", cols[x], x.toString())
                break;
            default:
                dt.addColumn("string", cols[x], x.toString())
                break;

        }
    }
    rows = _jsonIn.data;
    for(r in rows){
        //console.display(rows[r]);
        dt.addRow(rows[r]);
    }




    console.log('building table');
    //var data = new google.visualization.DataTable(_jsonIn.columns);
    //data.loadData(_jsonIn.data);

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(dt, {showRowNumber: true, width: '100%', height: '100%'});

    google.visualization.events.addListener(table, 'select', function() {
        var row = table.getSelection()[0].row;
        alert('You selected ' + data.getValue(row, 0));
    });
    
}

// draw table
function buildTable(jsonIn) {
    console.log('building table');
    var data = new google.visualization.DataTable(jsonIn);
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    google.visualization.events.addListener(table, 'select', function() {
        var row = table.getSelection()[0].row;
        alert('You selected ' + data.getValue(row, 0));
    });
}


// Callback that creates and populates a data table, 
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

// Create the data table.
var data = new google.visualization.DataTable();
data.addColumn('string', 'Topping');
data.addColumn('number', 'Slices');
data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1], 
    ['Zucchini', 1],
    ['Pepperoni', 2]
]);

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
}
// draw table
function drawTable() {
    console.log('drawing table');
    data = buildTable1()
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    google.visualization.events.addListener(table, 'select', function() {
        var row = table.getSelection()[0].row;
        alert('You selected ' + data.getValue(row, 0));
});
}


function buildTable3(){
    
    fetch(_url)
        .then(blob => blob.json())
        .then(data => _data = data)
    console.log(data)
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        console.log('here')
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function buildTable2(){
    readTextFile("sec.json", function(text){
        var data = JSON.parse(text);
        return data;
    });
}



/*
usage:  readTextFile("sec.json", function(text){
    var data = JSON.parse(text);
    return data;
    //console.log(data);
});
*/

function buildTable1(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time');
    data.addRows(5);
    data.setCell(0, 0, 'John');
    data.setCell(0, 1, 10000, '$10,000');
    data.setCell(0, 2, true);
    data.setCell(1, 0, 'Mary');
    data.setCell(1, 1, 25000, '$25,000');
    data.setCell(1, 2, true);
    data.setCell(2, 0, 'Steve');
    data.setCell(2, 1, 8000, '$8,000');
    data.setCell(2, 2, false);
    data.setCell(3, 0, 'Ellen');
    data.setCell(3, 1, 20000, '$20,000');
    data.setCell(3, 2, true);
    data.setCell(4, 0, 'Mike');
    data.setCell(4, 1, 12000, '$12,000');
    data.setCell(4, 2, false);
    return data;
}

        
