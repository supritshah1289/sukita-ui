import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import moment from "moment";
import { useUserEmailByIdMutation, useDeleteItemMutation } from 'src/redux/services/apiSlice';
import { useAuth } from 'src/hooks/AuthProvider';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, isMyItem }) {
  const [getUserEmail, { isEmailLoading, isEmailError }] =useUserEmailByIdMutation();
  const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();
  const auth = useAuth();
  const {authenticated} = auth; 

  const handleDelete = async () => {
    try {
      // Call the deleteItem mutation function with the item ID as an argument
      const response = await deleteItem(product.id);
      //TODO: toast notify user 

    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleGetUserByEmail = async () => {

    try {
      const response = await getUserEmail(product.userDetails.id);
      const recipientEmail = response.data.email;
      const subject = encodeURIComponent(`${product.title}`);
      const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}`;
      window.location.href = mailtoUrl;
    } catch (error) {
      console.log("User by id does not exist: ", error);
    }
  };

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

  const renderActions = (
    <Stack direction="row"  justifyContent="space-between">
          <CardActions disableSpacing>
            
            { isMyItem ? 
            (
               <IconButton aria-label="delete" onClick={handleDelete}>
                <Iconify icon="ic:twotone-delete" />
               </IconButton>
            ) : 
            (
            <>
              <IconButton aria-label="add to favorites">
                <Iconify icon="ic:baseline-favorite" />
              </IconButton>
              <IconButton aria-label="share" onClick={handleGetUserByEmail}>
                <Iconify icon="streamline:send-email" />
              </IconButton>
            </>
            ) 
            }

          </CardActions>
        </Stack>
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

        { authenticated ? renderActions :  null }
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

