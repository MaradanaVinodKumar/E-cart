function loaded(){
    document.getElementsByTagName('button')[0].addEventListener("click",()=>{document.getElementById('cata-items').style.display='block',document.getElementById('cata-items-back').style.display='block'});
    document.getElementById('cata-items-back').addEventListener("click",()=>{document.getElementById('cata-items').style.display='none',document.getElementById('cata-items-back').style.display='none'});
    document.getElementById('each-item-close-sym').addEventListener("click",()=>{document.getElementById('each-item-bg').style.display='none'});
    document.getElementsByTagName('button')[1].addEventListener("click",()=>{document.getElementById('cart-items').style.display='block';document.getElementById('cart-items-back').style.display='block';});
    document.getElementById('cart-items-back').addEventListener("click",()=>{document.getElementById('cart-items').style.display='none';document.getElementById('cart-items-back').style.display='none'});
    document.getElementsByTagName('button')[1].addEventListener("click",cart_items);
    document.getElementsByTagName('button')[2].addEventListener("clic",buys);
    
    if(!localStorage.cart_items)
    {
        localStorage.setItem('cart_items','');
    }
     
    var data=fetch('http://localhost:3000/Elec')
    .then((data)=>{
        data.json()
        .then((data)=>{
            displays(data);
        })
    })
}


function cate(value){
    var data=fetch(`http://localhost:3000/${value}`)
    .then((data)=>{
        data.json()
        .then((data)=>{
            // console.log(data);
            displays(data);
        })
    })
}


