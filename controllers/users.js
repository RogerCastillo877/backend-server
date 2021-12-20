const User = require('../models/user');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'nombre email role google');
    
    res.json({
        ok:true,
        users
    });
}

const createUser = async(req, res) => {
  
    const { email, password, name } = req.body;
    
    const user = new User( req.body );

    await user.save();

    res.json({
        ok:true,
        user
    });
}

module.exports = {
    getUsers,
    createUser
}