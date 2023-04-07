const client = require("../db");

const login = (req, res) => {
    try {
        const { username, password } = req.body;
        client.query(`select * from users where username=$1 and password=$2`, [username, password], (err, data) => {
            if (err) throw err;
            res.status(500).json({ err: null, user: data.rows[0] });
        });
    } catch (error) {
        res.status(500).json({ err: error.message, user: null }); 
    }
}

const addUser = (req, res) => {
    try {
        const { firstname, lastname, address, email, phone, username, password } = req.body;
        if (!username || !password) {
            res.status(500).json({ err: "catch empty", message: "Please fill usename and password!" });
        } else {
            let checkExist = false;
            client.query(`select * from users where username=$1 or email=$2`, [username, email],
                (err, data) => {
                    if (data.rowCount > 0) {
                        checkExist = true;
                        res.status(500).json({ err: "username duplicate", message: "This username was used. Pls choose another usename!" });
                        throw err;
                    }
                });
            if (!checkExist) {
                const id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                console.log(id);

                client.query(`insert into users values($1,$2,$3,$4,$5,$6,$7,$8)`,
                    [id, firstname, lastname, address, email, phone, username, password],
                    (err, data) => {
                        res.status(201).json({ err: null, message: "User created successfully!" })
                    });
            }
        }
    } catch (error) {
        res.status(500).json({ err: error.message, message: "Failed to create new user" });
    }
}

const editUser = (req, res) => {
    try {   
        const {id, firstname, lastname, address, email, phone, username, password } = req.body;
       // client.query(`update users set firstname=$1, lastname=$2, address=$3, email=$4, phone=$5 where id=$6`)
    } catch (error) {
        res.status(500).json({ err: error.message, message: "Failed to edit user" });
    }
}


module.exports = {
    login,
    addUser
};