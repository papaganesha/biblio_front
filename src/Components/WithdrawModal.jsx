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
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  p: 4,
};

export default function WithdrawModal({book, handleWithdraw, error, errorType, setError, setErrorType}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setError("")
    setOpen(true)
  };
  const handleClose = () => {
    setError("")
    setOpen(false)
  };

  return (
    <div>
      <Button onClick={handleOpen}>Retirar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Quer retirar o livro {Capitalize(book.name)}?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button onClick={async ()=> await handleWithdraw(book.name, handleClose)}>Retirar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
