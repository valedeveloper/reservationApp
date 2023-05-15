import mongoose from "mongoose";
const { Schema } = mongoose;

//Los esquemas sirven para darle la estructura, tipo de datos que tendrà nuestro documento y ser añadida en la base de ddatos.
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true, //Esta opciòn entra como paràmetro del Schema
  }
);

const modelUser = mongoose.model("User", userSchema);

export default modelUser;
