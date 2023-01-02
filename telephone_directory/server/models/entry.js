import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: { type: String, required: true, minLength: 8 },
});

entrySchema.plugin(uniqueValidator);

// Una forma de formatear los objetos devueltos por Mongoose es modificar el método toJSON del esquema, que se utiliza en todas las instancias de los modelos producidos con ese esquema. La modificación del método funciona así:

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
