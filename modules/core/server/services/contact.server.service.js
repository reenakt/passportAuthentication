'use strict';
var mongoose = require('mongoose'),
    Contact = mongoose.model('RContact');

module.exports.saveContact = function(savableContact,callback) {
    var Contact = new Contact(savableContact);
    
    contact.save(function(err){
        if(err){
            callback(err);
        }
        callback(null,contact);
    });
    
}