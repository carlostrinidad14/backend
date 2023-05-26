import express from "express";
import config from "./config.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
//import ProductManager from "./DAL/dao/productManagerFS.js";
import ProductManager from "./DAL/dao/productManagerMongo.js";
import "./DAL/dao/dbConfig.js";
import { messagesModel } from "./DAL/dao/models/messages.model.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";
import usersRouter from "./routes/users.router.js";
import "./passport/passportStrategies.js";
import passport from "passport";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

//handlebars
// Configurar Handlebars
const hbs = handlebars.create({
  // Opciones de Handlebars
  defaultLayout: "main",
  extname: ".handlebars",
  // Opción para deshabilitar la comprobación de propiedad prototipo
  // en tiempo de ejecución
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// mongo session
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl:
        "mongodb+srv://carlostrinidad:coderHouse2023@cluster0.n3qmyw6.mongodb.net/ecommerce?retryWrites=true&w=majority",
    }),
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use("/views", viewsRouter);

app.use("/users", usersRouter);

const PORT = config.port;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto  ${PORT}`);
});

//Socket

const socketServer = new Server(httpServer);
const productManager = new ProductManager(__dirname + "/data.json");

// obtener los productos del archivo data.json
let products = await productManager.getProducts();

// Escuchar conexiones
socketServer.on("connection", (socketClient) => {
  console.log(`Un cliente se ha conectado ${socketClient.id}`);
  socketClient.emit("message0", "Bienvenido! estas conectado con el servidor");
  socketClient.broadcast.emit(
    "message1",
    `Un nuevo cliente se ha conectado con id: ${socketClient.id}`
  );

  //crear producto en base a los datos del form en la vista real time
  socketClient.on("createProduct", async (product) => {
    const productsPush = products;
    productsPush.push(product);

    socketServer.emit("product-list", productsPush);

    socketClient.emit(
      "message3",
      `El cliente con id: ${socketClient.id} ha creado un producto nuevo`
    );

    await productManager.addProduct(product);
  });

  //elimina producto en real time
  socketClient.on("deleteProduct", async (id) => {
    products = await productManager.getProducts();
    const _id = id._id;
    const productsPush = products.filter((product) => product._id != _id);

    socketServer.emit("product-list", productsPush);

    socketClient.broadcast.emit(
      "message4",
      `El cliente con id: ${socketClient.id} ha eliminado un producto con id: ${_id}`
    );

    await productManager.deleteProduct(_id);
  });

  // socket de chat
  const infoMensajes = [];
  socketClient.on("mensaje", async (info) => {
    infoMensajes.push(info);
    // Guardar el mensaje en la base de datos
    const nuevoMensaje = new messagesModel(info);
    try {
      await nuevoMensaje.save();
      console.log("Mensaje guardado en la base de datos");
    } catch (error) {
      console.error("Error al guardar el mensaje en la base de datos", error);
    }

    socketServer.emit("chat", infoMensajes);
  });

  socketClient.on("usuarioNuevo", (usuario) => {
    socketClient.broadcast.emit("broadcast", usuario);
  });

  //esucha desconexiones
  socketClient.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");

    socketServer.emit(
      "message2",
      `Un cliente se ha desconectado con id: ${socketClient.id}`
    );
  });
});
