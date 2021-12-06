import bcrypt from 'bcryptjs';
export default {
    users:[
        {
      name: 'Arjun',
      email: 'admin@gmail.com',
      phNumber: '1111122222',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Abhijeet Raj',
      email: 'user@gmail.com',
      phNumber: '1234567890',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },

    ],
    products:[
        {
        name: 'R.d sharma',
        publisher: 'jai publication',
        image: '/images/book1.jpg',
        price:220 ,
        pincode: '800020',      
       },
       { 
       name: 'R.s agrawal',
       publisher: 'Guru publication',
       image: '/images/book2.jpeg',
       price:220, 
       pincode: '800020', 
       },
       {
      name: 'book3',
      publisher: 'Shree publication',
      image: '/images/book3.jpg',
      price:257, 
      pincode: '800020', 
     },
     { 
     name: 'book4',
     publisher: 'Shree publication',
     image: '/images/book4.jpg',
     price:298 , 
     pincode: '800020',      
    },
    { 
    name: 'book5',
    publisher: 'Shree publication',
    image: '/images/book5.jpg',
    price:204 , 
    pincode: '800020', 
   },
   { 
   name: 'book6',
   publisher: 'Shree publication',
   image: '/images/book6.jpg',
   price:220 , 
   pincode: '800020',     
  },
  { 
  name: 'book7',
  publisher: 'Shree publication',
  image: '/images/book7.jpg',
  price:250 ,
  pincode: '800020',   
 },
 { 
 name: 'book8',
 publisher: 'Shree publication',
 image: '/images/book8.jpg',
 price:230 , 
 pincode: '800020', 
},
{ 
name: 'book9',
publisher: 'Shree publication',
image: '/images/book9.jpg',
price:420 ,  
pincode: '800020',      
},
{ 
name: 'book10',
publisher: 'Shree publication',
image: '/images/book10.jpg',
price:120 , 
pincode: '800020',      
},
{ 
name: 'book11',
publisher: 'Shree publication',
image: '/images/book11.png',
price:320 , 
pincode: '800020',    
}
    ]
}