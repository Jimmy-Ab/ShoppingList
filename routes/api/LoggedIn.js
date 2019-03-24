const User = require('../../models/user')

module.exports = function (app) {
    app.get('/api/loggedIn', async(req, res) => {
        const user = req.user;
        if (!user) {
            res.status(403);
            res.send("Unauthorized");
            
        } else {
            const users = await User.findById(user._id)
            delete users.password
            res.send(users)
        }
    })
}