//getting APIs urls
const getSellerAPI="http://localhost/backend/getSellers.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";
const addMessageAPI="http://localhost/backend/addMessage.php";
//initializing variables
const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
let inputValue;
const userID=localStorage.getItem("userID");

const getSellers=()=>{//get sellers and show them in sellers div
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        console.log(response.data)
        //Loop over the response
        response.data.forEach(element => {
            const seller=document.createElement("div");
            sellersDiv.appendChild(seller);
            seller.innerText=element.username;
            seller.classList.add("slr");
            seller.addEventListener("click",function(){//on clicking on seller row, client is able to start chat
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
    sendBtn.addEventListener("click",function(){//on clicking on send button, sendMessage function will be executed
        inputValue=inputMessage.value;
        sendMessage(sellerid,inputValue)
       })
    btmDiv.appendChild(sendBtn);
    const data = new FormData();
    data.append("seller_id", sellerid);
    data.append("user_id", userID)
    
    axios.post(getMessagesAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        
        if(response.data.length==0){//if no old messages found, display No Messages
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
                     if(response.data[i].sender_id==userID){//if message is for loggedin user
                            message.innerText=response.data[i].message;//display it and give it custom class
                            chatDiv.appendChild(message)
                        
                    }
                    else{//if message is for clicked seller
                        message.innerText=response.data[i].message;//display it and give it different class
                        message.classList.add("light-blue-msg");
                        chatDiv.appendChild(message)
                    }
                }
                
            } 
            chatDiv.appendChild(btmDiv)//add input and button Div at the bottom of the page
      }
    });

}

const sendMessage=(id,value)=>{//post input data and user ids to database
    const data = new FormData();
   data.append("sender_id",userID)
    data.append("reciever_id", id);
    data.append("message", value);
    axios.post(addMessageAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
       
        
    });
}
window.addEventListener("load",getSellers)//when page load,execute get sellers function