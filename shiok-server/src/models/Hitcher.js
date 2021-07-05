const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const hitcherSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: 'Hitcher'
	},
	username: {
		type: String,
		default: ''
	},
	phoneNumber: {
		type: String,
		default: ''
	},
	teleHandle: {
		type: String,
		default: ''
	},
	rating: {
		type: Map,
		of: Number,
		default: {"average": 0, "len": 0}
	},
	friends: {
		type: Map,
		of: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
		default: {}
	}
});

hitcherSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
		});
	});
});

hitcherSchema.methods.comparePassword = function(candidatePassword) {
	const user = this;

	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
		if (err) {
			return reject(err);
		}

		if (!isMatch) {
			return reject(false);
		}

		resolve(true);
		});
	});
};

mongoose.model('Hitcher', hitcherSchema);
