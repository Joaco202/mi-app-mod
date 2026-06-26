const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(__dirname, '.env.dev');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = match[2] || '';
                if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
                    value = value.substring(1, value.length - 1);
                } else if (value.length > 0 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
                    value = value.substring(1, value.length - 1);
                }
                process.env[key] = value.trim();
            }
        });
    }
} catch (e) {
    console.error('Error loading .env.dev file:', e);
}

const nodemailer = require("nodemailer");
const { google } = require('googleapis');

const EMAIL_CLIENT_ID = process.env.EMAIL_CLIENT_ID;
const EMAIL_CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
const EMAIL_REDIRECT_URI = process.env.EMAIL_REDIRECT_URI;
const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_REDIRECT_URI
);

var express = require('express');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
let SEED = "esta-es-una-semilla-para-generar-el-token";

const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var cors = require('cors');
const bcrypt = require('bcrypt');

var app = express();

app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    if (req.path === '/login' || req.path === '/google-login' || req.path === '/email-test') {
        return next(); // Skip token verification for these public routes
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no proporcionado'
        });
    }

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no válido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'acme'
});

conn.connect((err) => {
    if (err) {
        console.error("Could not connect to MySQL database. Server will run in offline/mock mode.", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

conn.on('error', (err) => {
    console.error("Database error:", err);
});

app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM productos WHERE productId=?';
    conn.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            productos: results
        });
    });
});

app.get('/existeproducto/:code', (req, res) => {
    const sql = 'SELECT * FROM productos WHERE productCode = ?';
    conn.query(sql, [req.params.code], (err, results) => {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            data: results[0],
            existe: results.length > 0
        });
    });
});

//Endpoints
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: "Peticion realizada correctamente"
    })
});

app.listen(3000, () => {
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

app.post('/usuarios', (req, res) => {
    const { name, email, img, role } = req.body;
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const sql = `INSERT INTO usuarios (userName, userEmail, userPassword, userImg, userRole) 
                VALUES (?, ?, ?, ?, ?)`;
    conn.query(sql, [name, email, hashedPassword, img, role], (err, result) => {
        if (err) throw err;
        res.status(201).json({
            ok: true,
            mensaje: 'Usuario registrado correctamente'
        });
    });
});

app.post('/login', (req, res) => {
    const { email } = req.body;

    // Credenciales mock universales para desarrollo (funciona con DB offline)
    if (email === 'admin@acme.com' && req.body.password === 'admin') {
        const mockUser = {
            userId: 1,
            userName: 'Administrador Mock',
            userEmail: 'admin@acme.com',
            userRole: 'ADMIN_ROLE',
            userImg: 'mock-avatar.png'
        };
        const token = jwt.sign({ usuario: mockUser }, SEED, { expiresIn: 14400 });
        return res.status(200).json({
            ok: true,
            mensaje: 'Login exitoso',
            usuario: mockUser,
            token: token
        });
    }

    const sql = 'SELECT * FROM usuarios WHERE userEmail = ?';
    conn.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de base de datos. Usa admin@acme.com / admin para modo offline.'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        } else {
            const user = results[0];
            const passwordMatch = bcrypt.compareSync(req.body.password, user.userPassword);
            if (!passwordMatch) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Contraseña incorrecta'
                });
            }

            const token = jwt.sign({ usuario: user }, SEED, { expiresIn: 14400 });
            res.status(200).json({
                ok: true,
                mensaje: 'Login exitoso',
                usuario: user,
                token: token
            });
        }
    });
});

app.put('/uploads/productos/:id', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha seleccionado ningun archivo, tonoto'
        });
    }

    const file = req.files.image;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!allowedExtensions.includes(fileExtension)) {
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
        if (err) {
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

    conn.query(sql, [name, code, date, parseInt(price), description, rate, req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            mensaje: "Producto actualizado correctamente"
        });
    });
});

const { OAuth2Client } = require('google-auth-library');
const { generate } = require('rxjs');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

//Login Google
app.post('/google-login', async (req, res) => {
    const googletoken = req.body.googletoken || req.body.token;
    console.log('Token recibido: ' + googletoken);
    try {
        const { name, email, picture } = await verifyGoogleToken(googletoken);
        conn.query('SELECT * FROM usuarios WHERE userEmail=?', [email], (err, results) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al obtener datos del usuario",
                    error: err
                });
            }
            if (results.length === 0 || !results.length) {
                console.log("El usuario no existe en la BD, vamos a crearlo");
                let datosUsuario = {
                    userName: name,
                    userEmail: email,
                    userImg: picture
                };
                conn.query('INSERT INTO usuarios SET ?', datosUsuario, (err, insertResult) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: "Error al crear usuario",
                            error: err
                        });
                    }
                    // Buscar el usuario recién creado para obtener sus campos por defecto e ID
                    conn.query('SELECT * FROM usuarios WHERE userId = ?', [insertResult.insertId], (err, newResults) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                mensaje: "Error al recuperar el usuario creado",
                                error: err
                            });
                        }
                        const user = newResults[0];
                        const token = jwt.sign({ usuario: user }, SEED, { expiresIn: 14400 });
                        return res.status(200).json({
                            ok: true,
                            mensaje: "Login exitoso",
                            usuario: user,
                            token: token
                        });
                    });
                });
            } else {
                console.log("Usuario encontrado");
                const user = results[0];
                const token = jwt.sign({ usuario: user }, SEED, { expiresIn: 14400 });
                return res.status(200).json({
                    ok: true,
                    mensaje: "Login exitoso",
                    usuario: user,
                    token: token
                });
            }
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            mensaje: "Token no valido",
            error: error
        });
    }
});

//Verificar el token de Google
async function verifyGoogleToken(token) {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    return {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    };
}

oauth2Client.setCredentials({
    refresh_token: EMAIL_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const smptTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "joaquin.contreras2001@alumnos.ubiobio.cl",
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken: accessToken
    }
});

// Enviar Email de Prueba
app.post('/email-test', (req, res) => {
    let msg = `<h3>
        <span style="background-color: #ffcc00;">
            Envío de Email con NodeJS - Nodemailer y GMail
        </span>
    </h3>
    <p>Este es un <strong> email de ejemplo </strong> utilizando
        <span style="color: #ff0000;">Nodemailer</span> y <em>NodeJS</em>.
    </p>
    <ul>
        <li>Permite formato HTML</li>
        <li>Permite adjuntar archivos</li>
        <li>Se utiliza una cuenta GMail configurada con OAuth2</li>
    </ul>`;

    const { email_adress } = req.body;

    const mailOptions = {
        from: "Asignatura Angular",
        to: email_adress,
        subject: "Email de Prueba NodeJS - Nodemailer",
        generateTextFromHTML: true,
        html: msg
    };

    smptTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(response);
        smptTransport.close();
        res.status(200).json({
            ok: true,
            mensaje: 'Email enviado correctamente',
        });
    });
});

