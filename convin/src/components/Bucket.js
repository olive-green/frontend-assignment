import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useParams } from 'react-router-dom';

function Bucket() {
  const [bucket, setBucket] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchBucket() {
      // Make a GET request to the JSON server to retrieve the bucket with the specified id
      // and update the bucket state
      const response = await fetch(`http://localhost:3000/buckets/${id}`);
      const data = await response.json();
      setBucket(data);
    }
    fetchBucket();
  }, [id]);

  function handleAddCard(newCard) {
    // Make a POST request to the json server to add card to the bucket
    async function postData() {
        const response = await fetch(`http://localhost:3000/buckets/${id}/cards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCard),
        });
        const data = await response.json();
        setBucket(prevBucket => {
            return {...prevBucket, cards: [...prevBucket.cards, data]}
        });
    }
    postData();
  }

  function handleDeleteCards(selectedCards) {
    // Make a DELETE request to the json server to delete the selected cards
    selectedCards.map(async card => {
        const response = await fetch(`http://localhost:3000/buckets/${id}/cards/${card.id}`, {
        method: 'DELETE',
        });
        const data = await response.json();
        setBucket(prevBucket => {
            return {...prevBucket, cards: prevBucket.cards.filter(card => card.id !== data.id)}
        });
    });
  }

  return (
    <div>
      <h1>{bucket.name}</h1>
      <button onClick={() => handleAddCard({ name: '', link: '' })}>
        Add Card
      </button>
      <button onClick={() => handleDeleteCards(bucket.cards.filter(card => card.isSelected))}>
        Delete Selected
      </button>
      {bucket.cards &&
        bucket.cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
    </div>
  );
}

export default Bucket;
