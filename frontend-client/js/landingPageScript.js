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