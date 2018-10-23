var data;
var members;
var copiaMembers;

var statistics = {
    numDem: 0,
    numRep: 0,
    numInd: 0,
    compDem: 0,
    compRep: 0,
    memfVote: 0,
    memfnVote: 0,
    memlosemayorVote: 0,
    memlosemenosVote: 0,
}

llamarfunciones2();
function llamarfunciones2() {
    if ((document.getElementById("house2") != null)) {
        filtersMode()
    }
    if ((document.getElementById("senate2") != null)) {
        filtersMode2()
    }
}

function filtersMode() {
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
        copiaMembers = members.slice(0);
        primerFunction();
        primerFunctiondos();
        llamarfunciones();
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function filtersMode2() {
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
        copiaMembers = members.slice(0);
        primerFunction();
        primerFunctiondos();
        llamarfunciones();

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function primerFunction() {
    var demoP = 0;
    var repuP = 0;
    var indP = 0;
    var parTotal = [];
    for (var i = 0; i < members.length; i++) {
        var part = members[i].party
        if (members[i].party == "D") {
            demoP = demoP + 1;
        } else
        if (members[i].party == "R") {
            repuP = repuP + 1
        } else
        if (members[i].party == "I") {
            indP = indP + 1
        }
    }
    parTotal = demoP + repuP + indP;
    statistics.numDem = demoP;
    statistics.numRep = repuP;
    statistics.numInd = indP;
    var colParty = document.getElementById("numDem");
    var rowls = document.createElement("td");
    colParty.innerHTML = statistics.numDem;
    var colParty = document.getElementById("numRep");
    var rowls = document.createElement("td");
    colParty.innerHTML = statistics.numRep;
    var colParty = document.getElementById("numInd");
    var rowls = document.createElement("td");
    colParty.innerHTML = statistics.numInd;
}

function primerFunctiondos() {
    var demPorcen = [];
    var repPorcen = [];
    var indPorcen = [];
    var porcTotal = [];
    for (var i = 0; i < members.length; i++) {
        var vote = members[i].votes_with_party_pct
        if (members[i].votes_with_party_pct && members[i].party == "D") {
            demPorcen.push(members[i].votes_with_party_pct);
        }
        if (members[i].votes_with_party_pct && members[i].party == "R") {
            repPorcen.push(members[i].votes_with_party_pct);
        }
        if (members[i].votes_with_party_pct && members[i].party == "I") {
            indPorcen.push(members[i].votes_with_party_pct);
        }
    }
    var sumDem = demPorcen.reduce(function (a, b) {
        return a + b;
    }, 0);

    var sumRep = repPorcen.reduce(function (a, b) {
        return a + b;
    }, 0);
    var sumInd = indPorcen.reduce(function (a, b) {
        return a + b;
    }, 0);
    var porvDemo = sumDem / statistics.numDem;
    var d = porvDemo.toFixed(1);
    var porvRepu = sumRep / statistics.numRep;
    var e = porvRepu.toFixed(1);
    var portotal = porvRepu + porvDemo;
    var fin = portotal / 2;
    statistics.compDem = d;
    statistics.compRep = e;
    var colParty = document.getElementById("compDem");
    var rowls = document.createElement("td");
    colParty.innerHTML = statistics.compDem;
    var colParty = document.getElementById("compRep");
    var rowls = document.createElement("td");
    colParty.innerHTML = statistics.compRep;
}

function primerFunctionmasvote() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];
    var tab = document.getElementById("tabla4");
    var tblB = document.createElement("tbody");
    copiaMembers = members.slice(0);
    copiaMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
    var diezPor = copiaMembers.length * 10 / 100;
    var redPor = Math.round(diezPor);
    var top10 = copiaMembers.slice(0, redPor);
    var ultimo = top10[top10.length - 1];
    for (var i = 0; i < members.length; i++) {
        if ((ultimo.votes_with_party_pct == members[i].votes_with_party_pct) && (top10.includes(members[i]) == false)) {
            top10.push(members[i]);
        }
    }
    for (var j = 0; j < top10.length; j++) {
        var rowls = document.createElement("tr");
        var colParty1 = document.createElement("td");

        colParty1.innerHTML = top10[j].first_name + " " + top10[j].last_name;

        var colParty2 = document.createElement("td");
        colParty2.innerHTML = top10[j].party;

        var colParty3 = document.createElement("td");
        colParty3.innerHTML = top10[j].votes_with_party_pct;
        rowls.appendChild(colParty1);
        rowls.appendChild(colParty2);
        rowls.appendChild(colParty3);
        tblB.appendChild(rowls);
    }
    statistics.memfVote = top10;
    tab.appendChild(tblB);
}

