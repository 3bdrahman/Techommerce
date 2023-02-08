const { default: mangoose } = require("mongoose");
const dbConnect = () => {
    try {
        const conn = mangoose.connect(process.env.MONGODB_URL)
                console.log('Bluetooth has connected successfully');

    }
    catch (err) {
        console.log('database error')
    }
}
module.exports = dbConnect;
