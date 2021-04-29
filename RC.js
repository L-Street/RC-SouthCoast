
var custom = "text"
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        await db.collection("users").doc(user.email).get().then((doc) => {
            if (doc.exists) {
                custom = doc.data();
                if (doc.data().type == "admin") {
                    window.location.replace("index.html")
                }
                else { }
            }
        })
    }
    else {
        window.location.replace("index.html")
    }
})
var points = 0
var scalemeasure = 0

var baselin = ["Gates", "Progress"]
var penalin = ["Reverse", "Gate-Marker", "Rollover", "Boundary-Marker", "Vehicle-Touch", "Course-Direction", "Self-Recovery", "Assisted-Recovery", "Point-Out", "Did-not-finish", "Did-not-start"]
var valos = ["Progress", "Reverse", "Gate-Marker", "Rollover", "Boundary-Marker", "Vehicle-Touch", "Course-Direction", "Self-Recovery", "Assisted-Recovery"]
window.addEventListener("DOMContentLoaded", async function () {
    await db
        .collection("events").where("status", "==", "open")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var ev = document.createElement("p")
                ev.value = doc.id
                ev.classList.add("cold")
                ev.innerText = doc.id
                ev.addEventListener("click", async function tab(event) {
                    document.querySelector("#filler").innerText = event.target.innerText
                    document.querySelector("#invis").style.display = "none"
                    await db.collection("events").doc(event.target.innerText).get().then((doc) => {

                        if (doc.exists) {
                            db.collection("rules").doc(doc.data().ruleset).get().then((doc) => {
                                if (doc.exists) {
                                    document.querySelector("#Gates").value = ""
                                    document.querySelector("#Progress").value = parseInt(doc.data().Progress)
                                    for (var i = 0; i < penalin.length; i++) {
                                        document.querySelector("#" + penalin[i]).value = parseInt(doc.data()[penalin[i]])
                                    }
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
                                                    var change = parseInt(document.querySelector("#" + valos[i]).value * document.querySelector("#" + valos[i] + "t").value)
                                                    score += change
                                                }

                                                points = score

                                                document.querySelector("#total").innerText = (score += scalemeasure)
                                            }
                                        }
                                    }
                                }
                            })
                        }

                    }
                    )
                })

                document.querySelector("#invis").appendChild(ev)
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
        lens[i].addEventListener("keyup", function arl() {
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
                            var change = parseInt(document.querySelector("#" + valos[i]).value * document.querySelector("#" + valos[i] + "t").value)
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
        if (document.querySelector("#filler").innerText == "Competition") {
            document.querySelector("#final").style.backgroundColor = "red"
        }
        else {
            var tpoints = 0

            var list = document.querySelector("#comps")
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            var date = day + "_" + month + "_" + year
            var date2 = day + "/" + month + "/" + year
            await db.collection("events").doc(document.querySelector("#filler").innerText).collection("scores").doc(date).collection("points").doc(custom.first + "-" + custom.sur).get().then(async (doc) => {
                if (doc.exists) {
                    window.alert("Score already recorded for this event + day")
                }
                else {

                    await db
                        .collection("events").doc(document.querySelector("#filler").innerText).collection("scores")
                        .get()
                        .then(async function (querySnapshot) {
                            querySnapshot.forEach(async function (doc) {

                                await db
                                    .collection("events").doc(document.querySelector("#filler").innerText).collection("scores").doc(doc.id).collection("points").doc(custom.first + "-" + custom.sur).get().then((doc) => {
                                        if (doc.exists) {
                                            tpoints += doc.data().score
                                            console.log(tpoints)
                                        }
                                        else {
                                        }
                                    })



                            })

                        }).then(async function () {
                            await db.collection("events").doc(document.querySelector("#filler").innerText).collection("totals").doc(custom.first + " " + custom.sur).set({
                                score: tpoints += parseInt(document.querySelector("#total").innerText)
                            })

                            await db.collection("events").doc(document.querySelector("#filler").innerText).collection("scores").doc(date).set({
                                date: date2
                            })


                            await db.collection("events").doc(document.querySelector("#filler").innerText).collection("scores").doc(date).collection("points").doc(custom.first + "-" + custom.sur).set({
                                first: custom.first,
                                sur: custom.sur,
                                score: parseInt(document.querySelector("#total").innerText)
                            })

                            document.querySelector("#final").innerText = "Saved"
                        })

                }
            })
        }
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
document.querySelector("#logout").addEventListener("click", function logout() {
    firebase.auth().signOut().then(() => {
        window.location.replace("index.html")
    }).catch((error) => {
        // An error happened.
    });
})
document.querySelector("#filler").addEventListener("click", function (event) {
    document.querySelector("#invis").style.display = "block"
})

