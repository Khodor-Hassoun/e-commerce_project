//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const signinModal = document.getElementById("signin_modal");
const signinButton = document.getElementById("signin_btn");
const close = document.getElementById("close");

if(localStorage.getItem("userID"))

signinButton.onclick = function() {
    signinModal.style.display = "block";
}

close.onclick = function() {
    signinModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == signinModal) {
    signinModal.style.display = "none";
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
  
button.addEventListener("click", login);