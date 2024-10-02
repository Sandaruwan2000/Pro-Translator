import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast, Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa'; // Import the delete icon
import "./FavoritePage.css"

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); // 'success' or 'danger'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:4000/favourite/get');
        setFavorites(response.data);
      
      } catch (error) {
        setError('Failed to fetch favorites');
        console.error('Error fetching favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleEdit = (favorite) => {
    navigate('/UserHome/translater', {
      state: {
        editMode: true,
        favorite: favorite
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/favourite/delete/${id}`);
      setFavorites(favorites.filter((item) => item._id !== id));
      setToastMessage("Favorite item has been deleted.");
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error deleting favorite:', error);
      setToastMessage("Failed to delete favorite item.");
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
   
    <Container className='p-2'>
      <Row>
        {favorites.length === 0 ? (
          <Col>
            <p><center>No favorites yet.</center></p>
          </Col>
        ) : (
          favorites.map((item) => (
            <Col key={item._id} md={6} className="mb-3">
              <Card onClick={() => handleEdit(item)} style={{ cursor: 'pointer', position: 'relative' }}>
                <Card.Body>
                  <Card.Title>Original Text:</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                  <Card.Title>Translated Text:</Card.Title>
                  <Card.Text>{item.translatedText}</Card.Text>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                  >
                    <FaTrashAlt size={20} color="red" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Toast
      className='toast'
        show={showToast}
        onClose={() => setShowToast(false)}
        bg={toastVariant}
        delay={3000}
        autohide
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
   
  );
};

export default FavoritePage;
