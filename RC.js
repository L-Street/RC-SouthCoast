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
window.addEventListener("DOMContentLoaded", function () {

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
            console.log(rules[event.target.innerText])
            document.querySelector("#Gates").value = ""
            console.log(rules[event.target.innerText][Progress])
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
})
