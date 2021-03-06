firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        await db.collection("users").doc(user.email).get().then((doc) => {
            if (doc.exists) {
                if (doc.data().type == "admin") {

                }
                else {
                    window.location.replace("admin.html")
                }
            }
        })
    }
    else {
        window.location.replace("admin.html")
    }
})
window.addEventListener("DOMContentLoaded", async function la() {

    await db.collection("rules")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var box = document.createElement("div")
                box.id = doc.id
                box.classList.add("box")
                var name = document.createElement("p")
                name.innerText = doc.id
                name.classList.add("rulen")
                var optin = document.createElement("p")
                optin.value = doc.id
                optin.innerText = doc.id
                optin.addEventListener("click", async function tab(event) {
                    document.querySelector("#filler").innerText = event.target.innerText
                    document.querySelector("#invis").style.display = "none"
                })
                document.querySelector("#invis").appendChild(optin)

                box.appendChild(name)
                document.querySelector("#newru").appendChild(box)
            })
            var thene = document.createElement("button")
            thene.classList.add("thene")
            thene.innerText = "New"
            thene.addEventListener("click", function () {
                document.querySelector("#ruleform").style.display = "block"
                document.querySelector("#newru").style.display = "none"
            })
            document.querySelector("#newru").appendChild(thene)
        })
    await db.collection("events")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var big = document.createElement("div")
                big.classList.add("big")
                var nim = document.createElement("p")
                nim.innerText = doc.id
                nim.classList.add("nim")
                var stat = document.createElement("div")
                stat.innerText = doc.data().status
                stat.id = doc.id
                stat.addEventListener("click", function (event) {
                    if (event.target.innerText == "open") {
                        db.collection("events").doc(event.target.id).update({
                            status: "closed"
                        })
                        event.target.style.backgroundColor = "#EE251E"
                        event.target.innerText = "closed"
                    }
                    else {
                        db.collection("events").doc(event.target.id).update({
                            status: "open"
                        })
                        event.target.style.backgroundColor = "#0F6200"
                        event.target.innerText = "open"
                    }
                })
                stat.classList.add("stat")
                if (doc.data().status == "open") {
                    stat.style.backgroundColor = "#0F6200"
                }
                else {
                    stat.style.backgroundColor = "#EE251E"
                }
                big.appendChild(nim)
                big.appendChild(stat)
                document.querySelector("#newcu").appendChild(big)
            })
        })
    document.querySelector("#tolist").addEventListener("click", async function back(event) {
        document.querySelector("#ruleform").style.display = "none"
        document.querySelector("#newru").style.display = "block"
    })
    var mainer = document.querySelectorAll(".mainba")
    for (var i = 0; i < mainer.length; i++) {
        mainer[i].addEventListener("click", async function back(event) {
            event.target.parentNode.style.display = "none"
            document.querySelector("#maingrid").style.display = "grid"
        })
    }
    document.querySelector("#rulesub").addEventListener("click", async function givit(event) {

        await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).set({
        })
        var ruleoop = document.querySelectorAll(".ruleoop")
        for (var i = 0; i < ruleoop.length; i++) {
            if (ruleoop[i].querySelector(".inpu").value == "") {
                await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).update({
                    [ruleoop[i].id]: 0
                })
            }
            else {
                await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).update({
                    [ruleoop[i].id]: ruleoop[i].querySelector(".inpu").value
                })
            }
        }
    })

    document.querySelector("#newcompsub").addEventListener("click", async function newcom(event) {
        if (document.querySelector("#filler").innerText == "Rules") {
            document.querySelector("#newcompsub").style.backgroundColor = "red"
        }
        else {
            var rulex = document.querySelector("#rulesel")
            await db.collection("events").doc((document.querySelector("#compid").value)).get().then(async (doc) => {
                if (doc.exists) {
                    window.alert("doc already exists")
                }
                else {
                    console.log(document.querySelector("#compid").value)
                    await db.collection("events").doc(document.querySelector("#compid").value).set({
                        name: document.querySelector("#compid").value.toLowerCase(),
                        ruleset: document.querySelector("#filler").innerText,
                        status: "open"
                    })
                    document.querySelector("#compid").value = ""
                }
            });
        }
    })

    var tabb = document.querySelectorAll(".tabb")
    for (var i = 0; i < tabb.length; i++) {
        tabb[i].addEventListener("click", function tab(event) {
            document.querySelector("#maingrid").style.display = "none"

            var pseu = document.querySelectorAll(".pseupa")
            for (var i = 0; i < pseu.length; i++) {
                pseu[i].style.display = "none"
            }
            document.querySelector("#" + event.target.parentNode.getAttribute("name")).style.display = "block"
        })


    }
    document.querySelector("#logout").addEventListener("click", function logout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    })
    document.querySelector("#filler").addEventListener("click", function (event) {
        document.querySelector("#invis").style.display = "block"
    })
})
