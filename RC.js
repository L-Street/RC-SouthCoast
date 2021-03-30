
var custom = "text"
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        await db.collection("users").doc(user.email).get().then((doc) => {
            if (doc.exists) {
                custom = doc.data();
            }
        })
    }
    else {
        window.location.replace("index.html")
    }
})
var points = 0
var scalemeasure = 0
var rules = {
    "SORRCA Lite rules": {
        "Progress": "0",
        "Reverse": "0",
        "Gate-Marker": "10",
        "Rollover": "5",
        "Boundary-Marker": "5",
        "Vehicle-Touch": "5",
        "Course-Direction": "0",
        "Self-Recovery": "1",
        "Assisted-Recovery": "5",
        "Point-out": "",
        "Did-not-finish": "point out + 10",
        "Did-not-start": "point out + 20"
    },
    "Official Scale Rock Crawling Rules": {
        "Progress": "-2",
        "Reverse": "1",
        "Gate-Marker": "10",
        "Rollover": "5",
        "Boundary-Marker": "10",
        "Vehicle-Touch": "10",
        "Course-Direction": "10",
        "Self-Recovery": "3",
        "Assisted-Recovery": "10",
        "Point-out": "80",
        "Did-not-finish": "100",
        "Did-not-start": "130"
    },
    "Custom": {
        "Progress": "",
        "Reverse": "",
        "Gate-Marker": "",
        "Rollover": "",
        "Boundary-Marker": "",
        "Vehicle-Touch": "",
        "Course-Direction": "",
        "Self-Recovery": "",
        "Assisted-Recovery": "",
        "Point-out": "",
        "Did-not-finish": "",
        "Did-not-start": ""
    }
}
var baselin = ["Gates", "Progress"]
var penalin = ["Reverse", "Gate-Marker", "Rollover", "Boundary-Marker", "Vehicle-Touch", "Course-Direction", "Self-Recovery", "Assisted-Recovery", "Point-out", "Did-not-finish", "Did-not-start"]
var valos = ["Progress", "Reverse", "Gate-Marker", "Rollover", "Boundary-Marker", "Vehicle-Touch", "Course-Direction", "Self-Recovery", "Assisted-Recovery"]
window.addEventListener("DOMContentLoaded", function () {
    db
        .collection("events").where("status", "==", "open")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var ev = document.createElement("option")
                ev.value = doc.id
                ev.innerText = doc.id
                document.querySelector("#comps").appendChild(ev)
            })
        })

    var changers = document.querySelectorAll(".swapper")
    for (var i = 0; i < changers.length; i++) {
        changers[i].addEventListener("click", function tab(event) {
            var tabs = document.querySelectorAll(".fakepage")
            var swaps = document.querySelectorAll(".swapper")
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].style.display = "none"
                swaps[i].src = "files/" + swaps[i].name + "grey.png"
            }
            event.target.src = "files/" + event.target.name + "blue.png"
            document.querySelector("#" + event.target.name).style.display = "block"
        })
    }
    var rulic = document.querySelectorAll(".ruleset")
    for (var i = 0; i < rulic.length; i++) {
        rulic[i].addEventListener("click", function rul(event) {
            document.querySelector("#Gates").value = ""
            document.querySelector("#Progress").value = rules[event.target.innerText]["Progress"]
            for (var i = 0; i < penalin.length; i++) {
                document.querySelector("#" + penalin[i]).value = rules[event.target.innerText][penalin[i]]
            }

        })
    }
    for (var i = 0; i < baselin.length; i++) {
        var pair = document.createElement("div")
        pair.classList.add("pair")
        var label = document.createElement("p")
        label.innerText = baselin[i]
        label.classList.add("label")
        var valu = document.createElement("input")
        valu.classList.add("valu")
        valu.id = baselin[i]
        valu.value = "0"

        pair.appendChild(label)
        pair.appendChild(valu)
        document.querySelector("#basedlin").appendChild(pair)
    }
    for (var i = 0; i < penalin.length; i++) {
        var pair = document.createElement("div")
        pair.classList.add("pair")
        var label = document.createElement("p")
        label.innerText = penalin[i].replace(/-/g, ' ')
        label.classList.add("label")
        var valu = document.createElement("input")
        valu.classList.add("valu")
        valu.id = penalin[i]
        valu.value = "0"

        pair.appendChild(label)
        pair.appendChild(valu)
        document.querySelector("#penalin").appendChild(pair)
    }
    document.querySelector("#plus").addEventListener("click", function newd(event) {
        var thedrop = document.querySelector(".modsele")
        var clone = thedrop.cloneNode(true)
        clone.classList.add("clone")
        clone.setAttribute("onchange", "scal()")
        var plus = event.target
        plus.remove()
        document.querySelector("#modi").appendChild(clone)
        document.querySelector("#modi").appendChild(plus)
        scal()
    })
    document.querySelector("#resetscale").addEventListener("click", function noclone(event) {
        var clones = document.querySelectorAll(".clone")
        for (var i = 0; i < clones.length; i++) {
            clones[i].remove()
        }
        scal()

    })
    document.querySelector("#scalestat").addEventListener("click", function statuz(event) {
        if (document.querySelector("#scalestat").innerText === "OFF") {
            document.querySelector("#scalestat").innerText = "ON"
            document.querySelector("#scalestat").style.backgroundColor = "rgba(21, 236, 17,0.64)"
            scal()
        }
        else {
            document.querySelector("#scalestat").innerText = "OFF"
            document.querySelector("#scalestat").style.backgroundColor = "rgba(246, 14, 14,0.63)"
            document.querySelector("#total").innerText = points
        }
    })

    var lens = document.querySelectorAll(".line")
    for (var i = 0; i < lens.length; i++) {
        lens[i].addEventListener("change", function arl() {
            var score = 0
            if (document.querySelector("#pout").checked === true) {
                score = parseInt(document.querySelector("#Point-out").value)
                points = score
                console.log(score)
                document.querySelector("#total").innerText = score += scalemeasure
            }
            else {
                if (document.querySelector("#DNF").checked === true) {
                    score = parseInt(document.querySelector("#Did-not-finish").value)
                    points = score
                    document.querySelector("#total").innerText = (score += scalemeasure)
                }
                else {
                    if (document.querySelector("#DNS").checked === true) {
                        score = parseInt(document.querySelector("#Did-not-start").value)
                        points = score
                        document.querySelector("#total").innerText = score
                    }
                    else {
                        for (var i = 0; i < valos.length; i++) {
                            var change = document.querySelector("#" + valos[i]).value * document.querySelector("#" + valos[i] + "t").value
                            score += change
                        }

                        points = score

                        document.querySelector("#total").innerText = (score += scalemeasure)
                    }
                }
            }
        })
    }
    var bos = document.querySelectorAll(".box")
    for (var i = 0; i < bos.length; i++) {
        bos[i].addEventListener("click", function arl() {
            var score = 0
            if (document.querySelector("#pout").checked === true) {
                score = parseInt(document.querySelector("#Point-out").value)
                points = score
                document.querySelector("#total").innerText = score += scalemeasure
            }
            else {
                if (document.querySelector("#DNF").checked === true) {
                    score = parseInt(document.querySelector("#Did-not-finish").value)
                    points = score
                    document.querySelector("#total").innerText = (score += scalemeasure)
                }
                else {
                    if (document.querySelector("#DNS").checked === true) {
                        score = parseInt(document.querySelector("#Did-not-start").value)
                        points = score
                        document.querySelector("#total").innerText = score
                    }
                    else {
                        for (var i = 0; i < valos.length; i++) {
                            var change = document.querySelector("#" + valos[i]).value * document.querySelector("#" + valos[i] + "t").value
                            score += change
                        }

                        points = score

                        document.querySelector("#total").innerText = (score += scalemeasure)
                    }
                }
            }
        })
    }
    document.querySelector("#final").addEventListener("click", async function () {
        var tpoints = 0
        db
            .collection("events").doc(comps.options[comps.selectedIndex].value).collection("scores")
            .get()
            .then(async function (querySnapshot) {
                querySnapshot.forEach(async function (doc) {


                    db
                        .collection("events").doc(comps.options[comps.selectedIndex].value).collection("scores").doc(doc.id).collection("points").doc(custom.first + "-" + custom.sur).get().then((doc) => {
                            if (doc.exists) {
                                tpoints += doc.data().score
                            }
                        })
                })
            })
        tpoints += parseInt(document.querySelector("#total").innerText)

        var list = document.querySelector("#comps")
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var date = day + "_" + month + "_" + year
        var date2 = day + "/" + month + "/" + year
        await db.collection("events").doc(comps.options[comps.selectedIndex].value).collection("scores").doc(date).collection("points").doc(custom.first + "-" + custom.sur).get().then((doc) => {
            /*if (doc.exists) {
                window.alert("Score already recorded for this event + day")
            }*/
            //else {
            db.collection("events").doc(comps.options[comps.selectedIndex].value).collection("totals").doc(custom.first + " " + custom.sur).set({
                score: tpoints
            })
            db.collection("events").doc(comps.options[comps.selectedIndex].value).collection("scores").doc(date).set({
                date: date2
                // [custom.first + " " + custom.sur]: tpoints
            })
            db.collection("events").doc(comps.options[comps.selectedIndex].value).collection("scores").doc(date).collection("points").doc(custom.first + "-" + custom.sur).set({
                first: custom.first,
                sur: custom.sur,
                score: parseInt(document.querySelector("#total").innerText)
            })

            document.querySelector("#final").innerText = "Saved"

            // }
        })

    })
})

function scal() {
    if (document.querySelector("#scalestat").innerText === "OFF") { }
    else {
        var check = parseInt(document.querySelector("#model").options[document.querySelector("#model").selectedIndex].value)
        var factors = document.querySelectorAll(".modsele")
        scalemeasure = 0
        var calc = points
        for (var i = 0; i < factors.length; i++) {
            var attrib = parseInt(factors[i].options[factors[i].selectedIndex].value)
            scalemeasure += attrib
        }
        if (scalemeasure < check) {
            console.log("max")
            calc += check
            scalemeasure = check
            document.querySelector("#total").innerText = (calc)
        } else {
            calc += scalemeasure
            console.log("safe")
            document.querySelector("#total").innerText = (calc)
        }
    }
}
