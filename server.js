console.log('SOL INVICTUS');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient




MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('my_restaurant_database_test')
        const ordersCollection = db.collection('my_restaurant_orders')
        let fotos = ['../public/images/menu/saladaAntipasto.png'];
        //middlewares

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use('/public', express.static('public'));
        //routes
        app.listen(3000, function () {
            console.log('listening on 3000')
        })

        app.get('/orders', (req, res) => {
            db.collection('my_restaurant_orders').find().toArray()
                .then(results => {
                    res.render('orders.ejs', { orders: results })
                    console.log(results)
                })
                .catch(error => console.error(error))
            //res.sendFile(__dirname + '/index.html')
        })
        app.get('/', (req, res) => {
            db.collection('my_restaurant_collection').find().toArray()
                .then(results => {
                    res.render('index.ejs', { menu: results })
                    console.log(results)
                })
                .catch(error => console.error(error))
            //res.sendFile(__dirname + '/index.html')
        })
        app.get('/menu', (req, res) => {
            db.collection('my_restaurant_collection').find().toArray()
                .then(results => {
                    res.render('menu.ejs', { menu: results })
                    console.log(results)
                })
                .catch(error => console.error(error))
            //res.sendFile(__dirname + '/index.html')
        })
        app.post('/orders', (req, res) => {
            let pedido = {}
            pedido.mesa = req.body.mesa;
            let pratos = [];
            let precos = [];
            let quantidades = [];
            let totalPratos = [];

            if (!(req.body.saladaAntipasto <= 0 || req.body.saladaAntipasto == null || req.body.saladaAntipasto == undefined)) {
                pratos.push("Salada de Antipasto");
                quantidades.push(parseInt(req.body.saladaAntipasto));
                precos.push(38);
                let total01 = 38 * parseInt(req.body.saladaAntipasto);
                totalPratos.push(total01);
            }
            if (!(req.body.saladaEspecial <= 0 || req.body.saladaEspecial == null || req.body.saladaEspecial == undefined)) {
                pratos.push("Salada Especial");
                quantidades.push(parseInt(req.body.saladaEspecial));
                precos.push(49);
                let total02 = 49 * parseInt(req.body.saladaEspecial);
                totalPratos.push(total02);
            }
            if (!(req.body.file <= 0 || req.body.file == null || req.body.file == undefined)) {
                pratos.push("Filé Mignon");
                quantidades.push(parseInt(req.body.file));
                precos.push(112);
                let total03 = 112 * parseInt(req.body.file);
                totalPratos.push(total03);
            }
            if (!(req.body.lasanha <= 0 || req.body.lasanha == null || req.body.lasanha == undefined)) {
                pratos.push("Lasagna");
                quantidades.push(parseInt(req.body.lasanha));
                precos.push(54);
                let total04 = 54 * parseInt(req.body.lasanha);
                totalPratos.push(total04);
            }
            if (!(req.body.spaghetti <= 0 || req.body.spaghetti == null || req.body.spaghetti == undefined)) {
                pratos.push("Spaghetti");
                quantidades.push(parseInt(req.body.spaghetti));
                precos.push(46);
                let total05 = 46 * parseInt(req.body.spaghetti);
                totalPratos.push(total05);
            }
            if (!(req.body.risotoOssobuco <= 0 || req.body.risotoOssobuco == null || req.body.risotoOssobuco == undefined)) {
                pratos.push("Risoto Milanês Ossobuco");
                quantidades.push(parseInt(req.body.risotoOssobuco));
                precos.push(65);
                let total06 = 65 * parseInt(req.body.risotoOssobuco);
                totalPratos.push(total06);
            }
            if (!(req.body.risotoBacalhau <= 0 || req.body.risotoBacalhau == null || req.body.risotoBacalhau == undefined)) {
                pratos.push("Risoto Bacalhau");
                quantidades.push(parseInt(req.body.risotoBacalhau));
                precos.push(68);
                let total07 = 68 * parseInt(req.body.risotoBacalhau);
                totalPratos.push(total07);
            }
            if (!(req.body.agua <= 0 || req.body.agua == null || req.body.agua == undefined)) {
                pratos.push("Água sem gás");
                quantidades.push(parseInt(req.body.agua));
                precos.push(5);
                let total08 = 5 * parseInt(req.body.agua);
                totalPratos.push(total08);
            }
            if (!(req.body.vinho <= 0 || req.body.vinho == null || req.body.vinho == undefined)) {
                pratos.push("Vinho Naturelle Rose Casa Valduga");
                quantidades.push(parseInt(req.body.vinho));
                precos.push(76);
                let total09 = 76 * parseInt(req.body.vinho);
                totalPratos.push(total09);
            }
            if (!(req.body.suco < 0 || req.body.suco == null || req.body.suco == undefined)) {
                pratos.push("Suco");
                quantidades.push(parseInt(req.body.suco));
                precos.push(7);
                let total = 7 * parseInt(req.body.suco);
                totalPratos.push(total);
            }
            pedido.prato = pratos;
            pedido.preco = precos;
            pedido.quantidade = quantidades;
            let soma = 0;
            for (let i = 0; i < totalPratos.length; i++) {
                soma = soma + totalPratos[i];
            }
            pedido.totalMesa = soma;

            ordersCollection.insertOne(pedido)
                .then(result => {
                    res.redirect('/orders')
                    console.log(result)
                })
                .catch(error => console.error(error))

        })
        app.post('/cardapio', (req, res) => {
            res.redirect('/menu')
        })
        app.post('/pedidos', (req, res) => {
            res.redirect('/orders')
        })
        app.post('/voltar', (req, res) => {
            res.redirect('/')
        })
    })
    .catch(error => console.error(error))


