import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import { useAuth } from 'src/hooks/AuthProvider';

import { fCurrency } from 'src/utils/format-number';

import { useDeleteItemMutation, useUserEmailByIdMutation } from 'src/redux/services/apiSlice';

import Iconify from 'src/components/iconify';
import { colors } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, isMyItem }) {
  const [getUserEmail, { isEmailLoading, isEmailError }] = useUserEmailByIdMutation();
  const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();
  const auth = useAuth();
  const { authenticated } = auth;
  const address = product.address[0] ? product.address[0] : '';

  const handleDelete = async () => {
    try {
      // Call the deleteItem mutation function with the item ID as an argument
      const response = await deleteItem(product.id);
      // TODO: toast notify user
      toast.success('Item deleted successfully:', response, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error('Error deleting item:', error);
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
      console.log('User by id does not exist: ', error);
    }
  };

  let itemPostCreatedDate = moment(product.createdAt).format('MMMM Do YYYY');

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.uploads.length > 0 ? `data:image/jpeg;base64,${product.uploads[0].image}` : ''}
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
    <Stack direction="row" justifyContent="space-between">
      <CardActions disableSpacing>
        {isMyItem ? (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <Iconify icon="ic:twotone-delete" />
          </IconButton>
        ) : (
          <>
            <Tooltip title="Save">
              <IconButton aria-label="add to favorites">
                <Iconify icon="ic:baseline-favorite" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Contact seller">
              <IconButton aria-label="share" onClick={handleGetUserByEmail}>
                <Iconify icon="streamline:send-email" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Stack>
  );

  const blurredStyle = {
    filter: authenticated ? 'none' : 'blur(5px)',
  };

  return (
    <Card sx={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.4)' }}>
      <CardHeader
        sx={{
          height: 56,
          padding: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        avatar={
          <Avatar
            sx={{ width: 32, height: 32, marginRight: 1, objectFit: 'cover' }}
            sx={{ img: { width: '100%', height: '100%' } }}
            src={product.userDetails.imageUrl}
            style={blurredStyle}
          ></Avatar>
        }
        title={
          authenticated ? (
            product.userDetails.name
          ) : (
            <span style={blurredStyle}>{product.userDetails.name}</span>
          )
        }
        subheader={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="mdi:calendar-clock" width={16} height={16} />
            <Typography variant="caption" component="span">
              {`Published: ${itemPostCreatedDate}`}
            </Typography>
          </Stack>
        }
      />
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {product.description}
          <Box sx={{ marginLeft: 'auto' }} />
          {renderPrice}
        </Stack>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Tooltip title="Location">
            <Iconify icon="gis:location-poi" sx={{ colors: '#dd1313' }} />
          </Tooltip>
          {address.city ? address.city.charAt(0).toUpperCase() + address.city.slice(1) : ''},
          {address.state ? address.state.charAt(0).toUpperCase() + address.state.slice(1) : ''}
        </Stack>

        <Divider />
        {authenticated ? renderActions : null}
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
