import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';
import { useGetItemsQuery } from 'src/redux/services/apiSlice';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const {data, isLoading} = useGetItemsQuery();
  console.log("data: " +JSON.stringify(data));

  return (
    <>
      <Helmet>
        <title>  List of services </title>
      </Helmet>

      <ProductsView data={data} isLoading={isLoading}/>
    </>
  );
}
