/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:01
 * @LastEditTime : 2019-12-18 14:17:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify\pages\index.js
 */

import  shopifyAPI from  'shopify-node-api';
import store from 'store-js';
class Index extends React.Component {
  static async getInitialProps() {
    return {
      shop: 'https://imile-dev.myshopify.com',
      shopify_api_key: 'dc0bcabedc2602c2fa2cee929e4dee0d',
      shopify_shared_secret: '660330275b6db74d79eff3e06d3b1cd2', 
      shopify_scope: ['read_products', 'write_products', 'write_shipping', 'read_shipping'],
    }
  }
  componentDidMount(){
    let Shopify = new shopifyAPI(this.props);
    Shopify.get('https://imile-dev.myshopify.com/admin/api/2019-10/carrier_services.json', function(err, data, headers){
      console.log(data); 
      console.log(headers);
    });
  }
  render() {
    
    return (
      <div>test</div>
    );
  }
}

export default Index;
