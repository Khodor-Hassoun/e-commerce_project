const button = document.getElementById("login_btn");

const redirect = () => {
  window.location.replace("./seller.html");
}

button.addEventListener("click", redirect);