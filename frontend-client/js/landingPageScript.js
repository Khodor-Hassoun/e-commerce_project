//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const signupAPI = "http://localhost/backend/signup.php";
const resetPassAPI = "http://localhost/backend/resetClientPw.php";
const getRandAdsAPI = "http://localhost/backend/getRandomAds.php";
const editProfileAPI = "http://localhost/backend/editProfile.php";
const getVouchersAPI = "";

//Initialize variables
const wishlistButton = document.getElementById("wishlist_btn");
const cartButton = document.getElementById("cart_btn");
const loginButton = document.getElementById("login_btn");
const signinButton = document.getElementById("signin_btn");
const open_signup = document.getElementById("open_signup");
const signupButton = document.getElementById("create_account");
const editPorfileButton = document.getElementById("edit_profile");
const resetPassButton = document.getElementById("forgot_pass");
const signinModal = document.getElementById("signin_modal");
const editProfileModal = document.getElementById("edit_modal");
const resetPassModal = document.getElementById("reset_modal");
const signupModal = document.getElementById("signup_modal");
const voucherModal = document.getElementById("voucher_modal");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const errorEdit = document.getElementById("error_edit");
const errorCreate = document.getElementById("error_create");
const close = document.getElementById("close");
const close2 = document.getElementById("close2");
const close3 = document.getElementById("close3");
const close4 = document.getElementById("close4");
const close5 = document.getElementById("close5");
const new_email = document.getElementById("new_email");
const new_username = document.getElementById("new_username");
const new_password = document.getElementById("new_password");
const new_firstName = document.getElementById("new_first_name");
const new_lastName = document.getElementById("new_last_name");
const new_address = document.getElementById("new_address");
const new_phoneNumber = document.getElementById("new_phone_number");
const edit_email = document.getElementById("edit_email");
const edit_username = document.getElementById("edit_username");
const edit_firstName = document.getElementById("edit_first_name");
const edit_lastName = document.getElementById("edit_last_name");
const edit_address = document.getElementById("edit_address");
const edit_phoneNumber = document.getElementById("edit_phone_number");
const editButton = document.getElementById("edit_profile");
const logoutButton = document.getElementById("logout");
const resetPassEmail = document.getElementById("reset_email");
const resetStatus = document.getElementById("email_status");
const resetEmail = document.getElementById("reset_password");
const adElement = document.querySelector('#ad');
const messagesButton = document.getElementById("check_messages");
const checkVouchersButton = document.getElementById("check_voucher");
const sendVoucherButton = document.getElementById("send_voucher");

const ads = [];
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
}
let index = 0;

function changeImage(){
    //Go over the array and change the image
    adElement.src = ads[index];
    index > ads.length ? index = 0 : index++;
}

window.onload = function () {
    if(ads.length == 0){
        //If the array is empty, do nothing
        return;
    }
    else{
        //Change the image every 5 seconds
        setInterval(changeImage, 5000);
    }
};

const getRandomAds=()=>{
    axios.get(getRandAdsAPI)
    .then(response =>  {
       
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            ads.push(response.data[i].content);
        }
    });
}

const login = () => {
    
    //Save data
    const data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);

    //Send request to the server using axios
    axios.post(loginAPI, data)
    .then(function (response) {
    if(response.message != null ){
        error.textContent = "Invalid input";
        return;
    }

    //Check if the user is banned
    if(response.data.is_banned == 1){
        error.textContent = "Banned account";
        return;
    }

    //Save the token and the user ID on login
    localStorage.setItem("userID", response.data.id)
    localStorage.setItem("token", response.data.token)

    //Check the type of the user and redirect accordingly
    if(response.data.type == "client"){
        window.location.replace("landingPage.html");
    }
    else if (response.data.type == "seller"){
        window.location.replace("/../frontend-seller/main_page_seller.html");
    }
    else{
        error.textContent = "Invalid input";
    }
 })
  .catch((e)=>
  error.textContent = "Invalid input");
}

const createNewAccount = () => {
    //Save user's data
    const data = new FormData();
    data.append("email", new_email.value);
    data.append("username", new_username.value);
    data.append("password", new_password.value);
    data.append("firstName", new_firstName.value);
    data.append("lastName", new_lastName.value);
    data.append("address", new_address.value);
    data.append("phoneNumber", new_phoneNumber.value);

    //Send data to the server using axios
    axios.post(signupAPI, data)
    .then(
        response =>  {

        //Save token and ID in the local storage
        localStorage.setItem("userID", response.data.id)
        localStorage.setItem("token", response.data.token)

        //refresh page
        window.location.replace("landingPage.html");
    })
    .catch((e)=>
     errorCreate.textContent = "Invalid input");
}

