const socket = io();
        
        
        const sendBTN=document.querySelector('.sendbtn');
        const display=document.getElementById('messaged');
        socket.on('new-user-joined',(newUserMessage)=>{
            const newUserP=document.createElement('p');
            newUserP.classList.add('newUser');
            display.append(newUserP);
            newUserP.textContent= newUserMessage;
            
        })
        socket.on('message',(message)=>{
            const p=document.createElement('p');
            display.append(p);
            p.textContent= message;
            console.log(message);
            
        })
        
        const userName = prompt('Enter Your Name');
        socket.emit('adduser', {'username':userName});
        sendBTN.addEventListener("click",()=>{
            const messageInput=document.getElementById('message').value;
                socket.emit('user-message',messageInput);
                messageInput.value = '';
        })

