const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect('mongodb+srv://Roger:VHIYlZqexcqhpYmt@cluster0.htsgd.mongodb.net/hospitaldb');
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Erro a la hora de iniciar la BD ver logs')
    }
}

module.exports = {
    dbConnection
}