const resetPass = () =>{
    //Get the email from the user
    const data = new FormData();
    data.append("email", resetPassEmail.value);

    //Send data to the server using axios
    axios.post(resetPassAPI, data, config)
    .then(response =>  {
        //On response, show message
        resetStatus.textContent = "Email sent!";
     })
    .catch((e)=>
      resetStatus.textContent = "Invalid input");
}

const editProfile = () => {
    //Save user's data
    const data = new FormData();
    data.append("id", localStorage.getItem("userID"))
    data.append("email", edit_email.value);
    data.append("username", edit_username.value);
    data.append("first_name", edit_firstName.value);
    data.append("last_name", edit_lastName.value);
    data.append("address", edit_address.value);
    data.append("phone_number", edit_phoneNumber.value);

    //Send data to the server using axios
    axios.post(editProfileAPI, data, config)
    .then(
        response =>  {
            editProfileModal.style.display = "none";
    })
    .catch((e)=>
    errorEdit.textContent = "Invalid input");
}

const logout = () => {
    wishlistButton.style.display = "none";
    cartButton.style.display = "none";
    editProfileModal.style.display = "none";

    localStorage.removeItem("userID");
    localStorage.removeItem("token");

    window.location.replace("landingPage.html");
}

signupButton.addEventListener("click", createNewAccount);
loginButton.addEventListener("click", login);
resetEmail.addEventListener("click", resetPass);
editButton.addEventListener("click", editProfile);
logoutButton.addEventListener("click", logout);
getRandomAds();

if(localStorage.getItem("userID")){
    wishlistButton.style.display = "block";
    cartButton.style.display = "block";

    //When the user clicks on the sign in button, a modal appears
    signinButton.onclick = function() {
        editProfileModal.style.display = "block";
    }

    close4.onclick = function() {
        editProfileModal.style.display = "none";
    }
}
else{
    //When the user clicks on the sign in button, a modal appears
    signinButton.onclick = function() {
        signinModal.style.display = "block";
    }

    //When the user clicks on reset password, a new modal appears
    resetPassButton.onclick = function() {
        signinModal.style.display = "none";
        resetPassModal.style.display = "block";
    }
    
    //Open sign up modal instead of sign in
    open_signup.onclick = function() {
        signinModal.style.display = "none";
        signupModal.style.display = "block";
    }
    
    //Close modals
    close.onclick = function() {
        signinModal.style.display = "none";
    }
    
    close2.onclick = function() {
        signupModal.style.display = "none";
    }
    close3.onclick = function() {
        resetPassModal.style.display = "none";
    }
}

//Close modals if clicked outside of them
window.onclick = function(event) {
    if (event.target == signinModal) {
        signinModal.style.display = "none";
    }
    if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
    if (event.target == resetPassModal) {
        resetPassModal.style.display = "none";
    }
    if(event.target == editProfileModal){
        editProfileModal.style.display = "none";
    }
}

messagesButton.onclick = function() {
    window.location.replace("messages.html");
}

wishlistButton.onclick = function() {
    window.location.replace("wishlistPage.html");
}

cartButton.onclick = function() {
    window.location.replace("cartPage.html");
}

checkVouchersButton.onclick = function() {
    editProfileModal.style.display = "none";
    voucherModal.style.display = "block";
}

close5.onclick = function() {
    voucherModal.style.display = "none";
}

//Get data from the server using axios
axios.get(getFavoriteItemsAPI, config)
.then(response =>  {

    favoritessUl.innerHTML = "";

    for(let i = 0; i < response.data.length; i++){   
        //Create a new list item and add it to the favorites container
        const li=document.createElement("li");
        li.innerHTML= response.data[i].name + "<br/>" + "Price:" + response.data[i].price + "$";
        li.id = response.data[i].id;
        favoritessUl.appendChild(li);
    }}
    )
.catch((e)=>{
    favoritessUl.innerHTML = "";

    //If there was an error, send back a message that there are no items
    const li=document.createElement("li");
    li.innerText="No Items";
    favoritessUl.appendChild(li);
});