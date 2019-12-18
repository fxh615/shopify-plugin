/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:01
 * @LastEditTime : 2019-12-18 14:17:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify\pages\index.js
 */

import Cookies from "js-cookie";
import shopifyAPI from 'shopify-node-api';

class Index extends React.Component {
  static getInitialProps({ res, err }) {
    var Shopify = new shopifyAPI({
      shop: 'imile-dev',
      shopify_api_key: 'dc0bcabedc2602c2fa2cee929e4dee0d', // Your API key
      shopify_shared_secret: '660330275b6db74d79eff3e06d3b1cd2', // Your Shared Secret
      shopify_scope: 'read_shipping'
    });

    Shopify.get('/admin/api/2019-10/carrier_services.json', function(err, data, headers){
      console.log(data); // Data contains product json information
      console.log(headers); // Headers returned from request
      console.log('Headers returned from request'); // Headers returned from request
    });
  }

  componentDidMount(){


  }
  render() {
    
    return (
      <div>test</div>
    );
  }
}

export default Index;
