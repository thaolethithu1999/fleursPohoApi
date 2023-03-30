const client = require("../db");

const getFlowers = (req, res) => {
    try {
        client.query("select * from flowers", (err, data) => {
            if(err) throw err;
            res.status(200).json({err: null, flowers: data.rows});
        });
    } catch (error) {
        res.status(500).json({err: error.message, flowers: null});
    }
}

const getFlowerById = (req, res) => {
    try {
        const {id} = req.params;
        client.query(`select * from flowers where id=$1`, [id], (err, data) => {
            if(err) throw err;
            res.status(200).json({err: null, flower: data.rows[0]});
        })
    } catch (error) {
        res.status(500).json({err: error.message, flower: null});
    }
}


// const searchFlowers = (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({err: error.message, flowers: null});
//     }
// }




module.exports = { 
    getFlowers, 
    getFlowerById, 
};