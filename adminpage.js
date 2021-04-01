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