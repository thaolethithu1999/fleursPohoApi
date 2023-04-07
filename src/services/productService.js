const client = require("../db");

const getProducts = (req, res) => {
    try {
        client.query("select * from products", (err, data) => {
            if(err) throw err;
            res.status(200).json({err: null, products: data.rows});
        });
    } catch (error) {
        res.status(500).json({err: error.message, products: null});
    }
}

const getProductById = (req, res) => {
    try {
        const {id} = req.params;
        client.query(`select * from products where id=$1`, [id], (err, data) => {
            if(err) throw err;
            res.status(200).json({err: null, product: data.rows[0]});
        })
    } catch (error) {
        res.status(500).json({err: error.message, product: null});
    }
}

module.exports = { 
    getProducts, 
    getProductById, 
};