var baselin = ["Gates", "Progress"]
var penalin = ["Reverse", "Gate Marker", "Rollover", "Boundary Marker", "Vehicle Touch", "Course Direction", "Self Recovery", "Assisted Recovery", "Point out", "Did not finish", "Did not start"]
window.addEventListener("DOMContentLoaded", function () {
    var het = document.querySelector("#pulldon").style.height
    console.log(het)
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
        label.innerText = penalin[i]
        label.classList.add("label")
        var valu = document.createElement("input")
        valu.classList.add("valu")
        valu.id = penalin[i]
        valu.value = "0"

        pair.appendChild(label)
        pair.appendChild(valu)
        document.querySelector("#penalin").appendChild(pair)
    }
})
