const express=require('express');//for accessing the package express
const mongoose=require('mongoose');//for accessing the package mongoose
const path = require('path');
const user = require('./user.js');
const User=require("./user.js");
const Memb=require("./memb.js"); 
mongoose.connect('mongodb+srv://Sebastian_Varghese:sebastianvarghese123@cluster0.fd7xfsu.mongodb.net/shebi');
const app=express();//to call express package
//app.use(cors());
app.use(express.json());//use the package express
let PORT = 3000//assigning the port numb
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.post('/login',(req,res)=>{console.log(req.body)
  console.log(req.query)
  login(req,res)
})

app.post('/signup',(req,res)=>{console.log(req.body)
  console.log(req.body)
  res.send({"status":200,"data":"User created Sus"})
  User.create(req.body);
})

app.post('/register',(req,res)=>{console.log(req.body)
  console.log(req.body)
  res.send({"status":200,"data":"memb created Sus"})
  Memb.create(req.body);
})

app.get('/view', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchusers(req,res)
})

app.get('/register', (req, res) => {console.log(req.body)
  console.log(req.query)
  fetchMemb(req,res)
})

app.post('/searchuser', (req, res) => {
  const searchInput = req.body.searchInput;
  searchUsers(searchInput, res);
});

async function searchUsers(searchInput, res) {
  try {
    const data = await User.find({ email: searchInput });

    res.send({ status: 200, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'An error occurred during the search.' });
  }
}

app.post('/searchmemb', (req, res) => {
  const searchInput = req.body.searchInput;
  searchMemb(searchInput, res);
});

async function searchMemb(searchInput, res) {
  try {
    const data = await Memb.find({ nam: searchInput });

    res.send({ status: 200, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: 'An error occurred during the search.' });
  }
}


app.delete('/deleteuser', async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  await datadelete(req, res);
});

async function datadelete(req, res) {
  try {
    const email = req.query.email || req.body.email;
    await User.deleteOne({ _id: email });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the User' });
  }
}
app.delete('/deletemember', async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  await datadelete(req, res);
});

async function datadelete(req, res) {
  try {
    const email = req.query.email || req.body.email;
    await User.deleteOne({ _id: email });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the User' });
  }
}
app.patch('/updateuser', async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  await dataupdate(req, res);
});

async function dataupdate(req, res) {
  try {
    const email = req.query.email || req.body.email;
    await User.updateOneOne({ _id: email });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update the User' });
  }
}
async function fetchusers(req,res){
  var data = await User.find();
  res.send({"status":200,"data":data});
}

async function fetchMemb(req,res){
  var data = await Memb.find();
  res.send({"status":200,"data":data});
}

async function datafetch(res){  
  res.send(await Memb.find());
}
app.get('/', (req, res) => {
  console.log(req.body);
    console.log(req.query);
    console.log(req.body);
    datafetch(res)
  })

async function datafetch(res){  
  res.send(await User.find());
}
app.get('/', (req, res) => {
  console.log(req.body);
    console.log(req.query);
    console.log(req.body);
    datafetch(res)
  })

  app.get('/', (req, res) => {
    res.send("ok");
    })
  async function login(req,res){
    var data=await user.findOne(req.body);
    data=data||0;
    if(data!=0){
      res.send({"status":200,"data":"valid user"})
    }
    else(
      res.send({"status":404,"data":"invalid user"})
    )
  }
  
  
app.put('/',(req,res)=>{
  console.log(req.query);
  console.log(req.body);
  dataupdate(req,res)
})
  async function dataupdate(req,res){
    console.log(req.query);
    console.log(req.body);
    res.send(await User.updateOne({"id":req.query.id},{$set:req.body}))
}
    async function datadelete(req,res){
      console.log(req.query);
      console.log(req.body);
      res.send(await User.deleteOne({"id":req.query.id}))
  }
  app.patch('/updateuser1/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.json({ status: 200, data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Failed to update the user' });
    }
  });
app.delete('/user',(reg,res)=>{res.send("DELETE LIST");});

app.listen(PORT,() =>console.log(`Listening on port${PORT}..`));
