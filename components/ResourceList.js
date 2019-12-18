import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import store from 'store-js';

import { Context } from '@shopify/app-bridge-react';

const GET_PRODUCTS_BY_ID = gql`
  query DeliveryCarrierService() {
     id,
    name,
    active,
    service_discovery,
    carrier_service_type,
    admin_graphql_api_id,
    format,
    callback_url
  }
`;

class ResourceListWithProducts extends React.Component {
  static contextType = Context;

  render() {

    return (
      <Query query={GET_PRODUCTS_BY_ID}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log(data);
          return (
            <div>-------6666-------</div>
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;
