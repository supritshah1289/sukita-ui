import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';

// ----------------------------------------------------------------------

export default function ProductsView({ data, isLoading, isMyItem }) {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Items
      </Typography>

      {/* <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack> */}

      <Grid container spacing={3}>
        {!!data &&
          data.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3} style={{ display: 'flex' }}>
              <ProductCard
                product={product}
                isLoading={isLoading}
                isMyItem={isMyItem}
                sx={{ height: '100%' }}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
