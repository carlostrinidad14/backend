const socketClient = io();

const tituloUsuario = document.getElementById("usuario");
const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const divChat = document.getElementById("chat");

let user;

// ingreso al chat - colocar el usuario
Swal.fire({
  title: "BIENVENIDO",
  text: "Ingresa tu usuario",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas ingresar un usuario";
    }
  },
}).then((username) => {
  user = username.value;
  tituloUsuario.innerText = `Hola ${user}`;
  // evento del username ingresado
  socketClient.emit("usuarioNuevo", user);
  inputMensaje.value = "";
});

// mensajes
formulario.onsubmit = async (e) => {
  e.preventDefault();
  const info = {
    user: user,
    message: inputMensaje.value,
  };
  socketClient.emit("mensaje", info);
};

// chat
socketClient.on("chat", (message) => {
  const chatParrafo = message
    .map((obj) => {
      return `<p>${obj.user}: ${obj.message}</p>`;
    })
    .join(" ");

  divChat.innerHTML = chatParrafo;
});

// notificacion usuario nuevo conectado
socketClient.on("broadcast", (usuario) => {
  Toastify({
    text: `${usuario} conectado al chat`,
    duration: 5000,
    position: "right", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});
