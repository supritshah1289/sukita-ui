import { useState } from "react";
import { toast } from "react-toastify";

import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useAuth } from "src/hooks/AuthProvider";

import { useAddItemMutation,useGetCagtegoriesQuery } from "src/redux/services/apiSlice";

// TODO: fetch list of categories and populate the dropdown for user to pick
// TODO: Update the current userId and CategoryId when sending a request
import { USStates } from "src/constants/usStates";
import { useSelector } from 'react-redux';

const Post = () => {

  const auth = useAuth();
  const user = auth.currentUser;
  const user1 = useSelector((state) => state.user.currentUser);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [addItem] = useAddItemMutation(); // RTK Query mutation hook
  const [categoryId, setcategoryId] = useState("");
  const [userId, setUserId] = useState(user1 && user1.id);
  const [status, setStatus] = useState(true);
  const { data, isError, isLoading } = useGetCagtegoriesQuery();
  const [address, setAddress] = useState({
    apt: "",
    city:"", 
    country:"", 
    createdAt:"", 
    geolocation: "",
    primary:"",
    state:"", 
    street:"", 
    zipCode:null
  });


  const handleState = (val) => {
    setAddress({
      ...address,
      state: val
    });
  }

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress({
      ...address,
      [e.target.name]: value
    });

  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };


  //TODO: Grey out the submit button until all the require fields are filled. 
  //On click disable 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate input fields
    if (!title || !description || !price) {
      alert("Please fill in all fields");
      return;
    }
    try {
      // Call RTK Query mutation hook with form data

      const data = {
        title,
        description,
        price,
        categoryId,
        status,
        userId: userId,
        address: [address],
      };

      await addItem({ data, image });
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
      setcategoryId("");
      setImage(null);
      setAddress({apt: "", city:"", country:"", createdAt:"", geolocation: "",primary:"",state:"", street:"", zipCode:null});
      toast.success("Item Added successfully.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error, display error message, etc.
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add the service you're providing
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="dense"
          multiline
          rows = "5"
          size ="medium"
          inputProps={{ maxLength: 255 }}
          required
        />
        <Select
          value={categoryId}
          onChange={(e) => setcategoryId(e.target.value)}
          fullWidth
          margin="dense"
          displayEmpty
          required
        >
          <MenuItem value="" disabled>
            Select a Category
          </MenuItem>
          {!!data &&
            data.map(function (category) {
              return (
                <MenuItem value={category.id} key={category.id}>
                  {category.title}
                </MenuItem>
              );
            })}
        </Select>

        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          required
        />

        <TextField
          label="Street"
          name="street"
          value={address.street}
          onChange={handleAddressChange}a
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="City"
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />

        {/* <Select
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          fullWidth
          margin="dense"
          displayEmpty
          required
        >
          <MenuItem value="" disabled>
            Select a State
          </MenuItem>
          {USStates.map(function (state) {
              return (
                <MenuItem value={state.name} key={state.name}>
                  {state.name}
                </MenuItem>
              );
            })}
        </Select> */}


      <Autocomplete
        value={address.state}
        onChange={(e,newVal) => handleState(newVal)}
        options={USStates}
        renderInput={(params) => <TextField {...params}  label="State" variant="outlined" />}
      />


        <TextField
          label="Zipcode"
          name="zipCode"
          value={address.zipCode}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />  


        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "1rem" }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Post;
