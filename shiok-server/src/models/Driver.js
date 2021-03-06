const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const driverSchema = new mongoose.Schema({
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
		default: 'Driver'
	},
	username: {
		type: String,
		default: ''
	},
	phoneNumber: {
		type: String,
		default: ''
	},
	licenseNumber: {
		type: String,
		default: '',
		unique: true
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
		of: {type: mongoose.Schema.Types.ObjectId, ref: 'Hitcher'},
		default: {}
	},
	pic: {
		type: String,
		default: ''
	}
});

driverSchema.pre('save', function(next) {
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

driverSchema.methods.comparePassword = function(candidatePassword) {
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

mongoose.model('Driver', driverSchema);
