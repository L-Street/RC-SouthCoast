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
                            console.log("here")

                            // firebase login
                            firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
                                window.location.replace("adminpage.html");
                            })

                        })();
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            })
        })
};