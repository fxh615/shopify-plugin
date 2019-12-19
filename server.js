/*
 * @Author: your name
 * @Date: 2019-12-12 10:32:02
 * @LastEditTime : 2019-12-18 10:25:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopify-demo-app-node-react\server.js
 */
require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser')
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const fs = require('fs');
const shopifyAPI = require('shopify-node-api');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;


function getShopify(shop, accessToken){
  let Shopify = new shopifyAPI({
    shop: shop.split('.')[0] || 'imile-dev',
    shopify_api_key: SHOPIFY_API_KEY, // Your API key
    access_token: accessToken
  });
  return Shopify;
}

async function getCarrierServices(Shopify){
  return new Promise((resolve, reject)=>{
    Shopify.get('/admin/api/2019-10/carrier_services.json', function(err, data, headers){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  })
}

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(bodyParser());
  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'write_shipping', 'read_shipping'],
        async afterAuth(ctx) {
          const { shop, accessToken } = ctx.session;
          ctx.cookies.set("shopOrigin", shop, { httpOnly: false });
          console.log('shop',shop);
          console.log('accessToken',accessToken);
          return ctx.redirect('/')
      }
    })
  );

  router.get('/helloword', async (ctx) => {

    const { shop, accessToken } = ctx.session;
    let Shopify = getShopify(shop, accessToken);
    const res = await getCarrierServices(Shopify);
    ctx.body = res;
    ctx.res.statusCode = 200;
  })


  server.use(graphQLProxy({ version: ApiVersion.April19 }));

  router.get('*', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
