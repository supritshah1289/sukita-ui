import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { colors } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';

import { useAuth } from 'src/hooks/AuthProvider';

import { fCurrency } from 'src/utils/format-number';

import { useDeleteItemMutation, useUserEmailByIdMutation } from 'src/redux/services/apiSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, isMyItem }) {
  const [getUserEmail, { isEmailLoading, isEmailError }] = useUserEmailByIdMutation();
  const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();
  const auth = useAuth();
  const { authenticated } = auth;
  const address = product.address[0] ? product.address[0] : '';
  const description = product.description;

  const maxLength = 100; // Maximum characters to display initially
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle between full and truncated description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Determine which version of the description to display
  const displayDescription = showFullDescription
    ? description
    : description.slice(0, maxLength) + '...';

  const renderDescription = (
    <Typography variant="body1" sx={{ '& button': { p: 0 } }}>
      {displayDescription}
      {!showFullDescription && description.length > maxLength && (
        <Button size="small" onClick={toggleDescription}>
          more
        </Button>
      )}
    </Typography>
  );

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
        padding: 2,
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
                <Iconify icon="dashicons:email-alt" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Stack>
  );

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
            sx={{
              width: 30,
              height: 30,
              marginRight: 1,
              objectFit: 'cover',
            }}
            src={authenticated ? product.userDetails.imageUrl : ''}
          ></Avatar>
        }
        title={
          <Typography variant="caption" component="span">
            {authenticated ? product.userDetails.name : 'Login to connect'}
          </Typography>
        }
        subheader={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="mdi:calendar-clock" width={16} height={16} />
            <Typography variant="caption" component="span" whiteSpace="pre-wrap">
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
          {renderDescription}
        </Stack>

        <Stack direction="row" spacing={1}>
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
