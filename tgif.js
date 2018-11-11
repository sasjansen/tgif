var obj = {
    number_democrats: 0,
    number_republicans: 0,
    number_independents: 0,
    number_total: 0,

    perc_voted_w_prty_rep: 0,
    perc_voted_w_prty_dem: 0,
    perc_voted_w_prty_ind: 0,
    perc_voted_w_prty_total: 0,
};

var rep = [];
var dem = [];
var ind = [];
var tot = [];
var repTotalpct = 0;
var demTotalpct = 0;
var indTotalpct = 0;
var totTotalpct = 0;

var repCheck = document.getElementById("rep-check");
var demCheck = document.getElementById("dem-check");
var indCheck = document.getElementById("ind-check");
var dropdown = document.getElementById("state-filter");
var loading = true;
var fetchUrl = ""

function giveURL() {
    if (location.pathname.indexOf("house") == -1) {
        return "https://api.propublica.org/congress/v1/113/senate/members.json"
    } else {
        return "https://api.propublica.org/congress/v1/113/house/members.json"
    }
}

function fillMembers() {
    var fetchUrl = giveURL();

    fetch(fetchUrl, {
            headers: {
                "X-API-Key": "Rggdcuhk6HwO2DZT9CDauLtmQCW9EBoPefjutMkV"
            }
        })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    var members = data.results[0].members;
                    addMembers(members);
                    callFunctions()
                    addOptions(members);
                    loading = false;
                    console.log(loading);
                    showpage();
                })
        })
        .catch(function (error) {
            console.log(error)
        })
}

function fillAttendanceLoyalty() {
    var fetchUrl = giveURL();

    fetch(fetchUrl, {
            headers: {
                "X-API-Key": "Rggdcuhk6HwO2DZT9CDauLtmQCW9EBoPefjutMkV"
            }
        })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    var members = data.results[0].members;
                    numbers(members);
                    tableRows(members);
                    loading = false;
                    showpage();
                })
        })
        .catch(function (error) {
            console.log(error)
        })
}

function isMembersPage() {
    return (location.pathname.indexOf("members") != -1);
}

function getData() {
    if (isMembersPage()) {
        fillMembers();
    } else {
        fillAttendanceLoyalty();
    }
}

getData();

function showpage() {
    if (isMembersPage()) {
        document.getElementById("loading").style.visibility = "hidden";
        document.getElementById("senate-data").style.visibility = "visible";
    } else {
        document.getElementById("loading1").style.visibility = "hidden";
        document.getElementById("glance-senate-data").style.visibility = "visible";
        document.getElementById("loading2").style.visibility = "hidden";
        document.getElementById("least-engaged").style.visibility = "visible";
        document.getElementById("loading3").style.visibility = "hidden";
        document.getElementById("most-engaged").style.visibility = "visible";
    }
}

function callFunctions() {
    repCheck.addEventListener("click", defilter)
    demCheck.addEventListener("click", defilter)
    indCheck.addEventListener("click", defilter)
    dropdown.addEventListener("change", defilter)
}

function addMembers(members) {
    var tbl = document.getElementById("senate-data");
    console.log(members.length);
    for (i = 0; i < members.length; i++) {

        var tr = document.createElement("tr");
        tr.classList.add(members[i].party);
        tr.classList.add("table-row");
        tr.setAttribute("data-state", members[i].state);
        tbl.appendChild(tr);

        var td = document.createElement("td");
        var a = document.createElement('a');
        a.setAttribute('href', members[i].url);

        var name = members[i].name;
        if (members[i].middle_name == null) {
            name = members[i].first_name + " " + members[i].last_name
        } else {
            name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }
        a.innerHTML = name;

        td.appendChild(a);
        tr.appendChild(td);

        var td = document.createElement("td");
        var party = document.createTextNode(members[i].party);
        td.appendChild(party);
        tr.appendChild(td);

        var td = document.createElement("td");
        var state = document.createTextNode(members[i].state);
        td.appendChild(state);
        tr.appendChild(td);

        var td = document.createElement("td");
        var seniority = document.createTextNode(members[i].seniority);
        td.appendChild(seniority);
        tr.appendChild(td);

        var td = document.createElement("td");
        var votes_with_party_pct = document.createTextNode(members[i].votes_with_party_pct);
        td.appendChild(votes_with_party_pct);
        tr.appendChild(td);
    }
}

