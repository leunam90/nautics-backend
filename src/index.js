const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


//settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Routes
app.use('/employees', require('./routes/employees'));
app.use('/roles', require('./routes/roles'));
app.use('/login', require('./routes/login'));
app.use('/projects', require('./routes/projects'));
//app.use(require('./routes/index'));


//static files
console.log(__dirname);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})