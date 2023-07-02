var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema(
    {
        id:String,
        fname:String,
        email:String,
        phone:String,
        password:String,
    
    },
    {timestamps:true}
);
module.exports=mongoose.model('User',UserSchema,'User');
