import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";




const taskSchema = new Schema({
    nombres: {type: String, trim: true},
    apellidos: {type: String, trim: true},
    correo:{ type: String, require: true, unique: true, trim: true },
    telefono: {type: String, trim: true},
    contraseña: { type: String, require: true },
    auto: String

}, 
{
    timestamps: true,
    versionKey: false

}
);

taskSchema.methods.encryptPassword = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contraseña, salt);
};
  
taskSchema.methods.matchPassword = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};



export default model('Task', taskSchema);