function displays(data){
    // console.log(data[0].image);
    var code="";
    var bool=false;
    for(let dat of data)
    {
        var str=dat.name+"-"+dat.id; 
        code+=`<div class="item" onclick="item_details('${dat.name}','${dat.id}')">
                <div class="item-image" id="${str}"></div>
                <div class="item-rating">Rating :`
                 
        for(let i=1;i<=5;i++)
        {
            if(i<=dat.rating)
            {
                code+=` <i class="fa fa-star" aria-hidden="true"></i>`;
            }
            else{
                code+=` </i><i class="fa fa-star-o" aria-hidden="true"></i>`;
            }
        }        
        code+=`</div>
                <div class="item-price">price: <span>${dat.price}/-</span> <span>${dat.discount}%</span> </div>
                <div class="item-details">product details : <span>${dat.details}</span></div>
                 </div>`
        
        
        document.getElementById('items-bg').innerHTML=code;
        //document.getElementById(str).style.backgroundImage="url("+dat.image+")";
     //document.getElementById(str).style.backgroundColor='red';
        str="";
    //    console.log(dat.name,dat.id,dat.image);
        bool=true;
    }
    // console.log("done");

    if(bool)
    {
    for(let dat of data){
        var str=dat.name+"-"+dat.id;
        // console.log("separate :",str)
        //  document.getElementById(str).style.backgroundColor='red';
         document.getElementById(str).style.backgroundImage="url("+dat.image+")";
    }
    }
}


 function item_details(name,id){
   
    
    //  console.log(name,id)
    var dat=fetch(`http://localhost:3000/${name}?id=${id}`) 
    .then((data)=>{
        data.json()
        .then((data)=>{
             console.log(data[0].rating);
            var code="";
        
            code+= `<div id="each-item">
            
            <div id="each-item-close"><i id="each-item-close-sym" class="fa fa-close" aria-hidden="true" onclick="document.getElementById('each-item-bg').style.display='none';"></i></div>    
            <div class="item-image-details" id="image-in-details"></div>
                <div class="item-rating-details">Rating :`;
            
                for(let i=1;i<=5;i++)
                {
                    if(i<=data[0].rating)
                    {
                        code+=` <i class="fa fa-star" aria-hidden="true"></i>`;
                    }
                    else{
                        code+=` </i><i class="fa fa-star-o" aria-hidden="true"></i>`;
                    }
                }  
                 
            code+=`</div>
                <div class="item-price-details">price: <span>${data[0].price}/-</span> <span>${data[0].discount}%</span> </div>
                <div class="item-details-details">product details : <span>${data[0].details}</span></div>
                <div id="intimation"><span><i class="fa fa-taxi" aria-hidden="true"></i></span><span><i class="fa fa-repeat" aria-hidden="true"></i></span><span><i class="fa fa-money" aria-hidden="true"></i></span><span><i class="fa fa-fire" aria-hidden="true"></i></span></div>
                <div id="button-bg">
                    <button onclick="AddToCart('${data[0].name}','${data[0].id}')">Add to cart</button>
                    <button onclick="buys()">Buy</button>
                </div>
        </div>
        </div>`;
        
        document.getElementById('each-item-bg').style.display='block';
        document.getElementById('each-item-bg').innerHTML=code;
        document.getElementById('image-in-details').style.backgroundImage="url("+data[0].image+")";
        document.getElementById('each-item').style.display='block';
        })
    })
 }

 function AddToCart(name,id){
    
    fetch(`http://localhost:3000/${name}?id=${id}`)
    .then((data)=>{
        data.json()
        .then((dat)=>{
            var bool=false;
            var obj=JSON.stringify(dat[0]);
            // console.log(dat[0],obj);
        //    localStorage.cart_items.push(JSON.parse(obj));
            var arr=localStorage.cart_items.split('*');
            arr.push(obj)
            
            // console.log(arr.join('*'));
            localStorage.cart_items=arr.join('*');

            document.getElementById('cart-items-back').style.display='block';
            document.getElementById('cart-items').style.display='block';
  
            cart_items();
           

            // console.log(ob[0].name);
        })
    })
 }


 function cart_items(){
    
    var arr=localStorage.cart_items;
    // arr=arr.replace(/\"/g,"\'");
    arr=(arr.slice(1)).split('*');
    //  console.log(arr);
     var bool=false;
    var code=`<div id="Cart-head">Cart</div>`;
    var i=0;
    for(data of arr)
    {
  
        
        var dat=JSON.parse(data);
        //  console.log(dat);
        // var dat=JSON.parse(data);
        // console.log(dat);
        var str=dat.name+"-"+dat.id+dat.id;  
        code+=`
        <div class="cart-item" onclick="item_details('${dat.name}','${dat.id}')">
            <div class="image item-image" id="${str}"></div>
            <div class="item-rating ">Rating : `
            for(let i=1;i<=5;i++)
            {
            if(i<=dat.rating)
            {
            code+=` <i class="fa fa-star" aria-hidden="true"></i>`;
            }
            else{
            code+=` </i><i class="fa fa-star-o" aria-hidden="true"></i>`;
            }
            }
            
            code+=`</div>
            <div class="item-price ">price: <span>${dat.price}/-</span> <span>${dat.discount}%</span> </div>
            <div class="item-details">product details : <span>${dat.details}</span></div>
            <div id="delete"><i onclick="remove_cart_item(${i})" class="fa fa-trash" aria-hidden="true"></i></div>
        </div>`
        document.getElementById('cart-items').innerHTML=code;
        // document.getElementById(str).style.backgroundImage="url("+dat.image+")";
        bool=true;
        i++;
    }
    if(bool)
    {
    for(let data of arr){
        var dat=JSON.parse(data);
        var str=dat.name+"-"+dat.id+dat.id;
        // console.log("separate :",str)
        //  document.getElementById(str).style.backgroundColor='red';
         document.getElementById(str).style.backgroundImage="url("+dat.image+")";
    }
    }


 }

//  var str='{"one":[{"name":"vinod"}]}';
//  let text = '{"firstName":"John","lastName":"Doe" }';
//  var obj=JSON.parse(text);
//  var obj1=JSON.parse(str);
//  console.log(obj1,obj);

