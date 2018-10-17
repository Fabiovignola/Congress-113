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
    var demoP = 0;
    var parTotal = [];
    var repuP = 0;
    var indP = 0;
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
    //    console.log(demoP);
    //    console.log(repuP);
    //        console.log(indP);
    //    console.log(parTotal);
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
    for (var i = 0; i < members.length; i++) {
        var vote = members[i].votes_with_party_pct
        todosVote.push(vote)
        var copiaMembers = todosVote.slice(0);
        copiaMembers.sort(function (a, b) {
            return b - a
        });
//        if ();
    }
    console.log(copiaMembers);
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