function defilter() {
    //    var arraySelected = Array.from(document.querySelectorAll('input[class="myCheckbox"]:checked')).map(elt => elt.value);
    var everyRow = document.getElementsByClassName("table-row");

    //var arraySelected = event.target.value;
    //console.log("arraySelected is", arraySelected);
    //var z = ["R","I","D", "R"];
    //var partyValue = document.getElementById("FilterForp").value;
    //var result= z.filter(includedArr);
    //console.log(result);
    for (var k = 0; k < everyRow.length; k++) {
        everyRow[k].classList.add("hideRow");
        if (everyRow[k].classList.contains("showRow")) {
            everyRow[k].classList.remove("showRow")
        }
    }
    for (var i = 0; i < everyRow.length; i++) {
        if (dropdown.value == everyRow[i].getAttribute('data-state') || dropdown.value == "all") {
            //            console.log(dropdown.value)
            //            console.log(everyRow[i].getAttribute("data-state"))
            //            console.log(JSON.stringify(members[i].state))
            if (repCheck.checked && everyRow[i].classList.contains("R")) {
                everyRow[i].classList.add("showRow");
                if (everyRow[i].classList.contains("hideRow")) {
                    everyRow[i].classList.remove("hideRow")
                }
            }
            if (demCheck.checked && everyRow[i].classList.contains("D")) {
                everyRow[i].classList.add("showRow");
                if (everyRow[i].classList.contains("hideRow")) {
                    everyRow[i].classList.remove("hideRow")
                }
            }
            if (indCheck.checked && everyRow[i].classList.contains("I")) {
                everyRow[i].classList.add("showRow");
                if (everyRow[i].classList.contains("hideRow")) {
                    everyRow[i].classList.remove("hideRow")
                }
            }
            if (!repCheck.checked && !demCheck.checked && !indCheck.checked) {
                everyRow[i].classList.add("showRow");
                if (everyRow[i].classList.contains("hideRow")) {
                    everyRow[i].classList.remove("hideRow")
                }
            }
        }
    }
}

function includedArr(z) {
    /*var partyValue = document.getElementsByClassName("myCheckbox");
    var valueArray = [];
        for (i = 0; i <partyValue.length; i++) {
         //   partyValue[i].classList
            valueArray.push(partyValue[i].value) 
        }
    //    console.log("valueArray" + valueArray);
    //    var partyValue = ["R", "D"];
    */
    var valueArray = Array.from(document.querySelectorAll('input[class="myCheckbox"]:checked')).map(elt => elt.value);
    //console.log("valueArray is " + valueArray);
    return valueArray.includes(z);
}

function filterState(opt) {
    var arrSelected = Array.from(document.querySelectorAll('#state-filter option:checked')).map(opt => opt.value);
    //console.log("arrSelected is " + arrSelected);
}

function addOptions(members) {
    var dropdown = document.getElementById("state-filter");
    var states = [];
    for (i = 0; i < members.length; i++) {
        states.push(members[i].state)
    }

    function unique(ar) {
        ar.slice(0); //Make a copy of the array and store it in ar
        var i = ar.length;
        while (i--) { //Iterate through the array
            if (ar.indexOf(ar[i], i + 1) > -1) { //If the array has a duplicate
                ar.splice(i, 1); //Remove that element!
            }
        }
        return ar; //Return the new, more unique array
    }
    var statesNew = unique(states);
    statesNew.sort();
    //console.log(statesNew);    
    for (i = 0; i < statesNew.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = statesNew[i];
        dropdown.appendChild(option);
    }
}

