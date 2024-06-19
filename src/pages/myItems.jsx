import { Helmet } from 'react-helmet-async';

import { useAuth } from 'src/hooks/AuthProvider';

import { useGetCurrentUserItemsQuery } from 'src/redux/services/apiSlice';

import { ProductsView } from 'src/sections/products/view';

import SkeletonView from '../components/skeletonView';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const auth = useAuth();
  const {authenticated,currentUser } = auth;
  const userId = authenticated ? currentUser.id : null;

  const { data, isLoading} = useGetCurrentUserItemsQuery(userId);

  if (isLoading) return <SkeletonView />;

  return (
    <>
      <Helmet>
        <title>My Posted Items list </title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading} isMyItem={true} /> : "no data available" }
    </>
  );
}
