require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents')
const errorHandler  = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// connect mongo db
connectDB();

// custom MIDDLEWARE logger 
app.use(logger);

// add middle ware for CORS: Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Adding built-in MIDDLEWARE to handle url encoded data
// in other words form data
// 'contentType - application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Adding built-in MIDDLEWARE to json data
app.use(express.json());

// middle ware for cookie-parser
app.use(cookieParser());

// server static files
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employee'));

app.all('*', (req, res) => {
	res.status(404);
	if(req.accepts('html')){
		res.sendFile(path.join(__dirname, 'views' , '404.html'));
	}else if(req.accepts('json')){
		res.json({error: '404 Not Found'});
	}else{
		res.type('txt').send('404 Not Found');
	}
});

// middle ware for error handling for 500
app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Application running on port ${PORT} `));	
});

