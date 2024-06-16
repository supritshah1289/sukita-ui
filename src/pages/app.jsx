import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useGetItemsQuery } from 'src/redux/services/apiSlice';

import SkeletonView from 'src/components/skeletonView';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function AppPage() {

  const {data, isLoading} = useGetItemsQuery();
  
  if (isLoading) return <SkeletonView />

  return (
    <>
      <Helmet>
        <title> List of Items</title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading}/> : "no data available" }
    </>
  );
}
