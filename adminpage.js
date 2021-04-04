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
                var remove = document.createElement("img")
                remove.classList.add("remover")
                remove.alt = "trash"
                remove.addEventListener("click", function removv() {

                })
                var optin = document.createElement("option")
                optin.value = doc.id
                optin.innerText = doc.id
                document.querySelector("#rulesel").appendChild(optin)

                box.appendChild(name)
                box.appendChild(remove)
                document.querySelector("#newru").appendChild(box)
            })
            var thene = document.createElement("button")
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
                        event.target.style.backgroundColor = "red"
                        event.target.innerText = "closed"
                    }
                    else {
                        db.collection("events").doc(event.target.id).update({
                            status: "open"
                        })
                        event.target.style.backgroundColor = "green"
                        event.target.innerText = "open"
                    }
                })
                stat.classList.add("stat")
                if (doc.data().status == "open") {
                    stat.style.backgroundColor = "green"
                }
                else {
                    stat.style.backgroundColor = "red"
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
            for (var i = 0; i < tabb.length; i++) {

                for (var i = 0; i < tabb.length; i++) {
                    tabb[i].style.display = "block"
                }

            }
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
        var rulex = document.querySelector("#rulesel")
        console.log(document.querySelector("#compid").value.toLowerCase())
        await db.collection("events").where("name", "==", document.querySelector("#compid").value.toLowerCase()).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    if (doc.exists) {
                        window.alert("doc already exists")

                    }

                    else {
                        await db.collection("events").doc(document.querySelector("#compid").value).set({
                            name: document.querySelector("#compid").value.toLowerCase(),
                            ruleset: rulex.options[rulex.selectedIndex].value,
                            status: "open"
                        })
                    }
                });



            })
    }
    )
    var tabb = document.querySelectorAll(".tabb")
    for (var i = 0; i < tabb.length; i++) {
        tabb[i].addEventListener("click", function tab(event) {
            for (var i = 0; i < tabb.length; i++) {
                tabb[i].style.display = "none"
            }
            var pseu = document.querySelectorAll(".pseupa")
            for (var i = 0; i < pseu.length; i++) {
                pseu[i].style.display = "none"
            }
            document.querySelector("#" + event.target.getAttribute("name")).style.display = "block"
        })


    }


})
