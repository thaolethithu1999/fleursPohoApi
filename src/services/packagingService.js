const client = require('../db');

const getPackList = (req, res) => {
    try {
        client.query(`select * from packaging`, [], (err, data) => {
            if(err) throw err;
            if(data.rows.length > 0) {
                res.status(200).json({err: null, packaging: data.rows});
            }
        });
    } catch (error) {
        res.status(500).json({err: error.message, packaging: null });
    }
}

module.exports = {
    getPackList
}