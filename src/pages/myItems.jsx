import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useAuth } from 'src/hooks/AuthProvider';

import { useGetCurrentUserItemsQuery } from 'src/redux/services/apiSlice';

import { ProductsView } from 'src/sections/products/view';

import skeletonView from '../components/skeletonView';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const auth = useAuth();
  const {authenticated,currentUser } = auth;
  const userId = authenticated ? currentUser.id : null;

  const { data, isLoading} = useGetCurrentUserItemsQuery(userId);

  if (isLoading) return <skeletonView/>;

  return (
    <>
      <Helmet>
        <title>My Posted Items list </title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading} isMyItem={true} /> : "no data available" }
    </>
  );
}
