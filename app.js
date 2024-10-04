const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'BARBITAS'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// CRUD para la tabla "usuarios"

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(result[0]);
    });
});

// Crear un nuevo usuario (solo con los campos permitidos)
app.post('/usuarios', (req, res) => {
    const { nombre, contrasena } = req.body;

    // Validar que solo se reciban los campos correctos
    if (!nombre || !contrasena) {
        return res.status(400).json({ error: 'Los campos nombre y contrasena son obligatorios.' });
    }

    const query = 'INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)';
    db.query(query, [nombre, contrasena], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Usuario creado', userId: result.insertId });
    });
});

// Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena } = req.body;

    // Validar que solo se reciban los campos correctos
    if (!nombre || !contrasena) {
        return res.status(400).json({ error: 'Los campos nombre y contrasena son obligatorios.' });
    }

    const query = 'UPDATE usuarios SET nombre = ?, contrasena = ? WHERE id = ?';
    db.query(query, [nombre, contrasena, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado' });
    });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    });
});

// CRUD para la tabla "llantas"

// Obtener todas las llantas
app.get('/llantas', (req, res) => {
    const query = 'SELECT * FROM llantas';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Obtener una llanta por ID
app.get('/llantas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM llantas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Llanta no encontrada' });
        }
        res.json(result[0]);
    });
});

// Crear una nueva llanta (solo con los campos permitidos)
app.post('/llantas', (req, res) => {
    const { medida, stock } = req.body;

    // Validar que solo se reciban los campos correctos
    if (!medida || !stock) {
        return res.status(400).json({ error: 'Los campos medida y stock son obligatorios.' });
    }

    const query = 'INSERT INTO llantas (medida, stock) VALUES (?, ?)';
    db.query(query, [medida, stock], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Llanta creada', tireId: result.insertId });
    });
});

// Actualizar una llanta
app.put('/llantas/:id', (req, res) => {
    const { id } = req.params;
    const { medida, stock } = req.body;

    // Validar que solo se reciban los campos correctos
    if (!medida || !stock) {
        return res.status(400).json({ error: 'Los campos medida y stock son obligatorios.' });
    }

    const query = 'UPDATE llantas SET medida = ?, stock = ? WHERE id = ?';
    db.query(query, [medida, stock, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Llanta no encontrada' });
        }
        res.json({ message: 'Llanta actualizada' });
    });
});

// Eliminar una llanta
app.delete('/llantas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM llantas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Llanta no encontrada' });
        }
        res.json({ message: 'Llanta eliminada' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
