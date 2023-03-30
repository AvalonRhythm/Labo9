var express = require("express");
// Concatenar paths
var path = require("path"); 
// Modulo para realizas validaciones en formularios
const { check, validationResult } = require('express-validator');
// Modulo para conectar con una base de datos MongoDB
const mongojs = require('mongojs')
// Objeto exportado de mongojs para identificar un elemento de una tabla de una BD
var ObjectId = mongojs.ObjectId;

// Conexion con la base de datos: nombre de la BD y de la tabla
const db = mongojs('clientesapp', ['users'])

app = express();

// Middleware que carga ficheros estaticos de un directorio (public en este caso).
// Es decir, podemos cargar los elementos que haya en public/
app.use(express.static(path.join(__dirname, "public")));

// View Engine 
app.set('view engine', 'ejs'); // motor de plantillas
app.set('views', path.join(__dirname, "views")); // carpeta donde guardar las vistas

// Middleware para el parseo de req.body
app.use(express.json()); // coge los datos en crudo y los pasa a json

// Que parsee datos que lleguen en la query HTTP y los deje como un objeto JSON 
app.use(express.urlencoded({extended: false})); 

// Declaracion y definicion de variables globales: en este caso errors
app.use(function (req, res, next) {
	res.locals.errors = null;
	next();
 });



app.post('/users/add', [
	check("first_name", "El nombre es obligatorio").notEmpty(),
	check("last_name", "El apellido es obligatorio").notEmpty(),
	check("email", "El email es obligatorio").notEmpty()
],
function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.render('index', {
			title:'clientes',
			users: users,
			errors: errors.array()
		});
	} else if(document.getElementById("form").elements["submit"].value == "Enviar"){
		var newUser = {
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
			"email" : req.body.email,
		};
		db.users.insertOne(newUser, function(err, resp) {
			if(err) {
				console.log(err);
			} else {
				db.users.insertOne(newUser);
			}
			res.redirect('/');
		});
		console.log(newUser)
	} else if(document.getElementById("form").elements["submit"].value == "Editar"){
		/*
		consulta.send();

		var newUser = {
			"first_name" : req.body.first_name,
			"last_name" : req.body.last_name,
			"email" : req.body.email,
		};
		db.users.insertOne(newUser, function(err, resp) {
			if(err) {
				console.log(err);
			} else {
				db.users.insertOne(newUser);
			}
			res.redirect('/');
		});
		console.log(newUser)
		*/
	}
});

app.delete('/users/delete/:id', function(req, res) {
	db.users.remove({_id: ObjectId(req.params.id)}, function(err, result) {
		if(err) {
			console.log(err);
		}
		res.redirect(303, '/');
	});
});


app.get("/users/edit/:id", function(req, res) { // peticion y respuesta como parametros

	db.users.find({_id: ObjectId(req.params.id)}, function(err, docs) {
		if(err) {
			console.log(err);
		}
		res.send(docs)
		});
});

app.get("/", function(req, res) { // peticion y respuesta como parametros
    db.users.find(function(err, docs) {
    	if(err) {
    		console.log(err);
    	} else {
    		console.log(docs);
    		// para rellenar la plantilla
    		res.render('index', {
			title: 'clientes',
			users: docs
    		});
    	}
    });
    
});
    
app.listen(3000, function(){ // a la escucha en el puerto 3000
	console.log("Servidor lanzado en el puerto 3000");
});
