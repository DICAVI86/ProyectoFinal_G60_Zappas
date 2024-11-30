import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CardZapa from '../components/CardZapa';

function Home() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    condition: '',
    minPrice: '',
    maxPrice: ''
  });
  const [productsToShow, setProductsToShow] = useState(9);
  const [allProducts, setAllProducts] = useState([]);

  // Simulación de productos (90 productos)
  const generateProducts = () => {
    const products = [];
    for (let i = 1; i <= 90; i++) {
      products.push({
        id: i,
        name: `Producto ${i}`,
        description: `Descripción del producto ${i}`,
        price: (Math.random() * (200 - 50) + 50).toFixed(2),
        image_url: 'https://via.placeholder.com/150',
        condition: i % 2 === 0 ? 'Nuevo' : 'Usado',
        created_at: '2024-01-01'
      });
    }
    return products;
  };

  // Crear productos para probar
  useEffect(() => {
    setAllProducts(generateProducts());
  }, []);

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Función para manejar los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Validación para el precio mínimo
    if (name === 'minPrice' && value < 0) return;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Filtramos los productos según la búsqueda y los filtros
  const filteredProducts = allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.condition ? product.condition === filters.condition : true) &&
      (filters.minPrice ? product.price >= filters.minPrice : true) &&
      (filters.maxPrice ? product.price <= filters.maxPrice : true)
    );
  });

  // Función para cargar más productos
  const loadMoreProducts = () => {
    setProductsToShow((prev) => prev + 9);
  };

  // Detectar cuando se llega al final de la página
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    loadMoreProducts();
  };

  // Añadir el evento de scroll para cargar más productos cuando el usuario hace scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      {/* Filtros y búsqueda */}
      <Form inline className="mb-3">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={search}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              as="select"
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="">Condición</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Form.Control>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="number"
              name="minPrice"
              placeholder="Precio Mínimo"
              value={filters.minPrice}
              min="0"
              onChange={handleFilterChange}
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              type="number"
              name="maxPrice"
              placeholder="Precio Máximo"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
      </Form>

      {/* Productos */}
      <Row>
        {filteredProducts.slice(0, productsToShow).map((product) => (
          <Col sm={12} md={6} lg={4} key={product.id}>
            <CardZapa product={product} />
          </Col>
        ))}
      </Row>

      {/* Mensaje cuando ya no hay más productos */}
      {filteredProducts.length <= productsToShow && (
        <div className="text-center mt-3">No hay más productos para mostrar.</div>
      )}
    </div>
  );
}

export default Home;

