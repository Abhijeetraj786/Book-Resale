import  mongoose  from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String,required:true },
        publisher: {type: String,required:true },
        image: {type: String,required:true },
        price: {type: String, required: true },
        description: {type: String },
        sellerId:{type:String ,required:true},
        sellerName:{type:String ,required:true},
        sellerEmail:{type:String ,required:true},
        phNumber:{type:String,required:true},
        address:{type:String,required:true},
        pincode: {type: String,required:true },
        lat: Number,
        lng: Number,
    },
    {
        timestamps:true,
    }
);

const Product = mongoose.model('Product',productSchema);
export default Product;