const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM diners', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/name/:name', (req, res) => {
    console.log('Endpoint /name/:name is called');
    const restaurantName = req.params.name;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });

        conn.query('SELECT * FROM diners WHERE name = ?', [restaurantName], (err, rows) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error' });

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }

            res.json(rows);
        });
    });
});


routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('INSERT INTO diners set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)

            res.send('Diner insertado con exito')
        })
    })
})

module.exports = routes;