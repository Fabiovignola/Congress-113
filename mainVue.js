var app = new Vue({
    el: '#app',
    data: {
        members: [],
        membersOriginal: [],
        statesp: [],
        uniqs: []
    },
    created: function () {
        document.body.className = "loading";
        this.callAjax();
        this.createSelect();
    },
    methods: {
        callAjax: function () {
            var tab = document.getElementById("house")
            var tab2 = document.getElementById("senate")
            if ((document.getElementById("house") && (document.getElementById("house")) != null)) {
                this.callHouse()
            }
            if ((document.getElementById("senate")) && ((document.getElementById("senate")) != null)) {
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
                app.membersOriginal = json.results[0].members;
                app.createSelect();
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
                    console.log(2);
                    return response.json();
                }
            }).then(function (json) {
                app.members = json.results[0].members;
                app.membersOriginal = json.results[0].members;
                app.createSelect();
                document.body.className = "";
            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });
        },
        filterCongress: function () {
            this.members = this.membersOriginal;
            var filteredMembers = [];
            filteredMembers = [];
            var checkboxD = document.getElementById("Democrat");
            var checkboxR = document.getElementById("Republican");
            var checkboxI = document.getElementById("Independent");
            for (var j = 0; j < this.members.length; j++) {
                if (((this.members[j].party == checkboxD.value) && checkboxD.checked) && this.members[j].state == document.getElementById("menu").value) {
                    filteredMembers.push(this.members[j]);
                }
                if (((this.members[j].party == checkboxR.value) && checkboxR.checked) && this.members[j].state == document.getElementById("menu").value) {
                    filteredMembers.push(this.members[j]);
                }
                if (((this.members[j].party == checkboxI.value) && checkboxI.checked) && this.members[j].state == document.getElementById("menu").value) {
                    filteredMembers.push(this.members[j]);
                }
                if (((this.members[j].party == checkboxD.value) && checkboxD.checked) && document.getElementById("menu").value == "ALL") {
                    filteredMembers.push(this.members[j]);
                }
                if (((this.members[j].party == checkboxR.value) && checkboxR.checked) && document.getElementById("menu").value == "ALL") {
                    filteredMembers.push(this.members[j]);
                }
                if (((this.members[j].party == checkboxI.value) && checkboxI.checked) && document.getElementById("menu").value == "ALL") {
                    filteredMembers.push(this.members[j]);
                }
            }
            this.members = filteredMembers;
        },
        createSelect: function () {
            for (var i = 0; i < this.members.length; i++) {
                var sta = this.members[i].state;
                this.statesp.push(sta);
            }
            this.uniqs = this.statesp.filter(function (item, index, array) {
                return array.indexOf(item) === index;
            })
        },
        filter: function () {}
    }
});
