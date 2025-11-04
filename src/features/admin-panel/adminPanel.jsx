import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from '@mui/material';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products?limit=3')
      .then((res) => setProducts(res.data));
  }, []);

  const handleAddClick = () => {
    setFormData({ title: '', price: '', description: '' });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'https://fakestoreapi.com/products',
        formData
      );
      console.log('post status', res);
      if (res.status === 200 || res.status === 201) {
        console.log('✅ Product successfully added!');
        console.log('Response:', res.data);
      }
      setProducts([...products, { ...formData, id: Date.now() }]);
    } catch (err) {
      console.error('❌ Error has occured while sending request:', err);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setFormData(product);
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <Container sx={{ mt: 5, fontFamily: 'causten', maxWidth: '1280px' }}>
      <h2 style={{ textAlign: 'center' }}>Admin Panel</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginInline: 90,
        }}
      >
        <Button
          style={{ border: '1px solid #1976d2' }}
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add New Product
        </Button>
      </div>
      <TableContainer sx={{ height: 'auto', padding: 10, paddingTop: 2 }}>
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleEdit(p.id)}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(p.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* -------modal--------- */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add / Edit Product</DialogTitle>
        <DialogContent>
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
            label="Description"
            fullWidth
            margin="dense"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