function buys(){
    console.log('clicked buy');
    document.getElementById('main-dashboard').style.display='none';
    document.getElementById('payments').style.display='block';
    document.getElementById('heading').innerHTML="Address";
    
    document.getElementById('form').innerHTML=` <div><label for="">Name : </label><input type="text" placeholder="name"><label for="Phone">Phone :</label><input type="text" placeholder="Phone..."></div>
    <div><label for="">Pin :</label><input type="text" placeholder="PIN..."><label for="Disc">Disc.</label><input type="text" placeholder="Dist..."></div>
    <div><label for="">Village :</label><input type="text" placeholder="Village"><label for="House">House no.</label><input type="text" placeholder="House no..."></div>
    <div><label for="Add">Address (for external)</label></div>
    <div><textarea name="" id="" cols="94" rows="2" ></textarea></div>`
    document.getElementById('next').style.visibility='visible';
    document.getElementById('one').style.color="rgb(2, 2, 119)";
    document.getElementById('two').style.color="rgb(211, 210, 210)";
    document.getElementById('three').style.color="rgb(211, 210, 210)";
    document.getElementById('one-line').style.color="rgb(211, 210, 210)";
    document.getElementById('two-line').style.color="rgb(211, 210, 210)";
    document.getElementById('form').style.display='block';
    bools=true;
}



var bools=true;
function nexts(){
    document.getElementById('form').style.display='none';
    if(bools){
       
      setTimeout(()=>{document.getElementById('form').style.display='block';},1 )  
    document.getElementById('heading').innerHTML="Payment Method";
    document.getElementById('form').innerHTML=`<div id="method-sym"><span><i class="fa fa-paypal" aria-hidden="true"></i></span><span><i class="fa fas fa-money" aria-hidden="true"></i></span><span><i class="fa fa-google-plus-circle" aria-hidden="true"></i></i></span><span><i class="fa-brands fa-amazon-pay"><i class="fa fa-amazon" aria-hidden="true"></i></i></span><span><i class="fa fa-credit-card" aria-hidden="true"></i></i></span></div>
    <div id="payment-methods">
    <div class="padding"><input type="radio" name="method"><label for=""> Internet Banking</label></div>
    <div class="padding"><input type="radio" name="method" checked><label for=""> Cash on Delivery</label></div>
    <div class="padding"><input type="radio" name="method"><label for=""> Equated Monthly Installments (EMI)</label></div>
    <div class="padding"><input type="radio" name="method"><label for="">  E-Gift Vouchers</label></div>
    <div class="padding"><input type="radio" name="method"><label for="">  E-cart Pay Later</label></div>
    <div class="padding"><input type="radio" name="method"><label for="">  UPI</label></div>
    <div class="padding"><input type="radio" name="method"><label for=""> Wallet</label></div>
    </div>`

    document.getElementById('one-line').style.color="rgb(2, 2, 119)";
    document.getElementById('two').style.color="rgb(2, 2, 119)";

    bools=false
    }
    else{
        setTimeout(()=>{document.getElementById('form').style.display='block';},1) 
        document.getElementById('two-line').style.color="rgb(2, 2, 119)";
        document.getElementById('three').style.color="rgb(2, 2, 119)";

        document.getElementById('next').style.visibility='hidden';
        document.getElementById('heading').innerHTML="Conformation";
        document.getElementById('form').innerHTML=`   <div id="conform">
        <div id="tick-mark"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
        <div id="place-order"><button onclick="place_order()" >Place Order</button></div>
    </div>`
        bools=true;
    }

}

function backs(){
    document.getElementById('main-dashboard').style.display='block';
    document.getElementById('payments').style.display='none';
}


function place_order(){
    document.getElementById('tick-mark').style.color='green';
    document.getElementById('tick-mark').innerHTML=`<i class="fa fa-check-circle" aria-hidden="true"></i>`;
    document.getElementById('tick-mark').style.color='green';
    document.getElementById('tick-mark').style.fontSize='80px';
    setTimeout(backs,2000);
}


function remove_cart_item(index){
    // console.log("removed from cart");

    var arr=localStorage.cart_items;
    // arr=arr.replace(/\"/g,"\'");
    arr=(arr.slice(1)).split('*');
    var array=[];
    var bool=false;
    var bool2=false;
    for(var i=0;i<arr.length;i++)
    {        
       
        if(i!=index)
        {
            array.push(arr[i]);
            
        }
        
        bool=true;
    }
    


    if(bool){
        if(array[0])
        {
        array[0]="*"+array[0];
        
        localStorage.cart_items=array.join('*');
        }
        else
        {
            localStorage.cart_items="";
            document.getElementById('cart-items').innerHTML= `<div id="Cart-head">Cart</div>`;
            bool2=true;
        }
  
    }

    
}
