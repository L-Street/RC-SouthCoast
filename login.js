document.querySelector("#admin-box").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("conform").click();
    }
});
document.querySelector("#create").addEventListener("click", function () {
    document.querySelector("#logpage").style.display = "none"
    document.querySelector("#createpage").style.display = "block"
})
function switc() {
    document.querySelector("#logpage").style.display = "block"
    document.querySelector("#createpage").style.display = "none"
}
function login(e) {
    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {


            console.log("here")
            const logins = document.querySelector("#admin-box");


            const email = logins["Emil"].value;
            const password = logins["passowrd"].value;

            // firebase login
            firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
                window.location.replace("RC.html");
            })
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