import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

// Una forma de formatear los objetos devueltos por Mongoose es modificar el método toJSON del esquema, que se utiliza en todas las instancias de los modelos producidos con ese esquema. La modificación del método funciona así:

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
