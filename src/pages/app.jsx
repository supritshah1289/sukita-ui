import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';
import { useGetItemsQuery } from 'src/redux/services/apiSlice';

// ----------------------------------------------------------------------

export default function AppPage() {

  const {data, isLoading} = useGetItemsQuery();
  
  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <Helmet>
        <title> List of Items</title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading}/> : "no data available" }
    </>
  );
}
