import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useGetItemsQuery } from 'src/redux/services/apiSlice';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function AppPage() {

  const {data, isLoading} = useGetItemsQuery();
  
  if (isLoading) return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {Array.from(Array(6)).map((_, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Grid>
  ))}
</Grid>;

  return (
    <>
      <Helmet>
        <title> List of Items</title>
      </Helmet>

      {data ? <ProductsView data={data} isLoading={isLoading}/> : "no data available" }
    </>
  );
}
