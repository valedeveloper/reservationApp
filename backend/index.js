import express from "express";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import hotelRouter from "./routes/hotels.js";
import roomRouter from "./routes/rooms.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();
 app.use(cors())
app.use(express.json()); //Lo que recibe es json
app.use(cookieParser()) //Para utilizar cookie parser desde nuetra app
dotenv.config(); //Permitir tener acceso a la carpeta de variables de entorno (.env)

const PORT = 8800;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Estoy conectado a mongo");
  } catch (error) {
    throw error;
  }
};

//El on es para escuchar eventos, entra por paràmetro el evento y el callback que se ejecutará cuando ocurre ese evento.
//En este caso el desconcetado y conectado
//Con mongoose, "conection", permite tener estos eventos con la palabra "on"
mongoose.connection.on("disconnected", () => {
  console.log("Mongo se ha desconectado");
});

app.get("/", (req, res) => {
  res.send("Hola, estoy en el home");
});

//El use dice: "utiliza este endpoint como base" y el router de ese endpoint
//IMPORTANTE: colocar el slash al pricipio

//Endpoints de mi app
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/auth", authRouter);


//Este es un midlware. Està capturando los errores que se pueden dar dentro de mis routes. Cuando hay un error, coloco next() y se ejecutarà este midlware
app.use((err, req, res, next) => {
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Hay un error y lo he capturado"
  res.json({errorStatus,errorMessage})
});

app.listen(PORT, () => {
  connect();
  console.log(`Hola, estoy escuchando en el puerto:${PORT}`);
});
