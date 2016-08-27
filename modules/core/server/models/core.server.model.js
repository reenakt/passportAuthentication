'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validator = require('validator');

var validateEmailStrategy = function (property) {
    return validator.isEmail(property);
}
var validateFieldStrategy = function (property) {
    return property.length;
}


var UserSchema = new Schema({


    name: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'name cannot be empty']
    },

    email: {
        type: String,
        default: '',
        trim: true,
        validate: [validateEmailStrategy, 'Email should be valid']
    },

    username:{
       type:String,
        unique:true,
        required: 'Username is required',
        trim :true

    },

    password: {
        type: String,
        required: true,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'password should be longer'
        ]

    },
    salt: {
        type: String
    },

    provider:{
        type:String,
        required:'provider is required'
    },
    providerId:String,
    providerData:{},

  created:{
        type:Date,
    default:Date.now
}

})

UserSchema.pre('save',function(next){

    if(this.password){
        this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});


UserSchema.methods.hashPassword = function(password){

    return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {

    return this.password === this.hashPassword(password);

};


mongoose.model('AuthUsers',UserSchema);