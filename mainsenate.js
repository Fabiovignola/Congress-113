var members = data.results[0].members;
//console.log(members);

tablas();

function tablas() {
    var namefull;
    var tab = document.getElementById("tabla1");
    var tblB = document.createElement("tbody");


    for (var i = 0; i < members.length; i++) {
        var url = members[i].url;
        var sta = members[i].state;


        if (members[i].middle_name == null) {

            namefull = members[i].first_name + " " + members[i].last_name;

        } else

        if (members[i].middle_name != null) {

            namefull = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }

        var rowls = document.createElement("tr");

        var colName = document.createElement("td");
        //        colName.innerHTML = namefull;
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.textContent = namefull;
        //        console.log(link)
        colName.appendChild(link);

        var colParty = document.createElement("td");
        colParty.innerHTML = members[i].party;

        var colState = document.createElement("td");
        colState.innerHTML = members[i].state;

        var colYears = document.createElement("td");
        colYears.innerHTML = members[i].total_present;

        var colPor = document.createElement("td");
        colPor.innerHTML = members[i].votes_with_party_pct;

        rowls.appendChild(colName);
        rowls.appendChild(colParty);
        rowls.appendChild(colState);
        rowls.appendChild(colYears);
        rowls.appendChild(colPor);
        tblB.appendChild(rowls);
    }
    tab.appendChild(tblB);
}
////////////////////////////////////////////////////////////////////////////////////
var filteredMembers = [];
var tab = document.getElementById("tabla1");
var tblB = document.createElement("tbody");
var namefull;

function showDemocrats() {
    filteredMembers = [];
    var checkboxD = document.getElementById("Democrat");
    var checkboxR = document.getElementById("Republican");
    var checkboxI = document.getElementById("Independent");
    var members = data.results[0].members;

    for (var j = 0; j < members.length; j++) {
        if (((members[j].party == checkboxD.value) && checkboxD.checked) && members[j].state == document.getElementById("menu").value) {
            filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxR.value) && checkboxR.checked) && members[j].state == document.getElementById("menu").value) {
            filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxI.value) && checkboxI.checked) && members[j].state == document.getElementById("menu").value) {
            filteredMembers.push(members[j]);
        }
        if(((members[j].party == checkboxD.value) && checkboxD.checked) && document.getElementById("menu").value == "ALL") {
        filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxR.value) && checkboxR.checked) && document.getElementById("menu").value == "ALL") {
            filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxI.value) && checkboxI.checked) && document.getElementById("menu").value == "ALL") {
            filteredMembers.push(members[j]);
        }
        console.log(filteredMembers);
    }
    var tab = document.getElementById("tabla1"); // Get the table
    tab.removeChild(tab.getElementsByTagName("tbody")[0]); // Remove first instance of body
    var tblB = document.createElement("tbody");

    for (var i = 0; i < filteredMembers.length; i++) {
        var url = filteredMembers[i].url;


        if (filteredMembers.middle_name == null) {

            namefull = filteredMembers[i].first_name + " " + filteredMembers[i].last_name;

        } else

        if (filteredMembers.middle_name != null) {

            namefull = filteredMembers[i].first_name + " " + filteredMembers[i].middle_name + " " + filteredMembers[i].last_name;
        }
        var rowls = document.createElement("tr");

        var colName = document.createElement("td");
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.textContent = namefull;
        colName.appendChild(link);

        var colParty = document.createElement("td");
        colParty.innerHTML = filteredMembers[i].party;

        var colState = document.createElement("td");
        colState.innerHTML = filteredMembers[i].state;

        var colYears = document.createElement("td");
        colYears.innerHTML = filteredMembers[i].total_present;

        var colPor = document.createElement("td");
        colPor.innerHTML = filteredMembers[i].votes_with_party_pct;

        rowls.appendChild(colName);
        rowls.appendChild(colParty);
        rowls.appendChild(colState);
        rowls.appendChild(colYears);
        rowls.appendChild(colPor);
        tblB.appendChild(rowls);

    }
    tab.appendChild(tblB);
}
////////////////////////////////////////////////////////////////////////////////
var statesp = [];
createSelect();

function createSelect() {
    statesp = [];
    for (var i = 0; i < members.length; i++) {
        var sta = members[i].state;
        statesp.push(sta);
        console.log(sta);
    }
    console.log(statesp);
}
var uniqs = statesp.filter(function (item, index, array) {
    return array.indexOf(item) === index;
})
console.log(uniqs);
//////////////////////////////////////////////////////////////////////////////
final();

function final() {
    var Select = document.getElementById("menu");
    for (var i = 0; i < uniqs.length; i++) {

        var createOption = document.createElement("option");
        createOption.innerHTML = uniqs[i];
        menu.appendChild(createOption);
    }
    Select.appendChild(createOption);
}
////////////////////////////////////////////////////////////////////////////////////









/////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
//    document.createElement("tbody").appendChild(filteredMembers);
//    tblB.removeChild(tblB.members[i])    
////////////////////////////////////////////////////////////////////////
//        if (($usuario == "pepe") && ($password == "hola")) {
//
//            }
///////////////////////////////////////////////////////////////////////////
//statefilter = statesp.filter(createSelect(item, pos) {
//    return statesp.indexOf(item) == pos;
//})
//////////////////////////////////////////////////////////////////////////////////
//contarSeleccionados();
//function contarSeleccionados()
//{
//  var cant=0;
//  if (document.getElementById('Democrat').checked)
//  {
//    cant++;
//  }
//  if (document.getElementById('Republican').checked)
//  {
//    cant++;
//  }
//  if (document.getElementById('Independent').checked)
//  {
//    cant++;
// }
//  alert('Conoce ' + cant + ' lenguajes');
//}
//////////////////////////////////////////////////////////////////////////////
//document.getElementById("Democrat").addEventListener("click", showDemocrats(filter1));
////alert(document.getElementById("Democrat").filter1)
//document.getElementById("Republican").addEventListener("click", showDemocrats(filter2));
//document.getElementById("Independent").addEventListener("click", showDemocrats(filter3));
//var filter1 = "D"
//var filter2 = "R"
//var filter3 = "I"
//showDemocrats(filter1);
//showDemocrats(filter2);
//showDemocrats(filter3);
////////////////////////////////////////////////////////////////////////////////
//function myFunction() {
//    var checkBox = document.getElementById("myCheck");
//    var text = document.getElementById("text");
//    if (checkBox.checked == true) {
//        text.style.display = "block";
//    } else {
//        text.style.display = "none";
//    }
//}
////////////////////////////////////////////////////////////////////////////////////
//tabla.filter(function (showDemocrats));
//            document.getElementById(tabla1).innerHTML = showDemocrats;
//            scope.SELECT.push.(items)
// (a.innerHTML.toUpperCase().indexOf(filter)>-1)
//function showRepublican() {
//    alert(document.getElementById("Republican").value)
//}
//
//function showIndependent() {
//    alert(document.getElementById("Independent").value)
//}
//////////////////////////////////////////////////////////////////////////////////////////
//var c = () => Array.from(document.getElementsByTagName("INPUT")).filter(cur => cur.type === 'checkbox' && cur.checked).length > 0;
//
//
//
//// Acciones a realizar
//
//
//check.addEventListener("click", () => {
// if(!c()) { // Si NO hay ningun checkbox chequeado.
//   console.log("Ningún chequeado..");
// } else {
//   console.log("Al menos uno chequeado..");
// }
//});
