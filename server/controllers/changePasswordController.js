const {user} = require("./../models");
const {Op} = require("sequelize");
const bcrypt = require("bcrypt");


const handleChangePwd = async (req, res) => {
    console.log(req.body)
    const {username, oldPwd, newPwd, confirmPwd} = req.body;
    if (!username || !oldPwd || !newPwd || !confirmPwd) return res.status(400).json({'message': 'Old password and new password are required.'});

    const result = await user.findAll({
        where: {
            username: {
                [Op.eq]: username
            },
        }
    });

    if(result.length === 0) return res.status(400).json({'message': 'User unrecognized'});
    if(newPwd !== confirmPwd) return res.status(400).json({'message': 'Passwords do not match'});
    const hashedPwd = await bcrypt.hash(newPwd,10 );

    const match = await bcrypt.compare(oldPwd, result[0].dataValues.password);
    if(match) {
        await result[0].update({
            password: hashedPwd
        })
    } else {
        return res.sendStatus(401).json({'message': 'Old password did not match '});
    }

}

module.exports = {handleChangePwd}