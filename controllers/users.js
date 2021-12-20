const getUsers = (req, res) => {
    
    res.json({
        ok:true,
        users: []
    });
}

module.exports = {
    getUsers,
}