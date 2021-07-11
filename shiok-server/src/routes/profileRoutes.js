const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require("../middlewares/requireAuth");
const Hitcher = mongoose.model('Hitcher');
const Driver = mongoose.model('Driver');

const router = express.Router();

router.use(requireAuth);

router.get('/profile', async (req, res) => {
	res.send(req.user);
});

router.put('/editprofile', async (req, res) => {
	const {username, phoneNumber, teleHandle, licenseNumber} = req.body;
	try {
		(req.user.type == 'Hitcher') 
		? await Hitcher.findByIdAndUpdate({_id: req.user._id}, {username, phoneNumber, teleHandle}) 
		: await Driver.findByIdAndUpdate({_id: req.user._id}, {username, phoneNumber, licenseNumber, teleHandle});
		const updated = req.user.type == 'Hitcher' ? await Hitcher.findById({_id: req.user._id}).populate('friends') : await Driver.findById({_id: req.user._id}).populate('friends');
		res.send(updated);
	} catch (err) {
		return res.status(422).send({error: 'Could not update profile'});
	}
});

router.post('/deletefriend', async (req, res) => {
	const {friend} = req.body;
	try {
		const user = req.user.type == 'Hitcher' ? await Hitcher.findById({_id: req.user._id}) : await Driver.findById({_id: req.user._id});
		user.friends.delete(friend._id.toString());
		req.user.type == 'Hitcher' ? await Hitcher.findByIdAndUpdate({_id: req.user._id}, {friends: user.friends}) : await Driver.findByIdAndUpdate({_id: req.user._id}, {friends: user.friends});
		const updated = req.user.type == 'Hitcher' ? await Hitcher.findById({_id: req.user._id}).populate('friends') : await Driver.findById({_id: req.user._id}).populate('friends');
		res.send(updated);
	} catch (err) {
		return res.status(422).send({error: 'Could not delete friend'});
	}
});

router.post('/editpic', async (req, res) => {
	const {pic} = req.body;
	try {
		req.user.type == 'Hitcher' ? await Hitcher.findByIdAndUpdate({_id: req.user._id}, {pic}) : await Driver.findByIdAndUpdate({_id: req.user._id}, {pic});
		const updated = req.user.type == 'Hitcher' ? await Hitcher.findById({_id: req.user._id}).populate('friends') : await Driver.findById({_id: req.user._id}).populate('friends');
		res.send(updated);
	} catch (err) {
		return res.status(422).send({error: 'Could not update profile picture'});
	}
});
	
module.exports = router;    