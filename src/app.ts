import { Component, PropsWithChildren } from 'react'
import '@nutui/nutui-react/dist/style.css'
import 'uno.css'
import './app.less'

class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App