const router = require('express').Router();
const {
    User
} = require('../../models/');


router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,

        });

        req.session.save(() => {
            req.session.userid = newUser.userid;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        });

    } catch (error) {
        res.status('500').json(error)
    }

});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },

        });
        if (!user) {
            res.status('400').json({
                message: 'User not found',
            });

            return;
        }

        const validPassword = user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status('400').json({
                message: 'Password not valid',
            });

            return;
        }


        req.session.save(() => {
            req.session.userid = user.userid;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json({
                user,
                message: 'You are now logged in.'
            });

        });

    } catch (error) {
        res.status('400').json({
            message: 'User not found.'
        });


    }
});


router.post('/logout', (req, res) => {


        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();


            });
        } else {
            res.status(404).end();
        }
    }
);

module.exports = router;