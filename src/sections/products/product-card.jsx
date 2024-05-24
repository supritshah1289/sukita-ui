import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import moment from "moment";

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {


  let itemPostCreatedDate = moment(product.createdAt).format("MMMM Do YYYY");

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={
        product.uploads.length > 0
          ? `data:image/jpeg;base64,${product.uploads[0].image}`
          : ""
      }
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      <CardHeader
          avatar={
            <Avatar
              src={product.userDetails.imageUrl}
            ></Avatar>
          }
          title={product.userDetails.name}
          subheader={`Posted on: ${itemPostCreatedDate}`}
        />
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={product.colors} /> */}
          {renderPrice}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" variant="p">
          {product.description}
        </Stack>
        
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

