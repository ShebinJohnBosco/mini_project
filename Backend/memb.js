var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema(
    {
        nam:String,
        phon:String,
        gname:String,
        mc:String,
        emai:String,
        area:String,
        city:String,
        state:String,
        postcode:String
    },
    {timestamps:true}
);
module.exports=mongoose.model('Memb',UserSchema,'Memb');