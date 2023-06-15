import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function BookCard({img_url, name, author, publisher, stock}) {
  return (
    <Card style={{ width: '20rem', height: '45rem'}}>
      <Card.Img variant="top" src={img_url} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{author}</ListGroup.Item>
        <ListGroup.Item>{publisher}</ListGroup.Item>
        <ListGroup.Item>{stock}</ListGroup.Item>
      </ListGroup>

    </Card>
  );
}

export default BookCard;