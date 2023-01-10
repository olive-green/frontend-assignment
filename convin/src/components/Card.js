import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

function Card({ name, link, id, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cardName, setCardName] = useState(name);
  const [cardLink, setCardLink] = useState(link);
  const { bucketId } = useParams();
  const history = useNavigate();
  function handleEdit() {
    // Make a PUT request to the json server to edit the card
    async function putData() {
        const response = await fetch(`http://localhost:3000/buckets/${bucketId}/cards/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: cardName, link: cardLink }),
        });
        const data = await response.json();
        setIsEditing(false);
    }
    putData();
  }

  function handleDelete() {
    onDelete(id);
    history.goBack();
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <h2 onClick={handleOpenModal}>{cardName}</h2>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <iframe src={cardLink} />
      </Modal>
      {isEditing ? (
        <>
          <input
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <input
            value={cardLink}
            onChange={(e) => setCardLink(e.target.value)}
            /> 

            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    );
  }
  
  export default Card;
  
         
