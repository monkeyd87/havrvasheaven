const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/seeddsdb',{
    
})

module.exports = mongoose.connection

