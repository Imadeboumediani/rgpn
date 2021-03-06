
var express = require('express');
var path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var neo4j = require('neo4j-driver');
const { response } = require('express');
var driver = neo4j.driver('bolt://obiwan2.univ-brest.fr:7687', neo4j.auth.basic('neo4j', 'neo4j/'),
	{ disableLosslessIntegers: true });
const session = driver.session();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '1mb' }));

app.get('/nom', function (req, res) {
	session
		.run('MATCH (MC7UF1:UF) WHERE MC7UF1.idenseignant = 1 RETURN MC7UF1')
		.then(function (result) {
			var estArray = [];
			result.records.forEach(function (record) {
				estArray.push({
					id: record._fields[0].properties.id,
					nom: record._fields[0].properties.nom,
					idenseignant: record._fields[0].properties.idenseignant
				})
				console.log(record);
			});

			res.send(estArray);

		})
		.catch(function (err) {
			console.log(err);
		});

});

app.get('/mf', async function (req, res) {
	var estArray2 = [];
	var estArray3 = [];
	var estArray = [];
	session
		.run('MATCH (MC7MDL:MODULE) WHERE MC7MDL.idenseignant = 1 return *')
		.then(async function (result) {
			
			result.records.forEach(async function (record) {
				estArray.push({
					id: record._fields[0].properties.id,
					nom: record._fields[0].properties.nom,
					idenseignant: record._fields[0].properties.idenseignant
				})
				console.log(record);
			});
			for (let i = 0; i < estArray.length; i++) {

				let session2 = driver.session();
				let requete2 = 'MATCH (MODULE {nom: "' + estArray[i].nom + '"})-[MCRELATION:MC7CONTIENT]->(MC7UF:UF) return MC7UF ';
				console.log(requete2);
				await session2
					.run(requete2)
					.then(function (result) {
						
						result.records.forEach(function (record) {
							estArray3.push({
								id: record._fields[0].properties.id,
								nom: record._fields[0].properties.nom,
								idenseignant: record._fields[0].properties.idenseignant
							})
							console.log(record);
						});

						
				estArray2.push(estArray3);
					})
				estArray3=[];
				console.log('+')
			}
			res.json({
				estArray2: estArray2,
				estArray: estArray,
			})
		
			

		})
		.catch(function (err) {
			console.log(err);
		});


});




app.post('/ajouter', async (req, resp) => {
	console.log('hello');
	console.log(req.body.nom);
	console.log(req.body.up.length);

	var requete1 = 'CREATE (MC7MDL:MODULE {  idenseignant: 1 ,nom: "' + req.body.nom + '"}) ';
	console.log(requete1);
	const session1 = driver.session();
	await session1
		.run(requete1)
		.then(result => {
			result.records.forEach(record => {
				console.log(record.get('MC7MDL'))
			})
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session1.close())
	for (let i = 0; i < req.body.up.length; i++) {

		let session2 = driver.session();
		let requete2 = 'MATCH (MC7MDL:MODULE) WHERE MC7MDL.nom = "' + req.body.nom + '"  MATCH (MC7UF:UF) WHERE MC7UF.nom = "' + req.body.up[i] + '"  CREATE (MC7MDL)-[MCRELATION:MC7CONTIENT]->(MC7UF)  return MCRELATION ';
		console.log(requete2);
		await session2
			.run(requete2)
			.then(result => {
				result.records.forEach(record => {
					console.log(record.get('MCRELATION'))
				})
			})
			.catch(error => {
				console.log(error)
			})
			.then(() => session2.close())
		requete2 = '';

	}
	resp.json({
		status: 'success',
		message: 'l\'ajout a été realisé avec succes',
	})

	resp.end();
});

app.get('/url', function (req, res) {
	session
		.run('MATCH(MC7URL:URL) RETURN *')
		.then(function (result) {
			var estArray = [];
			result.records.forEach(function (record) {
				estArray.push({
					lien: record._fields[0].properties.lien,
				})
				console.log(record._fields[0].properties.lien);
			});

			res.send(estArray);

		})
		.catch(function (err) {
			console.log(err);
		});

});

app.post('/AssocierUrl&Cd', async (req, resp) => {
	console.log('hello');
	console.log(req.body.nom);
	console.log(req.body.urls.length);

	var requete1 = 'CREATE (MC7UF:UF {  idenseignant: 1 ,nom: "' + req.body.nom + '"}) ';
	console.log(requete1);
	const session3 = driver.session();
	await session3
		.run(requete1)
		.then(result => {
			result.records.forEach(record => {
				console.log(record.get('MC7MDL'))
			})
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session3.close())
	for (let i = 0; i < req.body.urls.length; i++) {

		let session4 = driver.session();
		let requete2 = 'MATCH (MC7UF:UF) WHERE MC7UF.nom = "' + req.body.nom + '"  MATCH (MC7URL:URL) WHERE MC7URL.lien = "' + req.body.urls[i] + '"  CREATE (MC7UF)-[MCRELATION:MC7LIEE]->(MC7URL)  return MCRELATION ';
		console.log(requete2);
		await session4
			.run(requete2)
			.then(result => {
				result.records.forEach(record => {
					console.log(record.get('MCRELATION'))
				})
			})
			.catch(error => {
				console.log(error)
			})
			.then(() => session4.close())
		requete2 = '';

	}

	for (let i = 0; i < req.body.tabCd.length; i++) {

		let session6 = driver.session();
		let requete6 = 'MATCH (MC7UF:UF) WHERE MC7UF.nom = "' + req.body.nom + '"  MATCH (MC7CD:CD) WHERE MC7CD.description = "' + req.body.tabCd[i].description + '"  CREATE (MC7UF)-[MCRELATION:MC7ESTDECRITE]->(MC7CD)  return MCRELATION ';
		console.log(requete6);
		await session6
			.run(requete6)
			.then(result => {
				result.records.forEach(record => {
					console.log(record.get('MCRELATION'))
				})
			})
			.catch(error => {
				console.log(error)
			})
			.then(() => session6.close())
		requete6 = '';

	}

	resp.json({
		status: 'success',
		message: 'l\'ajout a été realisé avec succes',
	})

	resp.end();
});


app.post('/AjouterUrl', async (req, resp) => {
	console.log('hello');
	console.log(req.body.nomUrl);


	var requete1 = 'CREATE (MC7URL:URL {	id: 1, lien:"' + req.body.nomUrl + '" })';
	console.log(requete1);
	const session4 = driver.session();
	await session4
		.run(requete1)
		.then(result => {
			result.records.forEach(record => {
				console.log(record.get('MC7URL'))
			})
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session4.close())

	resp.json({
		status: 'success',
		message: 'l\'ajout a été realisé avec succes',
	})
	resp.end();
});





app.post('/cherchercd', async (req, resp) => {
	console.log('hello');
	console.log(req.body.keyword);


	var requete1 = 'MATCH (MC7CD:CD) where MC7CD.description contains "' + req.body.keyword + '" return MC7CD ';
	console.log(requete1);
	var estArray = [];
	const session5 = driver.session();
	await session5
		.run(requete1)
		.then(result => {

			result.records.forEach(record => {
				console.log(record._fields[0].properties.description)
				estArray.push({
					description: record._fields[0].properties.description,

				})
			})
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session5.close())
	console.log(estArray);
	resp.json({
		status: 'success',
		message: 'voici le résultat de votre recherche',
		tabCd: estArray,
	})

	resp.end();
});










app.listen(7552);
console.log('Server Started on Port 7552');
module.exports = app;

