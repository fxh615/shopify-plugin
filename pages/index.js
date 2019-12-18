/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:01
 * @LastEditTime : 2019-12-18 14:17:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify\pages\index.js
 */

import Cookies from "js-cookie";

class Index extends React.Component {
  

  componentDidMount(){
    let accessToken = Cookies.get('accessToken');
    let shop = Cookies.get('shopOrigin');
    this.getData(accessToken, shop);
  }

  async getData(accessToken, shop){
    const response = await fetch(`https://${shop}/admin/api/2019-10/carrier_services.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "X-Shopify-Access-Token": accessToken,
      }
    })
    const responseJson = await response.json();
    console.log('responseJson=================>>>>>>', responseJson)
  }
  render() {
    
    return (
      <div>test</div>
    );
  }
}

export default Index;
