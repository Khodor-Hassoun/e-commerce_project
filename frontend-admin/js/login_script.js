//Initialize APIs
const loginAPI = "http://localhost/e-commerce/login.php";
const axios = require('axios').default;
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("erorr_message");

const login = () => {
  axios.post(loginAPI, {
    email: `${email.value}`,
    password: `${password.value}`
  })
  .then(function (response) {
     if(response.error != NULL ){
      error.textContent = response.error;
      return;
    }

    window.location.replace("./seller.html");
    localStorage.setItem("userID", response.id)
    }
  )
}
  
button.addEventListener("click", login);