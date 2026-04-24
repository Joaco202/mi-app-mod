var express = require('express');
var mysql = require('mysql');

const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var cors = require('cors');

var app = express();

app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'acme'
});

conn.connect();

app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM productos WHERE productId=?';
    conn.query(sql, [id], (err, results)=>{
        if (err) throw err;
        res.status(200).json({
            ok: true,
            productos: results
        });
    });
});

//Endpoints
app.get('/', (req, res, next) =>{
    res.status(200).json({
        ok: true,
        mensaje: "Peticion realizada correctamente"
    })
});

app.listen(3000, ()=>{
    console.log('Puerto 3000 funcionando');
})

app.post('/productos', (req, res) => {
    // 1. Asegúrate de que los nombres coincidan con Postman (rating)
    const { name, code, date, price, description, rating, image } = req.body;

    const sql = `INSERT INTO productos 
                (productName, productCode, releaseDate, price, description, starRating, imageUrl) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // 2. Maneja el error correctamente con res.status(500) en lugar de throw
    conn.query(sql, [name, code, date, price, description, rating, image], (err, result) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            return res.status(500).json({
                ok: false,
                mensaje: "Error al insertar el producto",
                error: err.message
            });
        }
        
        res.status(201).json({
            ok: true,
            mensaje: "Producto añadido correctamente"
        });
    });
});

app.put('/uploads/productos/:id', (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha seleccionado ningun archivo, tonoto'
        });
    }

    const file = req.files.image;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if(!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            mensaje: "Tipo de archivo no permitido"
        });
    }

    const productId = req.params.id;
    const fileName = `${productId}-${new Date().getMilliseconds()}.${fileExtension}`;
    const uploadPath = __dirname + '/uploads/productos/' + fileName;

    console.log(uploadPath);

    file.mv(uploadPath, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al subir archivo',
                error: err
            })
        }

        const sql = 'UPDATE products SET imageUrl = ? WHERE productId = ?';
        conn.query(sql, [uploadPath, productId], (err, result) => {
            if (err) throw err;
            res.status(200).json({
                ok: true,
                mensaje: "archivo subido"
            })
        })
    });
});

app.delete('/productos/:id', (req, res) => {
    const sql = 'DELETE FROM productos WHERE productId = ?';
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            mensaje: "Producto eliminado correctamente"
        });
    });
});

app.put('/productos/:id', (req, res) => {
    const { name, code, date, price, description, rate } = req.body;
    const sql = `UPDATE productos SET 
                productName = ?, 
                productCode = ?, 
                releaseDate = ?, 
                price = ?, 
                description = ?, 
                starRating = ? 
                WHERE productId = ?`;
    
    conn .query(sql, [name, code, date, parseInt(price), description, rate, req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            mensaje: "Producto actualizado correctamente"
        });
    });
});