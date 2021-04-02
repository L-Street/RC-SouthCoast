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
                remove.addEventListener("click", function removv() {

                })
                var thene = document.createElement("button")
                thene.innerText = "New"
                thene.addEventListener("click", function () {
                    document.querySelector("#ruleform").style.display = "block"
                    document.querySelector("#newru").style.display = "none"
                })
                box.appendChild(name)
                box.appendChild(remove)
                document.querySelector("#newru").appendChild(box)
                document.querySelector("#newru").appendChild(thene)
            })
        })
    document.querySelector("#rulesub").addEventListener("click", async function givit(event) {

        await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).set({
        })
        var ruleoop = document.querySelectorAll(".ruleoop")
        console.log(ruleoop)
        for (var i = 0; i < ruleoop.length; i++) {
            if (ruleoop[i].querySelector(".inpu").value == "") {
                console.log(ruleoop[i].id)
                await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).update({
                    [ruleoop[i].id]: 0
                })
            }
            else {
                console.log(ruleoop[i].id)
                await db.collection("rules").doc(document.querySelector("#Rule-name").getElementsByTagName("input")[0].value).update({
                    [ruleoop[i].id]: ruleoop[i].querySelector(".inpu").value
                })
            }
        }
    })
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
