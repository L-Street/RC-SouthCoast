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
                    await db
                        .collection("events").doc(event.target.innerText).collection("scores")
                        .get()
                        .then(async function (querySnapshot) {
                            querySnapshot.forEach(async function (doc) {
                                var subev = document.createElement("div")
                                subev.innerText = doc.data().date




                                subev.addEventListener("click", function () {

                                })


                                subev.classList.add("subsub")
                                subdropper.appendChild(subev)
                            })
                        })
                    subdropper.style.display = "inline"


                    await db
                        .collection("events").doc(event.target.innerText).collection("totals")
                        .get()
                        .then(async function (querySnapshot) {
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