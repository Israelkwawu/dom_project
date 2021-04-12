class Product{
    static cart = [];
    constructor(title, price, stock, imageURL , description){
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.imageURL = "img/"+imageURL+".jpg";
    }

    addProductToCart(){
        Product.cart.push(this);
        const index = Product.getCartSize()-1;
        return index;
    }

    static getProduct(index){
        return Product.getCart()[index];
    }

   
    static getCart(){
        return Product.cart;
    }

    static getCartSize(){
        return Product.cart.length;
    }

}

class WristWatch extends Product{

}

class Camera extends Product{

}

class Headset extends Product{

}

class Shoe extends Product{

}

class CoffeeBean extends Product{

}


class Shade extends Product{

}


class Drink extends Product{

}

class Glass extends Product{

}

class Parfum extends Product{

}

class ToyCar extends Product{

}




const closeBtn = document.querySelector("#close");
const lightBox = document.querySelector("#light-box");
const addProductForm = document.querySelector("#addProductForm");
const lightBoxHandler = ()=>{
    lightBox.classList.toggle('invisible');
}
closeBtn.addEventListener("click",lightBoxHandler);
addProductForm.addEventListener("click",lightBoxHandler);

const submitProduct = document.querySelector("form");

submitProduct.addEventListener("submit",function(e){
    e.preventDefault();
    e.stopPropagation();
    const formValues = this.querySelectorAll("input, textarea");
    const errorMsg = ['Please Enter Product Title','Please Enter Product Price','Please Enter Product Stock','Please Enter Product Image URL','Please Enter Product Decscription'];
    let isOk = true;
     
    for (let index = 0; index < formValues.length-1; index++) {
        if(formValues[index].value == null || formValues[index].value == undefined || formValues[index].value == '') {
           let errorDisplay  = document.createElement('span');
           
           errorDisplay.textContent = errorMsg[index];
           errorDisplay.setAttribute('class','error');
           formValues[index].before(errorDisplay);
           isOk &&= false;
           
        } else{
            isOk &&= true;
        }
        
    }

    if(isOk){
        let title = formValues[0].value;
        let price = formValues[1].value;
        let stock = formValues[2].value;
        let description = formValues[3].value;
        let imageurl = formValues[4].value;

        let index = createProduct(title, price, stock, description, imageurl );
        
        if(index > -1){
          resetForm(this);
          alert("Product Added Successfully");
          lightBoxHandler();
          populateProduct(Product.getProduct(index));
        }

    }else{
        // alert("An Error Occurred.");
        // lightBoxHandler();
    }

   
});

let resetForm = form => {

    const formValues = form.querySelectorAll("input, textarea");
    for (let index = 0; index < formValues.length-1; index++) {
        formValues[index].value = '';    
    }
}

