$(document).ready(function () {

    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {



        var $this = $(this),
            label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.removeClass("highlight");
            }
        } else if (e.type === "focus") {
            if ($this.val() === "") {
                label.removeClass("highlight");
            }
            else if ($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });


    $('.message a').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, slow);
    });
    /*array donde se guardan los datos */
    let usuariosList = []

    /*validacion de contraseña */
    function validarPassword(password, passwordConfirm) {
        if (password == passwordConfirm) {
            return true;
        }
    }

    /* Validamos la longitud de la contraseña y la convertimos en minusculas */
    function validarPasswordlongitud(password) {
        password = password.toLowerCase();
        if (password.length <= 3) {
            return false;
        }
    }
    function existeUserName(username) {
        return Boolean(usuariosList.find(function (item) {
            return item[0] == username;
        }));
    }

    /* Validamos el nombre de usuario */
    function validarUserName(username) {
        username = username.toLowerCase();
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            return true;
        }
        if (username.length == 0)
            return true;
        if (username.length < 6)
            return true;
        if (!isNaN(username[0]))
            return true;
        return false;

    }
    /*validarEmail verifica que exista y que tenga los caracteres correcto */
    function validarEmail(email) {
        if (usuariosList.find(function (item) {
            return item[2] == email;
        }) !== undefined) return false;
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)) {
            return true;
        } else {
            return false;
        }

    }
    let mostaralerta = document.getElementById("alert");
    /* funcion getHtmlAlert y showAlert para mostrar alerta */
    function getHtmlAlert(tipo, mensaje) {
        return ` <div class="alert alert-${tipo}" role="alert" >
                     ${mensaje}
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>`
    }

    function showAlert(tipo, mensaje, divElement) {
        divElement.innerHTML = getHtmlAlert(tipo, mensaje);
    }

    /* funcion registrar usuario */
    document.getElementById("btnRegistro").addEventListener('click', function registrarUsuario(e) {
        e.preventDefault();
        let username = document.getElementById("nuevoUsuario").value;
        let email = document.getElementById("correoElectronico").value;
        let password = document.getElementById("nuevaContraseña").value;
        let passwordConfirm = document.getElementById("repContraseña").value;
        let passencript = window.btoa(passwordConfirm);

        if (existeUserName(username)) {
            showAlert("warning", "El nombre de usuario ya se encuentra registrado", mostaralerta);
        }
        if (!validarPassword(password, passwordConfirm)) {
            showAlert("warning", "Las contraseñas ingresadas no coinciden", mostaralerta);
        }
        if (validarPasswordlongitud(password)) {
            showAlert("warning", "La contraseña tiene que tener mas de 3 digitos", mostaralerta);
        }
        if (Boolean(!validarEmail(email))) {
            showAlert("warning", "El email no cumple los requisitos o ya está registrado", mostaralerta);
        }
        else {
            usuariosList.push([username, passencript, email, Date.now(), '']) && showAlert("primary", "Los datos se registraron correctamente", mostaralerta);
        }
    });

    /* Validacion de usuario */
    function validarUsuario(userlog, passlog) {
        return usuariosList.find(function (item) {
            return item[0] === userlog && item[1] === passlog
        })
    }


    /* Validacion inicio de sesion */
    let intento = 1;
    document.getElementById("botonLogin").addEventListener("click", function loginUsuario(e) {
        e.preventDefault();
        let userlog = document.getElementById("userName").value;
        let passlog = document.getElementById("password").value;
        let date = Date.now();
        let passdesencrit = window.btoa(passlog);


        usuariosList.find(function (item) {
            if (userlog === item[0]) {
                item[4] = date;
            }
        })

        if (validarUsuario(userlog, passdesencrit)) {
            showAlert("success", "Bienvenido " + userlog, mostaralerta);
            intento = 1;

            setTimeout(Swal.fire('Inicio de sesion exitoso!!'), 3000);
        } else {
            showAlert("warning", "Numero de intentos: " + intento, document.getElementById("alertIntentos"));
            showAlert("warning", "<b>El usuario y contraseña ingresados son incorrectos</b>", mostaralerta);

            if (intento >= 3) {
                showAlert("danger", "<b>Usted a superado el numero de intentos </b>", document.getElementById("alertIntentos"));
                document.getElementById('botonLogin').disabled = 'true';
                document.getElementById('userName').disabled = 'true';
                document.getElementById('password').disabled = 'true';
            }

            intento++;
        }

        

    });
})

