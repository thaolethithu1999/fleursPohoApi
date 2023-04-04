const client = require("../db");

const getSizeAndPriceByFlowerId = (req, res) => {
    try {
        const { flower_id } = req.params;
        // console.log(flower_id);
        client.query(`select s.size, sp.price from sizeprice sp, size s where sp.flower_id=$1 and sp.size_id=s.id`, [flower_id], (err, data) => {
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