
//var x = document.getElementById("senate-data").innerHTML = data;

//console.log(data);

//var x = JSON.stringify(data, null, 2);
var repCheck = document.getElementById("rep-check");
var demCheck = document.getElementById("dem-check");
var indCheck = document.getElementById("ind-check");
var dropdown = document.getElementById("state-filter");
//var x = document.getElementById("senate-data").innerHTML; 
var loading=true;
//showpage();

//console.log(x);

//members.length or data.results.num_results

if (location.pathname == "/tgif-senate-loyalty.html"||location.pathname == "/tgif-senate-members.html"||location.pathname == "/tgif-senate-attendance.html") {

function getData() {
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
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
                    loading=false;
                    console.log(loading);
                    showpage();                
                })
        })
        .catch(function (error) {
            console.log(error)
        })
}
}

if (location.pathname == "/tgif-house-loyalty.html"||location.pathname == "/tgif-house-members.html"||location.pathname == "/tgif-house-attendance.html") {

function getData() {
    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
                    loading=false;
                    showpage();                

                })
        })
        .catch(function (error) {
            console.log(error)
        })
}
}

getData();

function showpage() {
    document.getElementById("loading").style.visibility="hidden";    
    document.getElementById("senate-data").style.visibility="visible";
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