function numbers(members) {
    //    var members = members.results[0].members
    console.log(members.length)
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "R") {
            rep.push(members[i]);
            repTotalpct += members[i].votes_with_party_pct
        }
        if (members[i].party == "D") {
            dem.push(members[i]);
            demTotalpct += members[i].votes_with_party_pct
        }
        if (members[i].party == "I") {
            ind.push(members[i]);
            indTotalpct += members[i].votes_with_party_pct
        }
        tot += members[i].party;
        totTotalpct += members[i].votes_with_party_pct;
    }

    obj.number_democrats = dem.length;
    obj.number_republicans = rep.length;
    obj.number_independents = ind.length;
    obj.number_total = tot.length;

    obj.perc_voted_w_prty_rep = (repTotalpct / rep.length).toFixed(2);
    obj.perc_voted_w_prty_dem = (demTotalpct / dem.length).toFixed(2);
    obj.perc_voted_w_prty_ind = (indTotalpct / ind.length).toFixed(2);
    obj.perc_voted_w_prty_total = (totTotalpct / tot.length).toFixed(2);

    if (isNaN(obj.perc_voted_w_prty_rep)) obj.perc_voted_w_prty_rep = 0;
    if (isNaN(obj.perc_voted_w_prty_dem)) obj.perc_voted_w_prty_dem = 0;
    if (isNaN(obj.perc_voted_w_prty_ind)) obj.perc_voted_w_prty_ind = 0;
    if (isNaN(obj.perc_voted_w_prty_total)) obj.perc_voted_w_prty_total = 0;
    //        console.log(obj);

}


