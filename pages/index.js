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

  constructor(props) {
    super(props);
    this.state = {
      "serviceName":'',
      "active": true
    }
  }
  static async getInitialProps({ req }) {
    return {}
  }
  componentDidMount(){
    this.getDate();
    console.log(this.state);
  }

  async getDate(){
    let res = await  fetch('/helloword');
    if(res.carrier_services.length === 0){
      res = await post('/createCarrierServices');
    }

    let sn = res.carrier_services[0].name;
    console.log(res);
    this.setState({
      serviceName:sn
    });

    let resRet = await post('/getRate');
    console.log(resRet);

  }
  render() {
    
    return (
      <div style="padding:20px; border:1px #ccc solid">{this.state.serviceName}</div>
    );
  }
}

export default Index;
