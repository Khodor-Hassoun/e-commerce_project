//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("erorr_message");

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

 if(response.data.type != "admin"){
      error.textContent = "Invalid user";
      return;
 }

 localStorage.setItem("userID", response.data.id)
 localStorage.setItem("token", response.data.token)

 window.location.replace("./seller_page.html");
 }
);
}
  
button.addEventListener("click", login);