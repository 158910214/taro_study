/* eslint-disable jsx-quotes */
import React, { useState } from "react"
import Taro from "@tarojs/taro"
import { View, Input, Button, Image } from "@tarojs/components"

interface Message {
  text: string
  sender: "user" | "bot"
}

function Chat() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { text: '你好', sender: "user" },
    { text: '你好！有什么可以帮助你的吗？', sender: "bot" },
  ])

  const [loading, setLoading] = useState(false)
  const [errmsg, setErrmsg] = useState('')
  const sendMessage = () => {
    if (!inputValue.trim()) return setErrmsg('好歹说点什么吧')
    setErrmsg('')
    setLoading(true)
    setMessages([...messages, { text: inputValue, sender: "user" }])
    console.log('inputValue', inputValue)
    setInputValue("")
    Taro.request({
      url: "https://api.openai-proxy.com/v1/chat/completions",
      method: "POST",
      data: {
        apiKey: "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",
        sessionId: "1433223q",
        content: inputValue.trim(),
      },
      success(res) {
        setLoading(false)
        setMessages([
          ...messages,
          { text: inputValue, sender: "user" },
          { text: res.data.data, sender: "bot" },
        ])
      },
      fail(err) {
        console.log(err)
        setErrmsg(err.errMsg)
        setLoading(false)
      }
    })
  }

  return (
    <View className='w-screen h-screen chat '>
      <View className='messages p-32px'>
        {messages.map((message, index) => (
          <View
            key={index}
            className={`message ${message.sender === "user" ? "txt-left" : "txt-right"} text-32px mt-18px`}
          >
            {message.sender === "user" ? (
              <View className="flex">
                <Image style='width: 20px;height: 20px;background: #fff;' src='https://api.iconify.design/raphael:anonymous.svg?color=%23888888' />
                {/* <svg width="1em" height="1em" viewBox="0 0 32 32">
                  <path fill="#888888" d="M28.523 23.813c-.518-.51-6.795-2.938-7.934-3.396c-1.133-.45-1.585-1.697-1.585-1.697s-.51.282-.51-.51c0-.793.51.51 1.02-2.548c0 0 1.415-.397 1.134-3.68h-.34s.85-3.51 0-4.698c-.853-1.188-1.187-1.98-3.06-2.548c-1.87-.567-1.19-.454-2.548-.396c-1.36.057-2.492.793-2.492 1.188c0 0-.85.057-1.188.397c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.624l-.337.11c-.283 3.284 1.132 3.682 1.132 3.682c.51 3.058 1.02 1.755 1.02 2.548c0 .792-.51.51-.51.51s-.453 1.246-1.585 1.697c-1.132.453-7.416 2.887-7.927 3.396c-.51.52-.453 2.896-.453 2.896h26.954s.063-2.378-.453-2.897zm-11.905-10.12c-.398-.25-.783-1.21-.783-1.64v-.236c-.105-.106-.574-.096-.67 0v.236c0 .43-.385 1.39-.783 1.64c-.4.25-1.61.237-2.084-.236c-.473-.473-.524-1.663-.643-1.78c-.118-.12-.185-.185-.185-.185l.03-.414s.84-.207 1.698-.207s1.803.503 1.803.503c.232-.074.785-.083.997 0c0 0 .945-.502 1.803-.502s1.7.208 1.7.208l.028.414l-.185.185c-.118.118-.17 1.308-.643 1.78c-.47.473-1.682.487-2.082.236z"></path>
                </svg> */}
                <span>{message.text}</span>
              </View>
            ) : (
              <View className="flex justify-end">
                <span>{message.text}</span>
                <Image style='width: 20px;height: 20px;background: #fff;' src='https://api.iconify.design/raphael:android.svg?color=%23888888' />
              </View>
            )}
          </View>
        ))}
      </View>
      <View className='fixed bottom-40px left-0 right-0 px-32px'>
        <Input
          className=' border b-#ccc mb-20px'
          value={inputValue}
          focus
          placeholder='来说点什么吧...'
          onInput={(e) => setInputValue(e.target.value)}
        />
        {errmsg && <View className='text-red text-24px'>{errmsg}</View>}
        <Button type='warn' loading={loading} form-type='submit' onClick={sendMessage}>发送</Button>
      </View>
    </View>
  )
}

export default Chat
