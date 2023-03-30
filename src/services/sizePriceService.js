const client = require("../db");

const getSizeAndPriceByFlowerId = (req, res) => {
    try {
        const { flower_id } = req.params;
        console.log(flower_id);
        client.query(`select * from sizeprice where flower_id=$1`, [flower_id], (err, data) => {
            //console.log(data);
            if (err) throw err;
            res.status(200).json({ err: null, sizeprice: data.rows });
        });
    } catch (error) {
        res.status(500).json({ err: err.message, sizeprice: null });
    }
}

module.exports = {
    getSizeAndPriceByFlowerId
}