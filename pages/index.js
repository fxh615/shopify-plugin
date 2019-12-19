/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:01
 * @LastEditTime : 2019-12-18 14:17:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify\pages\index.js
 */
import {fetch,post} from '../util/http';
class Index extends React.Component {

  componentDidMount(){
    this.getDate();
  }

  async getDate(){
    let res = await  fetch('/helloword');
    if(res.carrier_services.length === 0){
      res = await post('/createCarrierServices');
    }

    console.log(res);
  }
  render() {
    
    return (
      <div>test</div>
    );
  }
}

export default Index;
