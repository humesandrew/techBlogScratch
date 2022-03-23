// router.put(/, id).update({req.body}) {
//     where: req.params.body
// }

const router = require('express').Router();
const {
    Post
} = require('../models/');

router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.userId,
        });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Post.udpate(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }

});




router.delete('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }

});








module.exports = router;