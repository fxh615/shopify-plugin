/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:01
 * @LastEditTime : 2019-12-18 14:17:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify\pages\index.js
 */
import {fetch} from '../util/http';
class Index extends React.Component {

  componentDidMount(){
    fetch('/helloword').then(res=>{
      console.log(res);
    })
  }
  render() {
    
    return (
      <div>test</div>
    );
  }
}

export default Index;
