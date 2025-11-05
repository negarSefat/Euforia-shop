import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';

const drawerWidth = 240;

export default function AdminPanel() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products?limit=5')
      .then((res) => setProducts(res.data));
  }, []);

  // const handleDrawerToggle = () => {
  //   setOpenDrawer(!openDrawer);
  // };

  const handleAddClick = () => {
    setFormData({ title: '', price: '', description: '' });
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'https://fakestoreapi.com/products',
        formData
      );
      if (res.status === 200 || res.status === 201) {
        console.log(' Product was successfully added!✅');
        console.log('Response:', res);
        console.log('Response status code:', res.status);
      }
      setProducts([...products, { ...formData, id: Date.now() }]);
    } catch (err) {
      console.error('❌ An Error occured: ❌', err);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setFormData(product);
    setOpenDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const menuItems = [
    { text: 'Dashboard', disabled: true },
    { text: 'Orders', disabled: true },
    { text: 'Customers', disabled: true },
    { text: 'Add Product', disabled: false },
    { text: 'Reports', disabled: true },
    { text: 'Settings', disabled: true },
  ];

  return (
    <Box
      sx={{ display: 'flex', fontFamily: 'causten', padding: 8, paddingTop: 0 }}
    >
      <CssBaseline />

      {/* 🔹 Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={openDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            backgroundColor: '#080b21ff',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Typography
            noWrap
            component="div"
            sx={{ color: 'black' }}
          ></Typography>
          <List>
            <p style={{ fontSize: '22px', margin: 15 }}>Admin Panel</p>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton disabled={item.disabled}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button
            variant="outlined"
            color="error"
            sx={{ m: 2, marginTop: 16 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* table */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: 'margin 0.3s',
        }}
      >
        <Container sx={{ fontFamily: 'causten' }}>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', fontFamily: 'causten', marginBottom: 5 }}
          >
            Welcome Negar...
          </Typography>
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              marginBottom: '30px',
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontFamily: 'causten', fontSize: '18px' }}
            >
              Products List
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClick}
              sx={{
                fontFamily: 'causten',
                padding: 1,
                backgroundColor: '#181e4bff',
              }}
            >
              + Add Product
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow sx={{ fontFamily: 'causten' }}>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      style={{
                        width: '60px',
                        height: '70px',
                        marginTop: 10,
                        padding: 3,
                      }}
                      src={product.image}
                    ></img>
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price} </TableCell>
                  <TableCell>{product.rating.rate}</TableCell>
                  <TableCell>
                    <Button color="" onClick={() => handleEdit(product.id)}>
                      <EditNoteOutlinedIcon></EditNoteOutlinedIcon>
                    </Button>
                    <Button onClick={() => handleDelete(product.id)}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ color: '#676d91ff' }}
                      ></DeleteOutlineOutlinedIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Add/Edit a Product</DialogTitle>
            <DialogContent sx={{ padding: 5 }}>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <TextField
                label="Price"
                fullWidth
                margin="dense"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <TextField
                label="Rating"
                fullWidth
                margin="dense"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
                sx={{ color: '#282d4eff' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ backgroundColor: '#080b21ff' }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
