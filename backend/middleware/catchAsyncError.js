module.exports=theFunc=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);

    //promise vala tab chlega jab koi eror na ho agr error hai to catch chla do
};
//ye deko yaha ek trah se try catch hi use hora hai pahle promise lik kar hum ye bta rai ki ye try ka phir catch likdiya usme kafi kuch likethai lakin ya humne next as a callback function pass kar diya