//getting APIs urls
const getSellerAPI="http://localhost/backend/getSellers.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";
const addMessageAPI="http://localhost/backend/addMessage.php";

//initializing variables
const sellersDiv = document.querySelector("#getSellers");
const chatDiv = document.querySelector("#chat");
const userID = localStorage.getItem("userID");
const homeButton = document.querySelector(".header_cart");
let inputValue;
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
}

homeButton.onclick = function() {
    window.location.replace("landingPage.html");
}

const getSellers=()=>{

    //get sellers and show them in sellers div
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }

        //Loop over the response
        response.data.forEach(element => {
            const seller=document.createElement("div");
            sellersDiv.appendChild(seller);
            seller.innerText=element.username;
            seller.classList.add("slr");

            //on clicking on seller row, client is able to start chat
            seller.addEventListener("click",function(){
                startChat(element.id);

            });
        });
    });     
}      

const startChat=(sellerid)=>{
    const btmDiv=document.createElement("div");
    btmDiv.classList.add("input-msg")
    const inputMessage=document.createElement("INPUT");

    inputMessage.setAttribute("type", "text");
    inputMessage.classList.add("message-input");
    inputMessage.placeholder="Type Your Message Here..";

    btmDiv.appendChild(inputMessage);
    const sendBtn=document.createElement("button");

    sendBtn.classList.add("send-btn");
    sendBtn.innerText="Send";
    sendBtn.id=sellerid;

    //on clicking on send button, sendMessage function will be executed
    sendBtn.addEventListener("click",function(){
        inputValue=inputMessage.value;
        sendMessage(sellerid,inputValue)
       })

    btmDiv.appendChild(sendBtn);
    const data = new FormData();

    data.append("seller_id", sellerid);
    data.append("user_id", userID)
    
    axios.post(getMessagesAPI,data, config)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        
        if(response.data.length==0){
            //if no old messages found, display No Messages
            chatDiv.innerText=" "
            chatDiv.innerText="No messages";
            chatDiv.classList.add("no-msgs");
            chatDiv.appendChild(btmDiv)
        }
        //if there are old messages,display them
        else{
            chatDiv.innerText=" ";
            chatDiv.classList.remove("no-msgs");
            for(let i = 0; i < response.data.length; i++){
                const message=document.createElement("div");
                message.classList.add("message");
                
                //select from messages that are between loggedin user and clicked seller
                if((response.data[i].sender_id==sellerid && response.data[i].reciever_id==userID) || (response.data[i].sender_id==userID && response.data[i].reciever_id==sellerid)){
                    //if message is for loggedin user
                    if(response.data[i].sender_id==userID){
                        //display it and give it custom class
                            message.innerText=response.data[i].message;
                            chatDiv.appendChild(message)
                        
                    }
                    else{
                        //if message is for clicked seller
                        //display it and give it different class
                        message.innerText=response.data[i].message;
                        message.classList.add("light-blue-msg");
                        chatDiv.appendChild(message)
                    }
                }
            } 
            //add input and button Div at the bottom of the page
            chatDiv.appendChild(btmDiv)
      }
    });

}

const sendMessage=(id,value)=>{
    //post input data and user ids to database
    const data = new FormData();
    data.append("sender_id",userID)
    data.append("reciever_id", id);
    data.append("message", value);

    axios.post(addMessageAPI, data, config)
    .then(response => {
        window.location.replace("messages.html");
    })
    .catch((e)=>{
        console.log(e)
    });
}

//when page load,execute get sellers function
window.addEventListener("load",getSellers)