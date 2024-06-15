import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
        alert('Error deleting product!');
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: ${product.price}</Card.Text>
          <Card.Text>Category: {product.category}</Card.Text>
          <Card.Text>Stock: {product.stock}</Card.Text>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
