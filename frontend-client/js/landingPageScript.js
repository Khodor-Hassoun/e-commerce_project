//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("erorr_message");
const signinModal = document.getElementById("signin_modal");
const signinButton = document.getElementById("signin_btn");
const close = document.getElementById("close");

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
    if(response.error != null ){
        error.textContent = response.error;
        return;
    }

    localStorage.setItem("userID", response.data.id)
    localStorage.setItem("token", response.data.token)

    if(response.data.user_type == "client"){
        window.location.replace("landingPage.html");
    }
    else{
        window.location.replace("/../frontend-seller/main_page_seller.html");
    }
 }
);
}
  
button.addEventListener("click", login);