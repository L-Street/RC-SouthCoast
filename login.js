document.querySelector("#admin-box").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("conform").click();
    }
});
document.querySelector("#create").addEventListener("click", function () {
    document.querySelector("#logpage").style.display = "none"
    document.querySelector("#createpage").style.display = "grid"
})
function switc() {
    document.querySelector("#logpage").style.display = "grid"
    document.querySelector("#createpage").style.display = "none"
}
function login(e) {
    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            var docRef = db.collection("users").doc(e.parentNode.querySelector("#Emil").value);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log(doc.data().type)
                    if (doc.data().type === "admin") {
                        (function () {
                            console.log("here")
                            const logins = document.querySelector("#admin-box");


                            const email = logins["Emil"].value;
                            const password = logins["passowrd"].value;

                            // firebase login
                            auth.signInWithEmailAndPassword(email, password).then((cred) => {
                                window.location.replace("menu.html");
                            }).catch(error => document.querySelector("#conform").style.backgroundColor = "red",
                                setTimeout(function () { document.querySelector("#conform").style.backgroundColor = " #0A0903"; }, 1500))

                        })();
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        })
}
function account() {
    const email = document.querySelector("#Cemail").value
    const password = document.querySelector("#Cpass").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.replace("RC.html")
                    var user = userCredential.user;
                    // ...
                })
            db.collection("users").doc(email).set({
                email: email,
                first: document.querySelector("#Fname").value,
                sur: document.querySelector("#Sname").value
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}