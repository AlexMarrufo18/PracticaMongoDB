const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const HistoriaClinicaSchema = Schema({
    servicio: {
        type: String,
        required: true
    },
    medico: {
        type: String
    },
    costo: {
        type: Number
    },
    modalidadPago: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    }

}, { collection: 'historiaClinica' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb
// sino asignamos un nombre mongodb creara la coleccion asignandole una s al final


HistoriaClinicaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('HistoriaClinica', HistoriaClinicaSchema);