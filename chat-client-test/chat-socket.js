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
document.getElementById('channelId').innerHTML = channelId;

const userMap = new Map();

const socket = io('http://localhost:3001', {
  path: '/chat',
  transports: ["websocket"],
  query: {
    "userId": userId,
    "userName": userName,
    "channelId": channelId
  }
});

//const socket = io("http://localhost:3000")

const updateUserList = (chatInfo) => {
  console.log(chatInfo);
  removeConnectionListItem(connectionIdList);
  userMap.clear();
  for (const data of chatInfo) {
    addConnectionListItem(data._id, data.userName);
    userMap.set(data._id, data);
  }
};

socket.on('new-connection', (chatInfo) => {
  updateUserList(chatInfo);
})

socket.on('new-disconnection', (chatInfo) => {
  updateUserList(chatInfo);
})

socket.on('new-channel-message', (chatInfo) => {
  console.log(chatInfo);
})

socket.on('channel-message-history', (chatInfo) => {
  console.log(chatInfo);
})

socket.on('new-private-message', (chatInfo) => {
  console.log(chatInfo);
})

socket.on('private-message-history', (chatInfo) => {
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
  console.log('load-channel-message-history');
  socket.emit('load-channel-message-history', {
    channelId: channelId
  })
}

const handleSubmitPrivateMessage = () => {
  console.log('send-private-message');
  socket.emit('send-private-message', {
    channelId: channelId,
    senderUserName: userName,
    senderUserId: userId,
    receiverUserName: userMap.get(connectionIdList.value).userName,
    receiverUserId: userMap.get(connectionIdList.value).userId,
    receiverConnectionId: connectionIdList.value,
    message: message.value
  })
};

const handleLoadPrivateMessage = () => {
    console.log('load-private-message-history');
    socket.emit('load-private-message-history', {
      channelId: channelId,
      senderUserId: userId,
      receiverUserId: userMap.get(connectionIdList.value).userId
    })
    socket.emit('load-private-message-history', {
      channelId: channelId,
      senderUserId: userMap.get(connectionIdList.value).userId,
      receiverUserId: userId
    })
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