const message = document.getElementById('message');
const connectionIdList = document.getElementById('connections');
// const channelId = prompt("Please enter the channel id:");
const userId = prompt("Please enter the user id:");
const userName = prompt("Please enter the user name:");

const channelId = "channel1";
// const userId = "001";
// const userName = "テスト名前";
document.getElementById('userId').innerHTML = userId;
document.getElementById('userName').innerHTML = userName;

// const socket = io('http://localhost:3000', {
//   path: '/chat',
//   transports: ["websocket"],
//   query: { userId, userName, channelId},
//   upgrade: false
// });

const socket = io('http://localhost:3000', {
  path: '/chat'
});

//const socket = io("http://localhost:3000")

socket.on('new-channel-message', (chatInfo) => {
  console.log(chatInfo);
})

const handleSubmitChannelMessage = () => {
  console.log('send-channel-message');
  socket.emit('send-channel-message', {
    channelId: channelId,
    userId,
    userName,
    message: message.value
  })
};
const handleLoadChannelMessage = () => {
  
}

const handleSubmitPrivateMessage = () => {
  
};

const handleLoadPrivateMessage = () => {
  
}

const handleNewMessage = (chatInfo) => {
  const messages = document.getElementById(chatInfo.channelId);
  messages.appendChild(buildNewMessage(chatInfo.userName, chatInfo.message, chatInfo.chatTime));
}

const buildNewMessage = (userName, message, chatTime) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`User ${userName} said : ${message} on time ${chatTime}`))
  return li;
}

const addConnectionListItem = (connectionId, userName) => {
  const opt = document.createElement("option");
  opt.value = connectionId;
  opt.innerHTML = userName;
  connectionIdList.appendChild(opt);
}

const removeConnectionListItem = (x) => {
  if (x.hasChildNodes()) {
    while (x.childNodes.length > 0) {
      x.removeChild(x.firstChild)
    }
  }
}