const bcrypt = require('bcrypt')
const {user} = require("../models");
const {Op} = require("sequelize");

const handleNewUser = async (req, res) => {
    const {firstName, lastName, email, pwd, username } = req.body;
    if (!firstName || !lastName || !email || !username || !pwd) return res.status(400).json({'message': 'All fields are required.'});

    //check for duplicate usernames in the db
    const duplicate = await user.findAll( {
        where: {
            username: {
                [Op.eq]: username
            },
        }
    });

    if(duplicate.length !== 0) return res.status(409).json({'message': 'Account already exists!'}); // conflict

    try {
        //encrypt pwd
        const hashedPwd = await bcrypt.hash(pwd,10 );

        const newUser = {"firstName": firstName, "lastName": lastName, "username": username, "password": hashedPwd, "email": email,};

        user.create({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            username: newUser.username
        });

    } catch(err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser}