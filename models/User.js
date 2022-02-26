const {Schema, model}= require('mongoose');
const moment=require('moment');

const UserSchema=new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email.']
    },
    thoughts: [
        {
            type:Schema.Types.ObjectId,
            ref:'Thought'
        }
    ],
    friends: [
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},
{
    toJSON: {
        virtuals:true,
        getters: true
    },
    id: false
}
);

//create User Model using Schema
const User = model('User',UserSchema);

//get total count of comments
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//export
module.exports = User;