function primerFunctionmenosvote() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];
    var tab = document.getElementById("tabla3");
    var tblB = document.createElement("tbody");
    var copiarInverse = members.slice(0);
    copiarInverse.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    })
    var diezPor2 = copiarInverse.length * 10 / 100;
    var redPor2 = Math.round(diezPor2);
    var top102 = copiarInverse.slice(0, redPor2);
    var ultimo2 = top102[top102.length - 1];
    for (var i = 0; i < members.length; i++) {
        if ((ultimo2.votes_with_party_pct == members[i].votes_with_party_pct) && (top102.includes(members[i]) == false)) {
            top102.push(members[i]);
        }
    }
    for (var j = 0; j < top102.length; j++) {
        var rowls = document.createElement("tr");
        var colParty1 = document.createElement("td");
        colParty1.innerHTML = top102[j].first_name + " " + top102[j].last_name;
        var colParty2 = document.createElement("td");
        colParty2.innerHTML = top102[j].party;
        var colParty3 = document.createElement("td");
        colParty3.innerHTML = top102[j].votes_with_party_pct;
        rowls.appendChild(colParty1);
        rowls.appendChild(colParty2);
        rowls.appendChild(colParty3);
        tblB.appendChild(rowls);
    }
    statistics.memfnVote = top102;
    tab.appendChild(tblB);
}

function primerFunctionlmiss() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];
    var tab = document.getElementById("tabla5");
    var tblB = document.createElement("tbody");
    var copiarInverse = members.slice(0);
    copiarInverse.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    })
    var diezPor2 = copiarInverse.length * 10 / 100;
    var redPor2 = Math.round(diezPor2);
    var top1022 = copiarInverse.slice(0, redPor2);
    var ultimo2 = top1022[top1022.length - 1];
    for (var i = 0; i < members.length; i++) {
        if ((ultimo2.missed_votes_pct == members[i].missed_votes_pct) && (top1022.includes(members[i]) == false)) {
            top1022.push(members[i]);
        }
    }
    console.log(top1022)
    for (var j = 0; j < top1022.length; j++) {
        var rowls = document.createElement("tr");
        var colParty1 = document.createElement("td");
        colParty1.innerHTML = top1022[j].first_name + " " + top1022[j].last_name;
        var colParty2 = document.createElement("td");
        colParty2.innerHTML = top1022[j].missed_votes;
        var colParty3 = document.createElement("td");
        colParty3.innerHTML = top1022[j].missed_votes_pct;
        rowls.appendChild(colParty1);
        rowls.appendChild(colParty2);
        rowls.appendChild(colParty3);
        tblB.appendChild(rowls);
    }
    tab.appendChild(tblB);
    statistics.memlosemenosVote = top1022;
}

function primerFunctionmmiss() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];
    var tab = document.getElementById("tabla6");
    var tblB = document.createElement("tbody");
    var copiaMembers = members.slice(0);
    copiaMembers.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });
    var diezPor = copiaMembers.length * 10 / 100;
    var redPor = Math.round(diezPor);
    var top102 = copiaMembers.slice(0, redPor);
    var ultimo = top102[top102.length - 1];
    for (var i = 0; i < members.length; i++) {
        if ((ultimo.missed_votes_pct == members[i].missed_votes_pct) && (top102.includes(members[i]) == false)) {
            top102.push(members[i]);
        }
    }
    console.log(top102)
    for (var j = 0; j < top102.length; j++) {
        var rowls = document.createElement("tr");
        var colParty1 = document.createElement("td");
        colParty1.innerHTML = top102[j].first_name + " " + top102[j].last_name;
        var colParty2 = document.createElement("td");
        colParty2.innerHTML = top102[j].missed_votes;
        var colParty3 = document.createElement("td");
        colParty3.innerHTML = top102[j].missed_votes_pct;
        rowls.appendChild(colParty1);
        rowls.appendChild(colParty2);
        rowls.appendChild(colParty3);
        tblB.appendChild(rowls);
    }
    tab.appendChild(tblB);
    statistics.memlosemayorVote = top102;
}

function llamarfunciones() {
    if ((document.getElementById("tabla5") != null) && (document.getElementById("tabla6") != null)) {
        primerFunctionmmiss()
        primerFunctionlmiss()
    }
    if ((document.getElementById("tabla3") !=  null) && ((document.getElementById("tabla4")) != null)) {
        primerFunctionmasvote()
        primerFunctionmenosvote()
    }
}