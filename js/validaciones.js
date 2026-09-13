// Verfificar RUT
function validarRun(run) {
  run = run.trim().toUpperCase();

  if (run.length < 7 || run.length > 9) {
    return { valido: false, mensaje: "El RUN debe tener entre 7 y 9 caracteres." };
  }

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) {
    return { valido: false, mensaje: "El RUN solo debe contener números y el dígito verificador." };
  }

  // Cálculo del dígito verificador
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  if (dv !== dvEsperado) {
    return { valido: false, mensaje: "El RUN ingresado no es válido (dígito verificador incorrecto)." };
  }

  return { valido: true, mensaje: "" };
}

// verfificar email
function validarCorreo(correo) {
  correo = correo.trim();
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  if (correo.length === 0) {
    return { valido: false, mensaje: "El correo es obligatorio." };
  }
  if (correo.length > 100) {
    return { valido: false, mensaje: "El correo no puede superar los 100 caracteres." };
  }
  const dominioValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
  if (!dominioValido) {
    return { valido: false, mensaje: "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com." };
  }
  return { valido: true, mensaje: "" };
}

// Registro
function validacionRegistro() {
  const formulario = document.getElementById("form-registro");
  if (!formulario) return;

  const campoRun = document.getElementById("run");
  const campoNombre = document.getElementById("nombre");
  const campoApellidos = document.getElementById("apellidos");
  const campoCorreo = document.getElementById("correo");
  const campoPassword = document.getElementById("password");
  const campoPasswordConfirm = document.getElementById("password-confirm");
  const campoRegion = document.getElementById("region");
  const campoComuna = document.getElementById("comuna");
  const campoDireccion = document.getElementById("direccion");

  campoNombre.addEventListener("blur", () => {
    if (campoNombre.value.trim() === "") {
      mostrarError("nombre", "El nombre es obligatorio.");
    } else if (campoNombre.value.length > 50) {
      mostrarError("nombre", "Máximo 50 caracteres.");
    } else {
      mostrarError("nombre", "");
    }
  });

  campoApellidos.addEventListener("blur", () => {
    if (campoApellidos.value.trim() === "") {
      mostrarError("apellidos", "Los apellidos son obligatorios.");
    } else if (campoApellidos.value.length > 100) {
      mostrarError("apellidos", "Máximo 100 caracteres.");
    } else {
      mostrarError("apellidos", "");
    }
  });

  campoCorreo.addEventListener("blur", () => {
    const resultado = validarCorreo(campoCorreo.value);
    mostrarError("correo", resultado.mensaje);
  });

  campoPassword.addEventListener("blur", () => {
    if (campoPassword.value.length < 4 || campoPassword.value.length > 10) {
      mostrarError("password", "La contraseña debe tener entre 4 y 10 caracteres.");
    } else {
      mostrarError("password", "");
    }
  });

  campoPasswordConfirm.addEventListener("blur", () => {
    if (campoPasswordConfirm.value !== campoPassword.value) {
      mostrarError("password-confirm", "Las contraseñas no coinciden.");
    } else {
      mostrarError("password-confirm", "");
    }
  });

  campoRegion.addEventListener("change", () => {
    mostrarError("region", campoRegion.value === "" ? "Seleccione una región." : "");
  });

  campoComuna.addEventListener("change", () => {
    mostrarError("comuna", campoComuna.value === "" ? "Seleccione una comuna." : "");
  });

  campoDireccion.addEventListener("blur", () => {
    if (campoDireccion.value.trim() === "") {
      mostrarError("direccion", "La dirección es obligatoria.");
    } else if (campoDireccion.value.length > 300) {
      mostrarError("direccion", "Máximo 300 caracteres.");
    } else {
      mostrarError("direccion", "");
    }
  });

  // Enviar formulario
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const validaciones = [
      validarRun(campoRun.value).valido,
      campoNombre.value.trim() !== "" && campoNombre.value.length <= 50,
      campoApellidos.value.trim() !== "" && campoApellidos.value.length <= 100,
      validarCorreo(campoCorreo.value).valido,
      campoPassword.value.length >= 4 && campoPassword.value.length <= 10,
      campoPasswordConfirm.value === campoPassword.value,
      campoRegion.value !== "",
      campoComuna.value !== "",
      campoDireccion.value.trim() !== "" && campoDireccion.value.length <= 300
    ];

    // Errorer
    [campoRun, campoNombre, campoApellidos, campoCorreo, campoPassword, campoPasswordConfirm, campoDireccion]
      .forEach(campo => campo.dispatchEvent(new Event("blur")));
    campoRegion.dispatchEvent(new Event("change"));
    campoComuna.dispatchEvent(new Event("change"));

    const formularioValido = validaciones.every(v => v === true);
    const mensajeExito = document.getElementById("registro-exito");

    if (formularioValido) {
      mensajeExito.textContent = "¡Registro exitoso! Bienvenido/a a Sonido Vivo.";
      mensajeExito.classList.add("exito");
      formulario.reset();
      cargarComunas(); 
    } else {
      mensajeExito.textContent = "Por favor corrige los errores marcados antes de continuar.";
      mensajeExito.classList.remove("exito");
    }
  });
}

//Login
function validacionLogin(){
    const formulario = document.getElementById(form-login);
    if(!formulario) return;

    const valorCorreo = document.getElementById("correo");
    const valorPassword = document.getElementById("password");

    valorCorreo.addEventListener("blur", () => {
        const resultado = validarCorreo(valorCorreo.value);
        mostrarError("correo", resultado.mensaje);
    });

    valorPassword.addEventListener("blur", () => {
        if(valorPassword.value.length < 4 || valorPassword.value.length > 10){
            mostrarError("password", "LA CONSTRASEÑA ENTRE 4 Y 10 CARACTERES")
        }else{
            mostrarError("password", "");
        }
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        valorCorreo.dispatchEvent(new Event("blur"));
        valorPassword.dispatchEvent(new Event("blur"));

        const correoValido = validarCorreo(valorCorreo.value).valido;
        const contraseñaValida = valorPassword.value.length >= 4 && valorPassword.valorPassword.length <= 10;
    
        const mensajeExito = document.getElementById("login-exito");

        if(correoValido && contraseñaValida){
            mensajeExito.textContent = "¡Inicio de sesion Exitoso!"
            mensajeExito.classList.add("exito");
        }else{
            mensajeExito.textContent = "Correo o Contraseña invlida"
            mensajeExito.classList.remove("exito");
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        validacionRegistro();
        validacionLogin();
    })
}