import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function BookCard({book}) {
  return (
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 350}}
          image={book.img_url}
          title={book.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Autor: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Editora: {book.publisher}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estoque: {book.stock}
          </Typography>
        </CardContent>
      </Card>
    );
}


export default BookCard

