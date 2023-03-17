import { useState } from "react"
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import { Input, Button } from '@nutui/nutui-react'

interface Message {
  text: string
  sender: "user" | "bot"
}

function Chat() {
  const [inputValue, setInputValue] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = () => {
    setMessages([...messages, { text: inputValue, sender: "user" }])
    if (inputValue.trim()) {
      setInputValue("")
      Taro.request({
        url: "https://api.openai-proxy.com/v1/chat/completions",
        method: "POST",
        data: {
          apiKey: "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",
          sessionId: "1433223",
          content: inputValue.trim(),
        },
      }).then((res) => {
        console.log(res)
        console.log(111, messages)
        // setMessages([
        //   ...messages,
        //   { text: res.data.data, sender: "bot" },
        // ])
      })
    }
  }

  return (
    <View className='chat px-32px'>
      <View className='messages'>
        {messages.map((message, index) => (
          <View
            key={index}
            className={`message ${message.sender === "user" ? "txt-left" : "txt-right"
              }`}
          >
            {message.sender === "user" ? (
              <span>user:{message.text}</span>
            ) : (
              <span>{message.text}:bot</span>
            )}
          </View>
        ))}
      </View>
      <View className='input-container'>
        <Input
          className='input'
          defaultValue={inputValue}
          placeholder='Type your message here'
          onInput={(e) => setInputValue(e.target.value)}
        />
        <Button className='send-button' onClick={sendMessage}>
          Send
        </Button>
      </View>
    </View>
  )
}

export default Chat
