import express from 'express';
import  Mongoose  from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productsRouter.js';
import userRouter from './routers/userRouter.js';
import path from 'path';
import multer from 'multer';
import expressAsyncHandler from 'express-async-handler';
import Product from './models/productModel.js';
import http from 'http';
import { Server } from 'socket.io';
import {isAuth} from './util.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect(process.env.MONGODB_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/Uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
var storage =multer.diskStorage({
  destination(req,file,cb){
    cb(null,'Uploads/')
  },
  filename(req,file,cb){

        cb(null, file.fieldname+Date.now()+".jpg");
    }
});
const upload =multer({
  storage:storage
});


app.post('/api/products/uploadProducts',isAuth,upload.single('image'),expressAsyncHandler(async(req,res)=>{
  try{
    const createProducts=new Product({
      name:req.body.name,
      publisher:req.body.publisher,
      image:`/${req.file.path}`,
      price:req.body.price,
      description:req.body.description,
      sellerId:req.body.sellerId,
      sellerName:req.body.sellerName,
      sellerEmail:req.body.sellerEmail,
      phNumber:req.body.phNumber,
      pincode:req.body.pinCode,
      address:req.body.address,
      lat:req.body.lat,
      lng:req.body.lng,
    });
    const uploadProduct = await createProducts.save();
    res.status(200).send({message: 'Product Uploaded.', product: uploadProduct});
  }
  catch(error){
    res.status(404).send({message:'Product Upload Failed.'});
  }
}));
app.use('/api/users', userRouter);
app.use('/api/products',productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY);
});


const port = process.env.PORT;
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });

  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
      console.log(user.name);
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
   
     users.map((y)=>{
      io.to(y.socketId).emit('updateUser', updatedUser);
    });
  
      io.to(updatedUser.socketId).emit('listUsers', users);
    
  });
  

  socket.on('onUserSelected', (user,login) => {
     const sender = users.find((x) => x._id===login._id && x.online);
     if (sender) {
      const existUser = users.find((x) => x._id === user._id);
      console.log(existUser.messages);
      if(existUser)
      io.to(sender.socketId).emit('selectUser', sender);
   }
  });

 socket.on('onMessage', (message) => {
      const user = users.find((x) => x._id === message._id );
      const info=users.find((x)=> x._id===message.userInformation);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
        info.messages.push(message);   
      } 
  });



});

app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});




