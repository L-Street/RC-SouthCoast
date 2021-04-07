window.addEventListener("DOMContentLoaded", async function () {
    var dropper = document.createElement("div")
    dropper.id = "dropper"
    var subdropper = document.createElement("div")
    subdropper.id = "subdropper"
    subdropper.style.display = "none"
    await db
        .collection("events")
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                var ev = document.createElement("div")
                ev.innerText = doc.id



                ev.addEventListener("click", async function (event) {
                    var slush = document.querySelectorAll(".subsub")
                    for (i = 0; i < slush.length; i++) {
                        slush[i].remove()
                    }
                    var sus = document.querySelectorAll(".sub")
                    for (var i = 0; i < sus.length; i++) {
                        sus[i].classList.remove("chose")
                    }
                    ev.classList.add("chose")
                    await db
                        .collection("events").doc(event.target.innerText).collection("scores")
                        .get()
                        .then(async function (querySnapshot) {
                            querySnapshot.forEach(async function (doc) {

                                var subev = document.createElement("div")
                                subev.innerText = doc.data().date
                                subev.id = doc.id




                                subev.addEventListener("click", async function (event) {
                                    await db
                                        .collection("events").doc(document.querySelector(".chose").innerText).collection("scores").doc(event.target.id).collection("points")
                                        .get()
                                        .then(async function (querySnapshot) {
                                            var alread = document.querySelectorAll(".taber")
                                            for (var i = 0; i < alread.length; i++) {
                                                alread[i].remove()
                                            }
                                            querySnapshot.forEach(async function (doc) {
                                                var tabe = document.createElement("div")
                                                tabe.classList.add("taber")
                                                var nam = document.createElement("div")
                                                nam.classList.add("nam")
                                                nam.innerText = doc.data().first + " " + doc.data().sur
                                                var score = document.createElement("div")
                                                score.classList.add("scor")
                                                score.innerText = doc.data().score
                                                tabe.appendChild(nam)
                                                tabe.appendChild(score)

                                                document.querySelector("#scorescreen").appendChild(tabe)
                                            })
                                        })
                                })


                                subev.classList.add("subsub")
                                subdropper.appendChild(subev)
                            })
                        })
                    subdropper.style.display = "flex"


                    await db
                        .collection("events").doc(event.target.innerText).collection("totals")
                        .get()
                        .then(async function (querySnapshot) {
                            var alread = document.querySelectorAll(".taber")
                            for (var i = 0; i < alread.length; i++) {
                                alread[i].remove()
                            }
                            querySnapshot.forEach(async function (doc) {
                                var tabe = document.createElement("div")
                                tabe.classList.add("taber")
                                var nam = document.createElement("div")
                                nam.classList.add("nam")
                                nam.innerText = doc.id
                                var score = document.createElement("div")
                                score.classList.add("scor")
                                score.innerText = doc.data().score
                                tabe.appendChild(nam)
                                tabe.appendChild(score)

                                document.querySelector("#scorescreen").appendChild(tabe)
                            })
                        })
                })



                ev.classList.add("sub")
                dropper.appendChild(ev)
            })

        })
    document.querySelector("#scorescreen").appendChild(dropper)
    document.querySelector("#scorescreen").appendChild(subdropper)
})