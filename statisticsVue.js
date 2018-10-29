var app = new Vue({
    el: '#app',
    data: {
        members: [],
        statistics: {
            numDem: 0,
            numRep: 0,
            numInd: 0,
            compDem: 0,
            compRep: 0,
            memfVote: 0,
            memfnVote: 0,
            memlosemayorVote: 0,
            memlosemenosVote: 0,
        },
        parTotal: [],
        porcTotal: [],
        fin: [],
    },
    created: function () {
        document.body.className = "loading";
        this.callAjax();

    },
    methods: {

        callAjax: function () {
            if ((document.getElementById("house2") != null)) {
                this.callHouse()
            }
            if ((document.getElementById("senate2") != null)) {
                this.callSenate()
            }
        },
        callHouse: function () {
            fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
                method: "GET",
                headers: {
                    'X-API-Key': 'oH9nQCYFm8g9WZmRmlBFWEwzhvHvkwDGDkpChf9h'
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }

            }).then(function (json) {
                app.members = json.results[0].members;
                app.copiaMembers = app.members.slice(0);
                app.numberCongress();
                app.porcentCongress();
                app.primerFunctionmasvote();
                app.primerFunctionmenosvote();
                app.primerFunctionlmiss();
                app.primerFunctionmmiss();
                app.callFunction();
                document.body.className = "";

            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });
        },
        callSenate: function () {
            fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
                method: "GET",
                headers: {
                    'X-API-Key': 'oH9nQCYFm8g9WZmRmlBFWEwzhvHvkwDGDkpChf9h'
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }

            }).then(function (json) {
                app.members = json.results[0].members;
                app.copiaMembers = app.members.slice(0);
                app.numberCongress();
                app.porcentCongress();
                app.primerFunctionmasvote();
                app.primerFunctionmenosvote();
                app.primerFunctionlmiss();
                app.primerFunctionmmiss();
                app.callFunction();
                document.body.className = "";

            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });
        },
        numberCongress: function () {
            var demoP = 0;
            var repuP = 0;
            var indP = 0;
            for (var i = 0; i < this.members.length; i++) {
                var part = this.members[i].party
                if (this.members[i].party == "D") {
                    demoP = demoP + 1;
                } else
                if (this.members[i].party == "R") {
                    repuP = repuP + 1
                } else
                if (this.members[i].party == "I") {
                    indP = indP + 1
                }
            }
            this.parTotal = demoP + repuP + indP;
            this.statistics.numDem = demoP;
            this.statistics.numRep = repuP;
            this.statistics.numInd = indP;
        },
        porcentCongress: function () {
            var demPorcen = [];
            var repPorcen = [];
            var indPorcen = [];
            for (var i = 0; i < this.members.length; i++) {
                var vote = this.members[i].votes_with_party_pct
                if (this.members[i].votes_with_party_pct && this.members[i].party == "D") {
                    demPorcen.push(this.members[i].votes_with_party_pct);
                }
                if (this.members[i].votes_with_party_pct && this.members[i].party == "R") {
                    repPorcen.push(this.members[i].votes_with_party_pct);
                }
                if (this.members[i].votes_with_party_pct && this.members[i].party == "I") {
                    indPorcen.push(this.members[i].votes_with_party_pct);
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
            var porvDemo = sumDem / this.statistics.numDem;
            var d = porvDemo.toFixed(1);
            var porvRepu = sumRep / this.statistics.numRep;
            var e = porvRepu.toFixed(1);
            this.portotal = porvRepu + porvDemo;
            this.fin = this.portotal / 2;
            this.fin = this.fin.toFixed(1);
            this.statistics.compDem = d;
            this.statistics.compRep = e;

        },
        primerFunctionmasvote: function () {
            var copiaMembers = this.members.slice(0);
            copiaMembers.sort(function (a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct
            });
            var diezPor = copiaMembers.length * 10 / 100;
            var redPor = Math.round(diezPor);
            var top10 = copiaMembers.slice(0, redPor);
            var ultimo = top10[top10.length - 1];
            for (var i = 0; i < this.members.length; i++) {
                if ((ultimo.votes_with_party_pct == this.members[i].votes_with_party_pct) && (top10.includes(this.members[i]) == false)) {
                    top10.push(this.members[i]);
                }
            }
            this.statistics.memfVote = top10;
        },
        primerFunctionmenosvote: function () {
            var copiarInverse = this.members.slice(0);
            copiarInverse.sort(function (a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct
            })
            var diezPor2 = copiarInverse.length * 10 / 100;
            var redPor2 = Math.round(diezPor2);
            var top102 = copiarInverse.slice(0, redPor2);
            var ultimo2 = top102[top102.length - 1];
            for (var i = 0; i < this.members.length; i++) {
                if ((ultimo2.votes_with_party_pct == this.members[i].votes_with_party_pct) && (top102.includes(this.members[i]) == false)) {
                    top102.push(this.members[i]);
                }
            }
            this.statistics.memfnVote = top102;
        },
        primerFunctionlmiss: function () {
            var todosVote = [];
            var tenporMas = [];
            var tenporMenos = [];
            var copiarInverse = this.members.slice(0);
            copiarInverse.sort(function (a, b) {
                return a.missed_votes_pct - b.missed_votes_pct
            })
            var diezPor2 = copiarInverse.length * 10 / 100;
            var redPor2 = Math.round(diezPor2);
            var top1022 = copiarInverse.slice(0, redPor2);
            var ultimo2 = top1022[top1022.length - 1];
            for (var i = 0; i < this.members.length; i++) {
                if ((ultimo2.missed_votes_pct == this.members[i].missed_votes_pct) && (top1022.includes(this.members[i]) == false)) {
                    top1022.push(this.members[i]);
                }
            }
            this.statistics.memlosemenosVote = top1022;
        },
        primerFunctionmmiss: function () {
            var todosVote = [];
            var tenporMas = [];
            var tenporMenos = [];
            var copiaMembers = this.members.slice(0);
            copiaMembers.sort(function (a, b) {
                return b.missed_votes_pct - a.missed_votes_pct
            });
            var diezPor = copiaMembers.length * 10 / 100;
            var redPor = Math.round(diezPor);
            var top102 = copiaMembers.slice(0, redPor);
            var ultimo = top102[top102.length - 1];
            for (var i = 0; i < this.members.length; i++) {
                if ((ultimo.missed_votes_pct == this.members[i].missed_votes_pct) && (top102.includes(this.members[i]) == false)) {
                    top102.push(this.members[i]);
                }
            }
            this.statistics.memlosemayorVote = top102;
        },
        callFunction: function () {
            if ((document.getElementById("tabla5") != null) && (document.getElementById("tabla6") != null)) {
                this.primerFunctionmmiss()
                this.primerFunctionlmiss()
            }
            if ((document.getElementById("tabla3") != null) && ((document.getElementById("tabla4")) != null)) {
                this.primerFunctionmasvote()
                this.primerFunctionmenosvote()
            }
        },
        atribute: function () {
            var namefull;
            for (var i = 0; i < this.members.length; i++) {
                var url = this.members[i].url;
                var sta = this.members[i].state;
                if (this.members[i].middle_name == null) {

                    namefull = this.members[i].first_name + " " + this.members[i].last_name;

                } else

                if (this.members[i].middle_name != null) {

                    namefull = this.members[i].first_name + " " + this.members[i].middle_name + " " + this.members[i].last_name;
                }
                var link = document.createElement("a");
                link.setAttribute("href", url);
                link.textContent = namefull;
                colName.appendChild(link);
            }
    },
    filter: function () {}
}
});
