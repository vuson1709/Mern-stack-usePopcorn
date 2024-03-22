import { useState } from "react";
// import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
// import "./ChatWidget.css";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export default function ChatWidget() {
  const [closeChat, setCloseChat] = useState(true);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello and welcome to our store, where your garments are treated with the utmost care and precision. My name is Beth, and I'm here to assist you with all your dry cleaning needs, ensuring your clothing looks immaculate and is ready on time.",
      sender: "ChatGPT",
    },
  ]);

  function handleToggleChatIcon() {
    setCloseChat((is) => !is);
  }

  async function handleSend(message) {
    const newMessage = {
      message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessenges = [...messages, newMessage];

    // update our messages state
    setMessages(newMessenges);

    // set a typing indicator (chatgpt is responding)
    setTyping(true);

    // process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessenges);
  }

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messsageObj) => {
      let role = "";
      if (messsageObj.sender === "chatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role, content: messsageObj.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "Your name is Beth, a customer assistant for Movie Database. Your job is explain to customer in Movie Database and don't give context to others except Movie Database",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            user: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className="App">
      <div
        style={
          {
            // position: "absolute",
            // height: "500px",
            // width: "300px",
            // left: "0",
          }
        }
        className="chatContainer"
      >
        {closeChat && (
          <button className="btn-close" onClick={handleToggleChatIcon}>
            ❌
          </button>
        )}
        {closeChat && (
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <Avatar src="/src/assets/avatar.png" name="Eliot" />
                <ConversationHeader.Content
                  userName="Beth"
                  info="Online just now"
                  style={{ textAlign: "left" }}
                />
              </ConversationHeader>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? <TypingIndicator content="Beth is typing" /> : "null"
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>

              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              ></MessageInput>
            </ChatContainer>
          </MainContainer>
        )}

        {!closeChat && <IconChat onToggleChatIcon={handleToggleChatIcon} />}
      </div>
    </div>
  );
}

function IconChat({ onToggleChatIcon }) {
  return (
    <div className="icon-chat">
      <p onClick={onToggleChatIcon}>Click here to open chat</p>
    </div>
  );
}
