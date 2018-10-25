var data;
var members;
var uniqs;

llamarfunciones();
function llamarfunciones() {
    var tab = document.getElementById("house")
    var tab2 = document.getElementById("senate")
    if ((document.getElementById("house") && (document.getElementById("house")) != null)) {
        filtersMode()
    }
    if ((document.getElementById("senate")) && ((document.getElementById("senate")) != null)) {
        filtersMode2()
    }
}
function filtersMode(){
fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: "GET",
    headers: {
        'X-API-Key': 'oH9nQCYFm8g9WZmRmlBFWEwzhvHvkwDGDkpChf9h'
    }
}).then(function (response) {
    if (response.ok) {
        console.log(2);

        return response.json();
    }

}).then(function (json) {
    data = json;
    members = data.results[0].members;

    tablas();
    showDemocrats();
    createSelect();
    final();
}).catch(function (error) {
    console.log("Request failed:" + error.message);
});
}
function filtersMode2(){
fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: {
        'X-API-Key': 'oH9nQCYFm8g9WZmRmlBFWEwzhvHvkwDGDkpChf9h'
    }
}).then(function (response) {
    if (response.ok) {
        console.log(2);

        return response.json();
    }

}).then(function (json) {
    data = json;
    members = data.results[0].members;
    tablas();
    showDemocrats();
    createSelect();
    final();
}).catch(function (error) {
    console.log("Request failed:" + error.message);
});
}
function tablas() {
    var namefull;
    var tblB = document.createElement("tbody");
    var tab = document.getElementById("tabla1");
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
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.textContent = namefull;
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
function showDemocrats() {
    var filteredMembers = [];
    var namefull;
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
        if (((members[j].party == checkboxD.value) && checkboxD.checked) && document.getElementById("menu").value == "ALL") {
            filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxR.value) && checkboxR.checked) && document.getElementById("menu").value == "ALL") {
            filteredMembers.push(members[j]);
        }
        if (((members[j].party == checkboxI.value) && checkboxI.checked) && document.getElementById("menu").value == "ALL") {
            filteredMembers.push(members[j]);
        }
        //        console.log(filteredMembers);
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
function createSelect() {
    var statesp = [];
    statesp = [];
    for (var i = 0; i < members.length; i++) {
        var sta = members[i].state;
        statesp.push(sta);
        //        console.log(sta);
    }
    //        console.log(statesp);
    uniqs = statesp.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
}
function final() {
    var Select = document.getElementById("menu");
    for (var i = 0; i < uniqs.length; i++) {

        var createOption = document.createElement("option");
        createOption.innerHTML = uniqs[i];
        menu.appendChild(createOption);
    }
    Select.appendChild(createOption);
}