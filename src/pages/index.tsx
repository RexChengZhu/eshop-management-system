import styles from './index.less';
import { produce} from 'immer';
import {getUser} from '../utils/storage'
import { UserType } from '@/pages/login/data';
export default function IndexPage() {
  const test = ()=>{
    let ss = {
      name:'gg'
    }
    let mm = produce(ss,draft =>{
      draft.name = 'sds'
    })
    debugger
  }
  const user:UserType = getUser();
  debugger
  return (
    <div>
      <h1 className={styles.title}>hello {user.username}</h1>
      <button onClick={test}>dianji</button>
    </div>
  );
}
