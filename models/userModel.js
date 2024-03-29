const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		lastName: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
		},
		posts: {
			type: Array,
			default: [],
		},
		wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	},
	{
		timestamps: true,
	}
);
userSchema.pre("save", async function(next)  {
    const salt = await bcrypt.genSaltSync(10);
    this.password= await bcrypt.hash(this.password, salt)
    
})
userSchema.methods.isPasswordMatched = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}
//Export the model
module.exports = mongoose.model('User', userSchema);