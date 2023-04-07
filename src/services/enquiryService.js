const client = require("../db");

const addEnquiry = (req, res) => {
    try {
        const id = Math.floor(Math.random() * (999 - 100 + 1) + 100);

        client.query(`select * from enquiry where id=$1`, [id], (err, data) => {
            if(data.rowCount > 0) {
                id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            } else {
                const { firstname, lastname, companyname, email, phone, message } = req.body;
                client.query(`insert into enquiry values($1,$2,$3,$4,$5,$6,$7)`, [id, firstname, lastname, companyname, email, phone, message], (err, data) => {
                    if(err) {
                        throw err;
                    } else {
                        res.status(201).json({ err: null, message: "Add enquiry successfully!" });
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({err: error.message, message: "Failed to add enquiry"});
    }
}

module.exports = {
    addEnquiry
}