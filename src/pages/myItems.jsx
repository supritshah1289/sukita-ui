import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';
import { useGetCurrentUserItemsQuery } from 'src/redux/services/apiSlice';
import { useAuth } from 'src/hooks/AuthProvider';
// ----------------------------------------------------------------------

export default function ProductsPage() {

  const auth = useAuth();
  const {authenticated,currentUser } = auth;
  const userId = authenticated ? currentUser.id : null;

  const { data, isLoading} = useGetCurrentUserItemsQuery(userId);

  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <Helmet>
        <title>My Posted Items list </title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading}/> : "no data available" }
    </>
  );
}
