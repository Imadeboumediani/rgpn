var express = require('express');
var path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var neo4j = require('neo4j-driver'); 
var driver = neo4j.driver('bolt://obiwan2.univ-brest.fr:7687', neo4j.auth.basic('neo4j', 'neo4j/'),
{ disableLosslessIntegers: true });
const session = driver.session();
app.use(cors());

app.set('views', path.join(__dirname,'views'));
app.set('views engine','ejs');

app.get('/nom', function(req, res){
	session
		.run('MATCH (MC7UF1:UF) WHERE MC7UF1.idenseignant = 1 RETURN MC7UF1')
		.then(function(result){
			var estArray= [];
			result.records.forEach(function(record){
				estArray.push({
					id : record._fields[0].properties.id,
					nom : record._fields[0].properties.nom,
					idenseignant : record._fields[0].properties.idenseignant
				})
				console.log(record);
			});
		
			res.send(estArray);
		
		})
		.catch(function(err){
			console.log(err);
		});
	
});
var str = "http://localhost:7552/post/?nom=fdsf&mf0=Fran%C3%A7ais&mf1=Anglais";
var url = new URL(str);
var search_params = new URLSearchParams(url.search);
if(search_params.has('nom')) {
	var name = search_params.get('nom');
	console.log(name)
  }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(7552);
console.log('Server Started on Port 7552');
module.exports = app;

