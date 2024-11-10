const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://0.0.0.0/formcontrol').then(() => {
    console.log('connected to data base')
})

module.exports = connection