const {user} = require("../models");

const insertNewUser = async (req, res) => {
    const body = req.body
    try {
        const usr = await user.create(
            {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                username: body.username
            })

        return res.json(usr)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
module.exports = { insertNewUser };