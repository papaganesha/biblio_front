import './EditBookModal.css'

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
  width: 650,
  bgcolor: 'background.paper',
  py: 4,
  px: 5,
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

const InlineEdit = ({ id, name, label, value, setValue, handleBookUpdate, handleClose}) => {
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
        if (label == "newName") {
          await handleBookUpdate(name, 'newName', event.target.value, handleClose)
        }
        if (label == "author") {
          await handleBookUpdate(name, 'author', event.target.value, handleClose)
        }
        if (label == "publisher") {
          await handleBookUpdate(name, 'publisher', event.target.value, handleClose)
        }
        if (label == "publiDate") {
          await handleBookUpdate(name, 'publiDate', event.target.value, handleClose)
        }
        if (label == "stock") {
          await handleBookUpdate(name, 'stock', event.target.value, handleClose)
        }
      }

    }
  }

React.useEffect(() => {

}, [value])

  return (
    <input
      id={id}
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
  const handleOpen = () => {
    setError("")
    setOpen(true)
  };
  const handleClose = () => {
    setError("")
    setOpen(false)
  };

  const [name, setName] = React.useState(book.name);
  const [author, setAuthor] = React.useState(book.author);
  const [publisher, setPublisher] = React.useState(book.publisher);
  const [publiDate, setPubliDate] = React.useState(book.publi_date);
  const [stock, setStock] = React.useState(book.stock);
  
  React.useEffect(()=>{
    
  },[])


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
          <Typography sx={{mb: 3}} id="modal-modal-title" variant="h6" component="h2">
            Editar {Capitalize(book.name)}
          </Typography>

          {error.length > 0 && (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
              <DismissAlert type={errorType} text={error} setText={setError} />
            </Box>
          )}

          <p>Nome: <InlineEdit id="nameInput" name={book.name} label="newName" value={Capitalize(name)} setValue={setName} handleBookUpdate={handleBookUpdate} handleClose={handleClose}/></p>
          <p>Autor: <InlineEdit id="authorInput"  name={book.name} label="author" value={author} setValue={setAuthor} handleBookUpdate={handleBookUpdate} handleClose={handleClose}/></p>
          <p>Editora: <InlineEdit id="publisherInput" name={book.name} label="publisher" value={publisher} setValue={setPublisher} handleBookUpdate={handleBookUpdate}  handleClose={handleClose}/></p>
          <p>Data de Publicação: <InlineEdit id="publiDateInput" name={book.name} label="publiDate" value={publiDate} setValue={setPubliDate} handleBookUpdate={handleBookUpdate} handleClose={handleClose} /></p>
          <p>Estoque: <InlineEdit id="stockInput" name={book.name} label="stock" value={stock} setValue={setStock} handleBookUpdate={handleBookUpdate} handleClose={handleClose}/></p>

        </Box>
      </Modal>
    </div>
  );
}
