//Intialize APIs
const getSellerAPI = "http://localhost/e-commerce_project/backend/getSellers.php";
const deleteSellerAPI = "http://localhost/e-commerce_project/backend/deleteSeller.php";
const addSellerAPI = "http://localhost/e-commerce_project/backend/addSeller.php";
const editSellerAPI = "http://localhost/e-commerce_project/backend/editSeller.php";

//Intialize variables
const editUserModal = document.querySelector(".edit_user_modal");
const addUserModal = document.querySelector(".add_user_modal");
const addUserButton = document.getElementById("add_seller");
const editUserButton = document.getElementById("edit_seller")
const closeButton = document.getElementById("close");
const closeButton2 = document.getElementById("close2");
const new_email = document.getElementById("new_email");
const new_username = document.getElementById("new_username");
const new_password = document.getElementById("new_password");
const new_firstName = document.getElementById("new_first_name");
const new_lastName = document.getElementById("new_last_name");
const new_address = document.getElementById("new_address");
const new_phoneNumber = document.getElementById("new_phone_number");
const addSellerBtn = document.getElementById("add_seller_btn");

const edit_email = document.getElementById("edit_email");
const edit_password = document.getElementById("edit_password");
const edit_firstName = document.getElementById("edit_first_name");
const edit_lastName = document.getElementById("edit_last_name");
const edit_address = document.getElementById("edit_address");
const edit_phoneNumber = document.getElementById("edit_phone_number");
const editSellerBtn = document.getElementById("edit_seller_btn");


const config = {
  headers: {
    Authorization: localStorage.getItem("token")
  }
}

// When the user clicks on the button, open the modal
addUserButton.onclick = function() {
  addUserModal.style.display = "block";
}

// When the user clicks on x, close the modal
closeButton.onclick = function() {
  addUserModal.style.display = "none";
}

// When the user clicks on x, close the modal
closeButton2.onclick = function() {
  editUserModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editUserModal) {
    editUserModal.style.display = "none";
  }

  if (event.target == addUserModal) {
    addUserModal.style.display = "none";
  }
}

const getSellers = () =>{
    //Recieve data from server
    axios.get(getSellerAPI, config)
    .then(
        data =>  {
        //Show error
        if (data.data.message !== undefined) {
            //Do nothing
            return
        }

        //Loop over the response
        for(let i = 0; i < Object.keys(data.data).length; i++){

            //Get original seller row and make a clone
            let originalItem = document.querySelector(".seller");
            let clone = originalItem.cloneNode(true);
            clone.id = data.data[i].id;
            clone.style.display="table-row-group";

            //Add first name
            let firstname = clone.querySelector("#firstname");
            firstname.textContent = data.data[i].first_name;

            //Add last name
            let lastname = clone.querySelector("#lastname");
            lastname.textContent = data.data[i].last_name;

            //Add email
            let email = clone.querySelector("#email");
            email.textContent = data.data[i].email;

            //Add address
            let address = clone.querySelector("#address");
            address.textContent = data.data[i].address;

            //Add phone number
            let phoneNumber = clone.querySelector("#phone_number");
            phoneNumber.textContent = data.data[i].phone_number; 
            
            //Get edit button and save the user's id in it
            let editUserBtn = clone.querySelector(".edit_seller");
            editUserBtn.setAttribute('id', data.data[i].id);
          

            // When the user clicks on the button, open the modal
            editUserBtn.onclick = function() {
              editUserModal.style.display = "block";
            }
            //when the user click on editUserBtn, update seller
            editSellerBtn.addEventListener("click", ()=>{
              userID = editSellerBtn.getAttribute('id');
  
              const data = new FormData();
              data.append("id",userID);
              data.append("email", edit_email.value);
              data.append("password", edit_password.value);
              data.append("firstName", edit_firstName.value);
              data.append("lastName", edit_lastName.value);
              data.append("address", edit_address.value);
              data.append("phoneNumber", edit_phoneNumber.value);
              //Send data to the server using axios
              axios.post(editSellerAPI, data, config)
              .then(
                  data =>  {
                  //Show error
                  if (data.message == "") {
                      //Do nothing
                      return
                  }

          //refresh page
          window.location.replace("seller_page.html"); 
      })
          })
            
            //Get delete button and save the user's id in it
            let deleteUserBtn = clone.querySelector(".delete_seller");
            deleteUserBtn.setAttribute('id', data.data[i].id);

            //When the user clicks on the delete button, a seller gets deleted
            deleteUserBtn.addEventListener("click", (event)=>{
                userID = deleteUserBtn.getAttribute('id');

                axios.get(deleteSellerAPI + "?id=" + userID, config)
                .then( data => {
                    if (data.error !== undefined) {
                        //Do nothing
                        return
                    }

                    window.location.replace("seller_page.html"); 
                })
            })

            originalItem.before(clone);
    }
})
}

const addSeller = () => {
      const data = new FormData();
      data.append("email", new_email.value);
      data.append("username", new_username.value);
      data.append("password", new_password.value);
      data.append("firstName", new_firstName.value);
      data.append("lastName", new_lastName.value);
      data.append("address", new_address.value);
      data.append("phoneNumber", new_phoneNumber.value);

      //Send data to the server using axios
      axios.post(addSellerAPI, data, config)
      .then(
          data =>  {
          //Show error
          if (data.message == "") {
              //Do nothing
              return
          }

          //refresh page
          window.location.replace("seller_page.html"); 
      })
}


getSellers();
addSellerBtn.addEventListener("click", addSeller);