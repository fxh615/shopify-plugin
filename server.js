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
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
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
          ctx.cookies.set("accessToken", accessToken, { httpOnly: false });
          ctx.res.accessToken = accessToken;
          console.log('shop',shop);
          console.log('accessToken',accessToken);
          // const registration = await registerWebhook({
          //   address: `${HOST}/webhooks/products/create`,
          //   topic: 'PRODUCTS_CREATE',
          //   accessToken,
          //   shop,
          //   apiVersion: ApiVersion.October19
          // });

          // if (registration.success) {
          //   console.log('Successfully registered webhook!');
          // } else {
          //   console.log('Failed to register webhook', registration.result);
          // }
          //await getSubscriptionUrl(ctx, accessToken, shop);
          return ctx.redirect('/')
      }
    })


    
  );

  // const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  // router.post('/webhooks/products/create', webhook, (ctx) => {
  //   console.log('received webhook: ', ctx.state.webhook);
  // });

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
