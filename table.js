// Google dataTable format:
//      cols [{id: 'a', label, }],  //string, number date ok
//      rows [c:[{v: "value", f: "formatted value", p: "custom values"}]]
//          custom values could be 'border: 1px solid green;
// Google Table: https://developers.google.com/chart/interactive/docs/gallery/table#events
//      Events: select: whole row
//              page, sort and ready
//      Methods: getSelection(): -> array(selection elements)
//              might not return anything bec. selection action can toggle on or off
//      Properties(default): 
//          allowHtml(false): can cause format problems if false
//          page(disable): enable(they do it), event(you do it) or disable(not avail)
//              pagingButtons(auto), pageSize(10): rows per page
//          showRowNumber(false)
//          sort(enable): disable, event
//          sort(-1): initial sort column
//          firstRowNumber(1)
//          frozenColumns(null), 
//          height, width
//
//  dataTable.setCell(22, 2, 15, 'Fifteen', {style: 'font-style:bold; font-size:22px;'});

//========================== PARAMETERS =================================
const _path = "./sec_t.json"
//========================== DOC VARS =================================
let _data = [];
let _jsonIn = null;     // data 
// .. xhttp call for json data
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    console.log(this.readyState, this.status, " length: " , xhttp.responseText.length);
    if (this.readyState == 4 ) {    // staus is zero when src is local
    //if (this.readyState == 4 && this.status == 200) {
       _jsonIn = JSON.parse(xhttp.responseText);
       showData();
    }
};
//========================== LISTENERS =================================
document.querySelector("#btn-load").addEventListener('click', loadData);
document.querySelector("#btn-show").addEventListener('click', showData);
document.querySelector("#btn-filter").addEventListener('click', filterData);
//========================== LOAD CODE =================================


//========================== LOAD CODE =================================
function loadData(){
    // Send the GET request
    xhttp.open("GET", _path, true);
    xhttp.send();
}

function showData(){
    // load dt from _jsonIn and show whole table
    console.log('show table');
    dt = new google.visualization.DataTable(_jsonIn);
    // create table and link it
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(dt, {showRowNumber: true, width: '100%', height: '100%'});
    // Table Events: select: entire row, page: page nav button, sort: and ready:
    google.visualization.events.addListener(table, 'select', function() {

        var row = dt.getSelection()[5].row;
        alert('You selected ' + dt.getValue(row, 5));
    });
}

function filterData(){
    console.log('filtering table');
    dt = new google.visualization.DataTable(_jsonIn);

    // Create a view that shows everyone hired since 2007.
    /*
    var view = new google.visualization.DataView(dt);
    view.setRows(view.getFilteredRows([{column: 1, minValue: new Date(2007, 0, 1)}]));
    var table = new google.visualization.Table(document.getElementById('test_dataview'));
    table.draw(view, {sortColumn: 1});
    */
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(dt, {showRowNumber: true, width: '100%', height: '100%'});

    google.visualization.events.addListener(table, 'select', function() {
        var row = dt.getSelection()[5].row;
        alert('You selected ' + dt.getValue(row, 5));
    });
}
