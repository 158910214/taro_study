import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'

const go2Todo = () => Taro.navigateTo({ url: '/pages/todo-list/index' })
const go2Chat = () => Taro.navigateTo({ url: '/pages/chat/index' })
const go2Table = () => Taro.navigateTo({ url: '/pages/table/index' })

export default () => {
  return (
    <ul className='index flex-col px-32px text-32px'>
      <li><Button className='mt-20px' onClick={go2Todo}>go2Todo</Button></li>
      <li><Button className='mt-20px' onClick={go2Chat}>go2chat</Button></li>
      <li><Button className='mt-20px' onClick={go2Table}>go2table</Button></li>
    </ul >
  )
}
