import moment from "moment";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Divider from '@mui/material/Divider';

import { useAuth } from 'src/hooks/AuthProvider';

import { fCurrency } from 'src/utils/format-number';

import { useDeleteItemMutation, useUserEmailByIdMutation } from 'src/redux/services/apiSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, isMyItem }) {
  const [getUserEmail, { isEmailLoading, isEmailError }] = useUserEmailByIdMutation();
  const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();
  const auth = useAuth();
  const {authenticated} = auth;
  const address = product.address[0] ? product.address[0] :"";
  

  const handleDelete = async () => {
    try {
      // Call the deleteItem mutation function with the item ID as an argument
      const response = await deleteItem(product.id);
      // TODO: toast notify user 
      toast.success("Item deleted successfully:", response, {
        position: toast.POSITION.TOP_CENTER,
      });

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
          subheader={`Published: ${itemPostCreatedDate}`}
        />
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack component="span" direction="column" alignItems="center"  >
          {product.description}
          </Stack>
          <Stack component="span" direction="column" alignItems="center"  >
            Price: {renderPrice}
          </Stack>
        </Stack>

        <Divider />   

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        {address.city ? address.city : ""},{address.state ? address.state : ""}
        </Stack>

        <Divider />  
        { authenticated ? renderActions :  null }
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

