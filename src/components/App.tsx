import React, {ReactElement} from 'react';
import StoreProvider from '../Store';

import Layout from './Layout';
import Routes from './Routes';

export default function App(): ReactElement {

  return (
    <StoreProvider>
      <Layout>
        <Routes />
      </Layout>
    </StoreProvider>
  )
}
