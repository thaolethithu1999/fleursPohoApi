const client = require("../db");

const getDiscountByFlowerId = (req, res) => {
    try {
        const { product_id } = req.params;
        client.query(`select * from discount where product_id=$1`, [product_id], (err, data) => {
            if(err) throw err;
            if(data.rowCount < 1) {
                res.status(500).json({err: "not have discount", discount: null});
            } else res.status(200).json({err: null, discount: data.rows});
        });
    } catch (error) {
        res.status(500).json({err: err.message, discount: null});
    }
}

const addDiscount = (req, res) => {
    try {

    } catch (error) {
        
    }
}

module.exports = {
    getDiscountByFlowerId,
    addDiscount
}