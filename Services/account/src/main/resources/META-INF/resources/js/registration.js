'use strict';

function register() {
    if (document.getElementById('password').value === document.getElementById('password_repeat').value) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(email);

        document.querySelector('form').reset();

        // hashcode für String
        String.prototype.hashCode = function () {
            let char = undefined;
            let hash;
            if (this.length == 0) return hash;
            for (var i = 0; i < this.length; i++) {
                char = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

        let hashedpw = password.hashCode()

        $.ajax({
            type: "POST",
            url: "/registration",
            data: JSON.stringify({
                "email": email,
                "password": hashedpw
            }),
            contentType: "application/json; charset=utf-8",
            success: function () {
                // redirect to login
                window.location.href = "/";
            }
        });
    } else {
        alert("Die Passwörter stimmen nicht überein!");
    }
}
