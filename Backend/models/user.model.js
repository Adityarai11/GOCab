const  mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    fullname :{
        firstname :{
            type : String,
            required : true,
            minLength :[
                3, 'First name must be at least 3 character long']},
        lastname :{
            type : String,
            minLength :[
                3, 'Last name must be at least 3 character long']},
    },
    email : {
        type: String,
        unique: true,
        required : true,
        minLength :[
            8, 'Email name must be at least 8 character long']
    },
    password:{
        type : String,
        required : true,
        select : false,
    },
    socketId:{
        type: String
    }
});

userSchema.methods.genrateAuthToken = function(){
    const token =JWT.sign({_id:this._id},process.env.JWT_SECRET)
    return token;
}
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;