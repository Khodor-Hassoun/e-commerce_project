const getSellerAPI = "";

const getSellers = () =>{
    // Send the data to the database using POST method
    axios.get(getSellerAPI)
    .then(
        data =>  {
        //Show error
        if (data.message !== undefined) {
            //Do nothing
            return
        }

        //Loop over the response
        for(let i = 0; i < Object.keys(data).length; i++){
            //Make a clone of the seller table row
            let originalItem = document.querySelector(".client");
            let clone = originalItem.cloneNode(true);
            clone.style.display ="block";
            clone.id= data[i].tweet_id;
            clone.classList.add("client");

            //Add first name
            let firstname = clone.querySelector("#firstname");
            firstname.textContent = data[i].firstname;

            //Add last name
            let lastname = clone.querySelector("#lastname");
            lastname.textContent = data[i].lastname;

            //Add email
            let email = clone.querySelector("#email");
            email.textContent = data[i].email;

            //Add address
            let address = clone.querySelector("#address");
            address.textContent = data[i].address;

            //Add phone number
            let phoneNumber = clone.querySelector("#phone_number");
            phoneNumber.textContent = data[i].phone_number;            
    }
})
}

getSellers();