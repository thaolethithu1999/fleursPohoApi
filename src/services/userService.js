const client = require("../db");
const { userError } = require("../errorList");

const login = (req, res) => {
    try {
        // console.log("login work");
        const { username, password } = req.body;
        // console.log(req.body);
        // console.log(username, password);
        client.query(`select * from users where username=$1 and password=$2`, [username, password], (err, data) => {
            // console.log(err, data);
            if (err)  throw err;
            if(data.rows.length < 1) {
                res.status(200).json({ err: userError.USER_NOT_FOUND, user: []})
            } else {
                res.status(200).json({ err: null, user: data.rows[0] });
            }
        });
    } catch (error) {
        res.status(500).json({ err: error.message, user: null }); 
    }
}

const getUserById = (req, res) => {
    try {
        console.log(req.params);
        let {id} = req.params;
        client.query(`select * from users where id=$1`, [id], (err, data) => {
            if (err) throw err;
            console.log(data);
            if(data.rows.length > 0) {
                res.status(200).json({ err: null, user: data.rows[0]});
            }
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
    getUserById,
    addUser,
    editUser,
};