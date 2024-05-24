import { useState } from "react";

import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import { useAddItemMutation,useGetCagtegoriesQuery } from "src/redux/services/apiSlice";
import { useAuth } from "src/hooks/AuthProvider";

//TODO: fetch list of categories and populate the dropdown for user to pick
//TODO: Update the current userId and CategoryId when sending a request

const Post = () => {

  const auth = useAuth();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [addItem] = useAddItemMutation(); // RTK Query mutation hook
  const [categoryId, setcategoryId] = useState("");
  const [userId, setUserId] = useState(user.id);
  const [status, setStatus] = useState(true);
  const { data, isError, isLoading } = useGetCagtegoriesQuery();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

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
      };

      await addItem({ data, image });
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
      setcategoryId("");
      setImage(null);
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