function tableRows(members) {
    //        console.log(obj);

    //   var members = members.results[0].members
    var tableColumns = [];
    for (var i = 0; i < members.length; i++) {
        var name = members[i].name;
        if (members[i].middle_name == null) {
            name = members[i].first_name + " " + members[i].last_name
        } else {
            name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }
        tableColumns[i] = {
            name: name,
            tot: members[i].missed_votes,
            avg: members[i].missed_votes_pct,
            tot_vot: members[i].total_votes,
            vot_pct: members[i].votes_with_party_pct
        }
    }


    tableColumns.sort(function (a, b) {
        var valueA, valueB;
        valueA = a.avg;
        valueB = b.avg;
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        }
        return 0;
    });


    var bottomtenRows = [];
    var toptenRows = [];

    var tenperc = Math.round(0.1 * tableColumns.length);
    //console.log(s[s.length-tenperc][2]);

    for (var i = 0; i < members.length; i++) {
        if ((tableColumns[i].avg == tableColumns[tableColumns.length - tenperc].avg && i >= tableColumns.length - tenperc) || i > tableColumns.length - tenperc) {
            //console.log(tableColumns[tableColumns.length-tenperc][2]);
            //console.log(i); 
            toptenRows.push(tableColumns[i]);
        }
        if ((tableColumns[i].avg == tableColumns[tenperc - 1].avg && i <= tenperc - 1) || i < tenperc - 1) {
            //console.log(tableColumns[i]);
            //console.log(i);    
            bottomtenRows.push(tableColumns[i]);
            //            obj.name_most_votes_missed[i]= bottomtenRows.name;
        }
    }


    toptenRows.reverse(function (a, b) {
        var valueA, valueB;
        valueA = a.avg;
        valueB = b.avg;
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

    //   addNumbers(bottomtenRows, toptenRows);
    //////////////////////////////////////////////

    tableColumns.sort(function (a, b) {
        var valueA, valueB;
        valueA = a.vot_pct;
        valueB = b.vot_pct;
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

    var bottomtenRowsLoyalty = [];
    var toptenRowsLoyalty = [];

    var tenperc = Math.round(0.1 * tableColumns.length);
    //console.log(s[s.length-tenperc][2]);
    //    console.log(tenperc);
    //    console.log(members.length);

    for (var i = 0; i < members.length; i++) {
        if ((tableColumns[i].vot_pct == tableColumns[tableColumns.length - tenperc].vot_pct && i >= tableColumns.length - tenperc) || i > tableColumns.length - tenperc) {
            //console.log(tableColumns[tableColumns.length-tenperc][2]);
            //console.log(i); 
            toptenRowsLoyalty.push(tableColumns[i]);
        }
        if ((tableColumns[i].vot_pct == tableColumns[tenperc - 1].vot_pct && i <= tenperc - 1) || i < tenperc - 1) {
            //console.log(tableColumns[i]);
            //console.log(i);    
            bottomtenRowsLoyalty.push(tableColumns[i]);
            //            obj.name_most_votes_missed[i]= bottomtenRows.name;
        }
    }

    //    console.log(bottomtenRows[1]);
    //    console.log(toptenRows.length);
    //    console.log(Object.keys(bottomtenRows));

    toptenRowsLoyalty.reverse(function (a, b) {
        var valueA, valueB;
        valueA = a.vot_pct;
        valueB = b.vot_pct;
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

    //    console.log(bottomtenRowsLoyalty);
    //    console.log(bottomtenRows);
    //    console.log(toptenRows);
    //    console.log(toptenRowsLoyalty);

    addNumbers(bottomtenRows, toptenRows, bottomtenRowsLoyalty, toptenRowsLoyalty);
}

function addNumbers(bttmTen, tpTen, bttmTenLoy, tpTenLoy) {
    //    console.log(obj);
    //    console.log("bttmTen", bttmTen);
    //    console.log("bttmTenLoy", bttmTenLoy);
    //    console.log("tpTen", tpTen);
    //    console.log("tpTenLoy", tpTenLoy);
    console.log(obj["number_independents"])
    console.log(obj.number_independents)
    var tbl = document.getElementById("glance-senate-data").getElementsByTagName('tbody')[0];

    var tr = document.createElement("tr");
    tr.classList.add("table-row");
    tbl.appendChild(tr);
    var td = document.createElement("td");
    var partyTotal = document.createTextNode("Total");
    td.appendChild(partyTotal);
    tr.appendChild(td);
    //console.log(document.getElementById("glance-senate-data").rows[1].cells.item(1).innerHTML);
    document.getElementById("glance-senate-data").rows[1].cells.item(1).innerHTML = obj["number_republicans"];
    document.getElementById("glance-senate-data").rows[2].cells.item(1).innerHTML = obj["number_democrats"];
    document.getElementById("glance-senate-data").rows[3].cells.item(1).innerHTML = obj["number_independents"];
    //        document.getElementById("glance-senate-data").rows[4].cells.item(1).innerHTML=obj["number_total"];
    var td = document.createElement("td");
    var partyTotal = document.createTextNode(obj["number_total"]);
    td.appendChild(partyTotal);
    tr.appendChild(td);

    document.getElementById("glance-senate-data").rows[1].cells.item(2).innerHTML = obj["perc_voted_w_prty_rep"];
    document.getElementById("glance-senate-data").rows[2].cells.item(2).innerHTML = obj["perc_voted_w_prty_dem"];
    document.getElementById("glance-senate-data").rows[3].cells.item(2).innerHTML = obj["perc_voted_w_prty_ind"];
    var td = document.createElement("td");
    var PercpartyTotal = document.createTextNode(obj["perc_voted_w_prty_total"]);
    td.appendChild(PercpartyTotal);
    tr.appendChild(td);

    //generate table with the bottom and top ten data for senate attendance page    
    if (location.pathname == "/tgif-senate-attendance.html") {
        generateTenTable(bttmTen, "least-senate-data", "tot", "avg")
        generateTenTable(tpTen, "most-senate-data", "tot", "avg")
    }


    //generate table with the bottom and top ten data for senate loyalty page    
    if (location.pathname == "/tgif-senate-loyalty.html") {
        generateTenTable(bttmTenLoy, "least-senate-data-loyalty", "tot_vot", "vot_pct")
        generateTenTable(tpTenLoy, "most-senate-data-loyalty", "tot_vot", "vot_pct")
    }

    //generate table with the bottom and top ten data for house attendance page   
    if (location.pathname == "/tgif-house-attendance.html") {
        generateTenTable(bttmTen, "least-house-data", "tot", "avg")
        generateTenTable(tpTen, "most-house-data", "tot", "avg")
    }


    //generate table with the bottom and top ten data for house loyalty page
    if (location.pathname == "/tgif-house-loyalty.html") {
        generateTenTable(bttmTenLoy, "least-house-data-loyalty", "tot_vot", "vot_pct")
        generateTenTable(tpTenLoy, "most-house-data-loyalty", "tot_vot", "vot_pct")
    }
}

function generateTenTable(array, table, varOne, varTwo) {

    var tenTable = document.getElementById(table);

    for (i = 0; i < array.length; i++) {

        var tenTr = document.createElement("tr")

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        td1.innerHTML = array[i].name;
        td2.innerHTML = array[i][varOne];
        td3.innerHTML = array[i][varTwo]

        tenTr.appendChild(td1);
        tenTr.appendChild(td2);
        tenTr.appendChild(td3);

        tenTable.appendChild(tenTr);
    }
}
