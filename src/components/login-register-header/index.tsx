import logo from '@/assets/images/logo.png';
import './index.less'

const header = ()=>{
  return(
    <header className={'header'}>
      <img src={logo} alt='' />
      <h1>后台管理系统</h1>
    </header>
  )
}

export default header;