let createProduct = (title, price, stock, imageurl ,decscription) => {
    //create product base on the image url
    //redundant
    //
    let product = null;

    if(imageurl.includes('wristwatch')){

        product = new WristWatch(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('camera')){

        product = new Camera(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('headset')){

        product = new Headset(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('shoe')){

        product = new Shoe(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('coffeebean')){

        product = new CoffeeBean(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('shade')){

        product = new Shade(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('pepsi')){

        product = new Drink(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('glass')){

        product = new Glass(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('parfum')){

        product = new Parfum(title, price, stock, imageurl, decscription);

    }else if(imageurl.includes('toycar')){

        product = new ToyCar(title, price, stock, imageurl, decscription);

    }else{
        product = new Product(title, price, stock, imageurl, decscription);

    }

    return product.addProductToCart();
   
}



let deleteProduct = () => {
    //delete product from page when close button is clicked
    const items = Product.getCart();
    let deleteBtn = document.querySelectorAll('.delete');
   
   if(deleteBtn.length != 0){
        for (let index = 0; index < deleteBtn.length; index++) {
            deleteBtn[index].addEventListener("click",function () {
                items.splice(index,1);    
                this.closest('div').classList.toggle('invisible');

            });     
        }
        
   }
}

let numberOfItemInCart = 0;
let badge = document.querySelector("#badge");

let cartHandler = () => {
    //increase and decrease cart value
    let addToCartBtn = document.querySelectorAll('.add-to-cart');
//    console.log(addToCartBtn);
    if(addToCartBtn.length != 0){
        for (let index = 0; index < addToCartBtn.length; index++) {
            addToCartBtn[index].addEventListener("click",function () {
                const addBtn = this;
                const removeBtn = document.createElement('button');
                removeBtn.textContent = "Remove From Cart";
                removeBtn.className = "remove-from-cart";
                removeBtn.onclick = function () {
                    
                    numberOfItemInCart --;
                    badge.textContent =  numberOfItemInCart;
                    this.replaceWith(addBtn);
                    console.log(numberOfItemInCart);
                }
                numberOfItemInCart ++;
                badge.textContent =  numberOfItemInCart;
                this.replaceWith(removeBtn);
                
                console.log(numberOfItemInCart);
            });  
               
        }      
   }

}

let expandDescriptionHandler = () =>{

    let expandBtn = document.querySelectorAll('small');
    if(expandBtn.length != 0){
        for (let index = 0; index < expandBtn.length; index++) {
            expandBtn[index].addEventListener("click",function () {
                this.closest('h3').nextElementSibling.style.overflow = 'scroll';
                const plusBtn = this;
                const minusBtn = document.createElement('small');
                minusBtn.textContent = "-";
                minusBtn.onclick = function () {
                   
                    this.replaceWith(plusBtn);
                    plusBtn.closest('h3').nextElementSibling.style.overflow = 'hidden';
                }
              
                this.replaceWith(minusBtn);
                
            });
            
        }
    }
} 


let populateProduct = (item = null)=>{
    let main = document.querySelector("main");
    let content = `
    <div class="card">
                    <span title="Click to delete" class="delete">&times;</span>
                    <h2>Pepsi</h2>
                    <div class="product-image">
                        <img src="img/pepsi.jpg" alt="Pepsi">
                    </div>
                    <div class="product-detail">
                        <h3>Price</h3>
                        <div>$ 23</div>
                        <h3>Stock</h3>
                        <div>2</div>
                        <h3>Description  <small>+</small></h3>
                        <div>
                        cold, more, warm, large, regular, free, empty, rival, much, lukewarm, flat, last, anti, ounce, daytona, archrival, third, usual, less, open, non, extra, giant, tall, past, bottled, clear
                        </div>
                        <button class="add-to-cart">Add To Cart</button>
                    </div>
                    
                </div>
                <div class="card">
                    <span title="Click to delete" class="delete">&times;</span>
                    <h2>coffee bean</h2>
                    <div class="product-image">
                        <img src="img/coffebean.jpg" alt="Pepsi">
                    </div>
                    <div class="product-detail">
                        <h3>Price</h3>
                        <div>$ 23</div>
                        <h3>Stock</h3>
                        <div>2</div>
                        <h3>Description  <small>+</small></h3>
                        <div>
                        Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. When coffee berries turn from green to bright red in color – indicating ripeness – they are picked, processed, and dried.
                        </div>
                        <button class="add-to-cart">Add To Cart</button>
                    </div>
                    
                </div>
                <div class="card">
                    <span title="Click to delete" class="delete">&times;</span>
                    <h2>Camera</h2>
                    <div class="product-image">
                        <img src="img/camera.jpg" alt="Pepsi">
                    </div>
                    <div class="product-detail">
                        <h3>Price</h3>
                        <div>$ 23</div>
                        <h3>Stock</h3>
                        <div>2</div>
                        <h3>Description  <small>+</small></h3>
                        <div>
                        A camera is an optical instrument used to capture an image. At their most basic, cameras are sealed boxes (the camera body) with a small hole (the aperture) that allows light in to capture an image on a light-sensitive surface (usually photographic film or a digital sensor). Cameras have various mechanisms to control how the light falls onto the light-sensitive surface. Lenses focus the light entering the camera, the size of the aperture can be widened or narrowed to let more or less light into the camera, and a shutter mechanism determines the amount of time the photo-sensitive surface is exposed to the light.
                        </div>
                        <button class="add-to-cart">Add To Cart</button>
                    </div>
                    
                </div>
                <div class="card">
                    <span title="Click to delete" class="delete">&times;</span>
                    <h2>Men Wear</h2>
                    <div class="product-image">
                        <img src="img/menswear.jpg" alt="Pepsi">
                    </div>
                    <div class="product-detail">
                        <h3>Price</h3>
                        <div>$ 23</div>
                        <h3>Stock</h3>
                        <div>2</div>
                        <h3>Description  <small>+</small></h3>
                        <div>
                        Casual dress code for men is perhaps men’s best chance to express a true sense of personal style.

Whether you prefer something sleek or rugged, upscale or down-to-earth, men’s casual wear is an open invitation to dress in what feels most comfortable to you.

Rather than focusing on formalities, dressing casually is about finding the right balance between comfort, individuality, and style – think fashionable yet functional outfits.
                        </div>
                        <button class="add-to-cart">Add To Cart</button>
                    </div>
                    
                </div>
    `;//main.innerHTML;
    let product = content;

    if (item != null) {
        product += `
        <div class="card">
            <span title="Click to delete" class="delete">&times;</span>
            <h2>${item.title}</h2>
            <div class="product-image">
                <img src="${item.imageURL}" alt="${item.title}">
            </div>
            <div class="product-detail">
                <h3>Price</h3>
                <div>${"$ "+item.price}</div>
                <h3>Stock</h3>
                <div>${item.stock}</div>
                <h3>Description  <small>+</small></h3>
                <div>
                ${item.description}
                </div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
        </div>
        `;
        main.innerHTML = product;
       
    } else {
        main.innerHTML = product;
    }
 


    cartHandler();
    expandDescriptionHandler();
    deleteProduct();   

}

populateProduct();