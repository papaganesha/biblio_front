import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DismissAlert from './DismissAlert';
import Capitalize from '../Utils/Capitalize'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InlineEdit = ({ name, label, value, setValue, handleBookUpdate}) => {
  const [editingValue, setEditingValue] = React.useState(value);
  const onChange = (event) => setEditingValue(event.target.value);
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  const onBlur = async (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      if (event.target.value !== value) {
        setValue(event.target.value)
        if (label == "name") {
          await handleBookUpdate(name, 'name', event.target.value)
        }
        if (label == "author") {
          await handleBookUpdate(name, 'author', event.target.value)
        }
        if (label == "publisher") {
          await handleBookUpdate(name, 'publisher', event.target.value)
        }
        if (label == "publiDate") {
          await handleBookUpdate(name, 'publiDate', event.target.value)
        }
        if (label == "stock") {
          await handleBookUpdate(name, 'stock', event.target.value)
        }
      }

    }
  }

React.useEffect(() => {

}, [value])

  return (
    <input
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur} />
  )
}

export default function EditBookModal({ book, handleBookUpdate, error, errorType, setError, setErrorType }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState(book.name);
  const [author, setAuthor] = React.useState(book.author);
  const [publisher, setPublisher] = React.useState(book.publisher);
  const [publiDate, setPubliDate] = React.useState(book.publi_date);
  const [stock, setStock] = React.useState(book.stock);



  return (
    <div>
      <Button onClick={handleOpen}>Editar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar {Capitalize(book.name)}
          </Typography>

          {error.length > 0 && (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <DismissAlert type={errorType} text={error} setText={setError} />
            </Box>
          )}

          <p>Nome: <InlineEdit name={book.name} label="newName" value={Capitalize(name)} setValue={setName} handleBookUpdate={handleBookUpdate} /></p>
          <p>Autor: <InlineEdit name={book.name} label="author" value={author} setValue={setAuthor} handleBookUpdate={handleBookUpdate}/></p>
          <p>Editora: <InlineEdit name={book.name} label="publisher" value={book.publisher} setValue={setPublisher} handleBookUpdate={handleBookUpdate} /></p>
          <p>Data de Publicação: <InlineEdit name={book.name} label="publiDate" value={book.publi_date} setValue={setPubliDate} handleBookUpdate={handleBookUpdate} /></p>
          <p>Estoque: <InlineEdit name={book.name} label="stock" value={book.stock} setValue={setStock} handleBookUpdate={handleBookUpdate} /></p>

        </Box>
      </Modal>
    </div>
  );
}
