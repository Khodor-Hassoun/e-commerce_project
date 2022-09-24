//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const signupAPI = "http://localhost/backend/signup.php";
const resetPassAPI = "http://localhost/backend/resetClientPw.php";
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const signinModal = document.getElementById("signin_modal");
const signinButton = document.getElementById("signin_btn");
const close = document.getElementById("close");
const close2 = document.getElementById("close2");
const open_signup = document.getElementById("open_signup");
const signupModal = document.getElementById("signup_modal");
const new_email = document.getElementById("new_email");
const new_username = document.getElementById("new_username");
const new_password = document.getElementById("new_password");
const new_firstName = document.getElementById("new_first_name");
const new_lastName = document.getElementById("new_last_name");
const new_address = document.getElementById("new_address");
const new_phoneNumber = document.getElementById("new_phone_number");
const signupButton = document.getElementById("create_account");
const resetPassButton = document.getElementById("forgot_pass");
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }

if(localStorage.getItem("userID"))

signinButton.onclick = function() {
    signinModal.style.display = "block";
}

close.onclick = function() {
    signinModal.style.display = "none";
}

open_signup.onclick = function() {
    signinModal.style.display = "none";
    signupModal.style.display = "block";
}

close2.onclick = function() {
    signupModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == signinModal) {
    signinModal.style.display = "none";
  }
  if (event.target == signupModal) {
    signupModal.style.display = "none";
  }
}

const login = () => {
    const data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);

    axios.post(loginAPI, data)
    .then(function (response) {
    if(response.message != null ){
        error.textContent = "Invalid input";
        return;
    }

    localStorage.setItem("userID", response.data.id)
    localStorage.setItem("token", response.data.token)

    console.log(response.data);

    if(response.data.is_banned == 1){
        error.textContent = "Banned account";
        return;
    }

    if(response.data.type == "client"){
        window.location.replace("landingPage.html");
    }
    else if (response.data.type == "seller"){
        window.location.replace("/../frontend-seller/main_page_seller.html");
    }
    else{
        error.textContent = "Invalid input";
    }
 }
);
}

const createNewAccount = () => {
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

        localStorage.setItem("userID", response.data.id)
        localStorage.setItem("token", response.data.token)

        //refresh page
        window.location.replace("landingPage.html");
    })
}

const resetPass = () =>{
     //Send data to the server using axios
     axios.post(signupAPI, data)
     .then(
         response =>  {
 
         localStorage.setItem("userID", response.data.id)
         localStorage.setItem("token", response.data.token)
 
         //refresh page
         window.location.replace("landingPage.html");
     })
}

signupButton.addEventListener("click", createNewAccount)
button.addEventListener("click", login);
resetPassButton.addEventListener("click", resetPass);