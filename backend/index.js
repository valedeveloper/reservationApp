import express from "express";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/users.js"
import hotelRouter from "./routes/hotels.js"
import roomRouter from './routes/rooms.js';
const app = express();


app.use(express.json()) //Lo que recibe es json
dotenv.config(); //Permitir tener acceso a la carpeta de variables de entorno (.env)


const PORT = 8800;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Estoy conectado a mongo")
  } catch (error) {
    throw error;
  }
};

//El on es para escuchar eventos, entra por paràmetro el evento y el callback que se ejecutará cuando ocurre ese evento. 
//En este caso el desconcetado y conectado
//Con mongoose, "conection", permite tener estos eventos con la palabra "on"
mongoose.connection.on("disconnected",()=>{
    console.log("Mongo se ha desconectado")
})




app.get("/",(req,res)=>{ 
  res.send("Hola, estoy en el home")
})

//El use dice: "utiliza este endpoint como base" y el router de ese endpoint
//IMPORTANTE: colocar el slash al pricipio

//Endpoints de mi app
app.use("/api/user",userRouter)
app.use("/api/hotel",hotelRouter)
app.use("/api/room",roomRouter)



app.listen(PORT, () => {
  connect();
  console.log(`Hola, estoy escuchando en el puerto:${PORT}`);
});
