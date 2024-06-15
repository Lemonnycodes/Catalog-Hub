import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h1>Product List</h1>
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />
      <Button variant="primary" as={Link} to="/add-product" className="mb-3">Add New Product</Button>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Link to={`/products/${product._id}`} className="btn btn-primary">View</Link>
                <Link to={`/edit-product/${product._id}`} className="btn btn-secondary ml-2">Edit</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
