import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import CardZapa from '../components/CardZapa';
import api from '../services/api'; // Asegúrate de que este es el archivo que contiene la configuración de axios

function Home() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    condition: '',
    minPrice: '',
    maxPrice: ''
  });
  const [productsToShow, setProductsToShow] = useState(9);
  const [allProducts, setAllProducts] = useState([]);

  // Cargar productos desde la API al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setAllProducts(response.data.products); // Asumiendo que la API devuelve { message, products }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Función para manejar los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice' && value < 0) return;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Filtrar productos basados en la búsqueda y los filtros
  const filteredProducts = allProducts.filter((product) => {
    const validMinPrice = filters.minPrice && !isNaN(filters.minPrice);
    const validMaxPrice = filters.maxPrice && !isNaN(filters.maxPrice);

    return (
      product.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (filters.condition ? product.condicion === filters.condition : true) &&
      (validMinPrice ? product.precio >= Number(filters.minPrice) : true) &&
      (validMaxPrice ? product.precio <= Number(filters.maxPrice) : true)
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
    <Container className='m-5'>
      <h1>Productos</h1>

      {/* Filtros y búsqueda */}
      <Form className="form-inline mb-3">
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
      <Row className='mt-4'>
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
    </Container>
  );
}

export default Home;




