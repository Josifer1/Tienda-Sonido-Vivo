function validar(run){

    run = run.toUpperCase();

    if(run.length < 7 || run.length > 9){
        return {valido: false, mensaje: "El RUN debe tener entre 7 y 9 caracteres."};
    }
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    if(!/^\d+$/.test(cuerpo)){
        return {valido: false, mensaje: "El RUN debe contener solo números y el número dígito verificador"};
    }

    let suma = 0;
    let multiplo = 2;
    for(let i = cuerpo.length - 1; i >= 0; i--){
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const resto = 11 - (suma % 11);
    let dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

    if(dv !== dvEsperado){
        return {valido: false, mensaje: "El RUN ingresado es invalido, Dígito verificador incorrecto"};   
    }
    return {valido: true, mensaje:""};   
}

function validarCorreo(correo) {
    correo = correo.trim();
    const dominiosPermitidos = ["@duocuc.cl", "@profesor.duocuc.cl", "@gmail.com"];

    if(correo.length === 0){
        return {valido: false, mensaje: "El correo es obligatorio"};
    }
    if(correo.length > 100){
        return {valido: false, mensaje: "El correo no puede superar los 100 caracteres"}
    }
    
    const dominioValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));

    if(!dominioValido){
        return{valido: false, mensaje: "Solo se aceptan correos con  @duocuc.cl, @profesor.duocuc.cl y @gmail.com"};
    }
    return {valido: true, mensaje: ""}
}

function inicializarValidacionRegistro(){
    const formulario = document.getElementById("form-registro")
    if(!formulario) return;
    
    const run = document.getElementById("run");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellidos");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const direccion = document.getElementById("direccion");
}

formulario.addEventListener("submit", (evento) =>{

    evento.preventDefault();

    const validaciones = [
        validarRun(run.value).valido, nombre.value.trim() !== "" && nombre.value.length <= 50, apellido.value.trim()
        !== "" && apellido.value.length <= 100, validarCorreo(correo.value).valido, password.value.length >= 4 && 
        password.value.length <= 10, passwordConfirm.value === password.value, region.value !== "", comuna.value !== "",
        direccion.value.trim() !== "" && direccion.value.length <= 300
    ];

    [run, nombre, apellido, correo, password, passwordConfirm, direccion]

    .forEach(campo => campo.dispatchEvent(new Event("blur")));
    comuna.dispatchEvent(new Event("change"));
    region.dispatchEvent(new Event("change"));

    const formularioValido = validaciones.every(v => v === true);
    const mensajeExito = document.getElementById("registro-exito");

    if(formularioValido){

        mensajeExito.textContent = "¡Registro Exitoso!";
        mensajeExito.classList.add("exito");

        formulario.reset();

        //cargarComunas();
    }else{
        mensajeExito.textContent = "Error, corrigir los error marcador antes de continuar";
        mensajeExito.classList.remove("exito");
    }
});

document.addEventListener("DOMContentLoaded", inicializarValidacionRegistro);