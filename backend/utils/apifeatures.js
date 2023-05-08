//isme hum search vale hisab ko contril karenge
class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }
    //jo bhi aapne productcontrollers se cheeze bezi vo yaha hum recevie karlenge using contructor

    // this use kiya to hum is class kai kisi  bi feature ko use kar sakte using this 

    //hum chah rai aaisa hisab ho samosa kare to use sey related jo bhi ho vo show ho ja
    //regex mongodb feature hai means regular expression ,options i ka mtlb case sensitive to kisi ne lik diya abc lika product name= ABC hai to kuch ni ane ka kuki aise to user kuch bhi likdega to har cheez ka ouptu thodey use dena isliye case sensitive hi humne rahne diya
    //manlo samosa to hume milgya lakin kisi ne samosamosa likha to nhi mil ra aisa nhi hona chaoye agr kuch bhi mil ra thoda sa hi to vo return kar do kuki ho sake user usi cheez ko search kar ra ho
    search(){
        //queryStr kya req.query this.queryStr.keyword iska matlb hume vo keyword jo hume search karna to ab agey kya karenge
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }
        :{};

        console.log(keyword);

        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr};  //iska mathlb yo hai jo query copy mai change hongey vo querystr mai bhi ho jange
           
        console.log(queryCopy);

    
       
        //Removing some fields for category
        const removeFields=["keyword","page","limit"];

        // removeFields=["keyword","page","limit"];

        

        removeFields.forEach((key)=>delete queryCopy[key]);

        // console.log(queryCopy);

        //filter for price and rating
        // queryCopy ek object hai usme hume gt lt mil rahe price kai lye to unhe hum price ki form mai lena abhu vo gt=1200 lt=2000 ye are thai to unhe price mai karne kai bad vo kuch aise ayenge price=1200 and son on to aise karne kai liye humne gt lt se pahle dollar sign lagana padega to ye jo aap dek ro ye bht bdaiya tareka object(querycopy) mai jo bhi un sab mai ek hi change karna ki dollar sign lagana pahle to vo kaise possible hai jaise neeche dek lo
        let queryStr=JSON.stringify(queryCopy); //string mai convert hogayi
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)


        // console.log(queryCopy);
        //this.query ka matlb hai product.find
        //ab use(queryCopy) phir se json mai karna hoga
        this.query=this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);
        return this;
    }

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;   //manlo total page hai 50 hai aap 10 dikana jao per page to 1st page kitne skip0 second page ab 11 se honi chiaye is page pai yani shuru ki 10 skip hogi phir 3 page pai aye ab kitne shuru ki 20

        const skip=resultPerPage*(currentPage-1);   //10*(1-1) =0,10*(2nd(page)-1) ,10*(3rd(page)-1)
        this.query=this.query.limit(resultPerPage).skip(skip);   //limit hai 5 phir skip mention kar diya ki itni skip karni
         return this; 
    }
};

module.exports=ApiFeatures;

//query ho gyi let say samosa and query str hogi keywords 