const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models/user.model');

router.get('/', async(req,res) => {
    await User.find({},{username: 1, email: 1}, (err,users) => {
        if(!err)
        res.json(users);
        else
            res.status(400).json({'state': err});
    });
});

router.get('/:id', async(req,res) => {
    const id = req.params.id;
    await User.findById(id, {username: 1, email: 1}, (err,user)=> {
        if(!err)
            res.json(user);
        else
            res.status(400).json({'state': err});
    });
});

router.post('/', async (req,res) => {
    const { username, email, password} = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(!err){
            const newUser = new User({username, email, "password": hash});
            await newUser.save( err => {
            if(!err)
                res.json({'state': 'Created successfully'});
            else
                res.status(400).json({'state': err});
            });
        }
        else
            res.status(400).json({'state': err});
    }); 
});

router.put('/:id', async(req,res) => {
    const id = req.params.id;
    const { username, email} = req.body;    
    const newUser = {username,email};
    await User.findByIdAndUpdate(id, newUser, err => {
        if(!err)
            res.json({'state': 'Updated successfully'});
        else
            res.status(400).json({'state': err});
    });
});

router.delete('/:id', async(req,res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id, err => {
        if(!err)
            res.json({'state': 'Deleted successfully'});
        else
            res.status(400).json({'state': err});
    });
});

module.exports = router;