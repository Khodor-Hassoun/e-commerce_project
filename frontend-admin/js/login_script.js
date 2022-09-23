//Initialize APIs
const loginAPI = "http://localhost/test/signin.php";
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("erorr_message");

const login = () => {
  const data = new FormData();
  data.append("email", email.value);
  data.append("password", password.value)

  axios.post(loginAPI, data)
  .then(function (response) {
  if(response.error != null ){
   error.textContent = response.error;
   return;
 }

 window.location.replace("./seller_page.html");
 localStorage.setItem("userID", response.id)
 }
);

  
}
  
button.addEventListener("click", login);