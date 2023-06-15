import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Home.css';
import BookCard from './BookCard';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/books', {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      setData(res.data);
      // console.log(res.data)
    };
    fetchData();
  }, []);

  return (
    <Container >

      {data.length > 0 ? (
        data.map(book => (<BookCard img_url={book.img_url} author={book.author} name={book.name} publisher={book.publisher} stock={book.stock}/>))
      ) : (<h1>GG</h1>)}

    </Container>
  );
}

export default Home;