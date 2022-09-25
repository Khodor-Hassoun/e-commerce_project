const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";


const getSellers=()=>{
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
            console.log(element)
            const seller=document.createElement("div");
            sellersDiv.appendChild(seller);
            seller.innerText=element.username;
            seller.style.backgroundColor="#1F7A8C";
            seller.style.margin="1px";
            seller.classList.add("seller-row");
            seller.addEventListener("click",function(){
                startChat(element.id);

            });
        });
        });
           
    }      

const startChat=(sellerid)=>{
    alert(sellerid)
    
    const btmDiv=document.createElement("div");
    btmDiv.classList.add("input-msg")
    
    const inputMessage=document.createElement("input");
    inputMessage.classList.add("message-input");
    inputMessage.placeholder="Type Your Message Here..";
    btmDiv.appendChild(inputMessage);
    const sendBtn=document.createElement("button");
    sendBtn.classList.add("send-btn");
    sendBtn.innerText="Send";
    sendBtn.id=sellerid;
    sendBtn.addEventListener("click",function(){
        sendMessage(sellerid)
       })
    btmDiv.appendChild(sendBtn);
    const data = new FormData();
    data.append("seller_id", sellerid);
    data.append("user_id", 41)
    
    axios.post(getMessagesAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        
        if(response.data.length==0){
            chatDiv.innerText=" "
            chatDiv.innerText="No messages"
            chatDiv.style.color="white"
            chatDiv.appendChild(btmDiv)
    }
        //Loop over the response
        else{
            chatDiv.innerText=" ";
            for(let i = 0; i < response.data.length; i++){
                const message=document.createElement("div");
                message.classList.add("message");
                if((response.data[i].sender_id==sellerid && response.data[i].reciever_id==41) || (response.data[i].sender_id==41 && response.data[i].reciever_id==sellerid)){
                     message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                }
                
            } 
            chatDiv.appendChild(btmDiv)
      }
    });

}

const sendMessage=(id)=>{
    console.log(id)
}
window.addEventListener("load",getSellers)