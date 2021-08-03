
import {deleteUser} from '../../utils/storage'
const index = (props:any)=>{
  debugger
  const del = ()=>{
    deleteUser();
  }
  return(
    <div>
      home
      <button onClick={del}>delete</button>
    </div>
  )
}
export default index;
