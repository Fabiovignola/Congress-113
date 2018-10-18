var members = data.results[0].members;
//console.log(members);
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

primerFunction();

function primerFunction() {
    var tab = document.getElementById("tabla1");
    var tblB = document.createElement("tbody");
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
    var rowls = document.createElement("tr");
    var colName = document.createElement("td");
        
    var colParty = document.createElement("td");
    colParty.innerHTML = demoP;

    var colState = document.createElement("td");
    colState.innerHTML = repuP;

    var colYears = document.createElement("td");
    colYears.innerHTML = indP;

    rowls.appendChild(colName);
    rowls.appendChild(colParty);
    rowls.appendChild(colState);

    tblB.appendChild(rowls);
    }

    parTotal = demoP + repuP + indP;
    statistics.numDem = demoP;
    statistics.numRep = repuP;
    statistics.numInd = indP;
    //        console.log(demoP);
    //    console.log(repuP);
    //        console.log(indP);
    //    console.log(parTotal);
    tab.appendChild(tblB);
}

primerFunctiondos();

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
    //    console.log(sumDem);
    var sumRep = repPorcen.reduce(function (a, b) {
        return a + b;
    }, 0);
    //        console.log(sumRep);
    var sumInd = indPorcen.reduce(function (a, b) {
        return a + b;
    }, 0);
    //    console.log(sumInd);
    var porvDemo = sumDem / statistics.numDem;
    var d = porvDemo.toFixed(1);
    //    console.log(d);
    var porvRepu = sumRep / statistics.numRep;
    var e = porvRepu.toFixed(1);
    //    console.log(e);

    var portotal = porvRepu + porvDemo;
    var fin = portotal / 2;
    //    console.log(fin);
    statistics.compDem = d;
    statistics.compRep = e;
}

primerFunctiontres();

function primerFunctiontres() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];

    var copiaMembers = members.slice(0);
    copiaMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });


    var copiarInverse = members.slice(0);
    copiarInverse.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    })

    var diezPor = copiaMembers.length * 10 / 100;
    var diezPor2 = copiarInverse.length * 10 / 100;
    //    console.log(diezPor);

    var redPor = Math.round(diezPor);
    var redPor2 = Math.round(diezPor2);
    //    console.log(redPor);

    var top10 = copiaMembers.slice(0, redPor);
    var top102 = copiarInverse.slice(0, redPor2);
    //    console.log(top10);
    //    console.log(top102);


    var ultimo = top10[top10.length - 1];
    var ultimo2 = top102[top102.length - 1];
    //    console.log(ultimo);

    for (var i = 0; i < members.length; i++) {
        if ((ultimo.votes_with_party_pct == members[i].votes_with_party_pct) && (ultimo.first_name !== members[i].first_name)) {
            top10.push(members[i]);
        }
    }
    for (var i = 0; i < members.length; i++) {
        if ((ultimo2.votes_with_party_pct == members[i].votes_with_party_pct) && (ultimo2.first_name !== members[i].first_name)) {
            top102.push(members[i]);
        }
    }
    //    console.log(top10);
    //    console.log(top102);
    statistics.memfVote = top10;
    statistics.memfnVote = top102;
    //    console.log(copiaMembers);
    //    console.log(copiarInverse);
}

primerFunctioncuatro();

function primerFunctioncuatro() {
    var todosVote = [];
    var tenporMas = [];
    var tenporMenos = [];

    var copiaMembers = members.slice(0);
    copiaMembers.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });


    var copiarInverse = members.slice(0);
    copiarInverse.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    })

    var diezPor = copiaMembers.length * 10 / 100;
    var diezPor2 = copiarInverse.length * 10 / 100;
    //    console.log(diezPor);

    var redPor = Math.round(diezPor);
    var redPor2 = Math.round(diezPor2);
    //    console.log(redPor);

    var top102 = copiaMembers.slice(0, redPor);
    var top1022 = copiarInverse.slice(0, redPor2);
    console.log(top102);
    console.log(top1022);


    var ultimo = top102[top102.length - 1];
    var ultimo2 = top1022[top1022.length - 1];
    //    console.log(ultimo);

    for (var i = 0; i < members.length; i++) {
        if ((ultimo.missed_votes_pct == members[i].missed_votes_pct) && (ultimo.first_name !== members[i].first_name)) {
            top102.push(members[i]);
        }
    }
    for (var i = 0; i < members.length; i++) {
        if ((ultimo2.missed_votes_pct == members[i].missed_votes_pct) && (ultimo2.first_name !== members[i].first_name)) {
            top1022.push(members[i]);
        }
    }
    console.log(top102);
    console.log(top1022);
    statistics.memlosemayorVote = top102;
    statistics.memlosemenosVote = top1022;
    //    console.log(copiaMembers);
    //    console.log(copiarInverse);
}




//var statistics = {
//    numDem: demoP,
//    numRep: repuP,
//    numInd: indP,
//    compDem: 0,
//    compRep: 0,
//    memfVote: 0,
//    memfnVote: 0,
//    memlosemayorVote: 0,
//    memlosemenosVote: 0,
//}
