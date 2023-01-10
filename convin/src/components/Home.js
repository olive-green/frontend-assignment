import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [buckets, setBuckets] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        async function fetchBuckets() {
            // Make a GET request to the json server to retrieve all available buckets
            // and update the buckets state
            const response = await fetch('http://localhost:3000/buckets');
            const data = await response.json();
            setBuckets(data);
        }
        fetchBuckets();
    }, []);

    function handleCreateBucket(newBucket) {
        // Make a POST request to the json server to create a new bucket
        async function postData() {
            const response = await fetch(`http://localhost:3000/buckets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBucket),
            });
            const data = await response.json();
            setBuckets(prevBucket => [...prevBucket, data]);
        }
        postData();
        history.push(`/bucket/${data.id}`);
    }

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {buckets.map(bucket => (
                    <li key={bucket.id} onClick={() => history.push(`/bucket/${bucket.id}`)}>
                        {bucket.name}
                    </li>
                ))}
            </ul>
            <button onClick={() => handleCreateBucket({ name: '' })}>
                Create Bucket
            </button>
        </div>
    );
}

export default Home;

