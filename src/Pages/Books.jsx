import './Books.css'
import { useState, useEffect, useContext } from 'react'
import ReactLoading from 'react-loading';
import CircularProgress from '@mui/material/CircularProgress';

import Capitalize from '../Utils/Capitalize';

import WithdrawModal from '../Components/WithdrawModal';
import EditBookModal from '../Components/EditBookModal';


import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

import { AuthContext } from '../Contexts/AuthContext';
import DismissAlert from '../Components/DismissAlert';

import SearchComponent from '../Components/Search';


import Api from '../Api.js';
import RemoveBookModal from '../Components/RemoveBookModal';

function Books() {
    const [data, setData] = useState([])

    const { authenticated, error, setError, handleLogout, setLoading, loading, errorType, setErrorType } = useContext(AuthContext)
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')


    //FIRST POPUP A CONFIRMATION
    //CHECK CONFIRMATION
    //PROCEED WITH WITHDRAW REQUEST
    //SHOW MESSAGE ACCORDINGLY WITH THE RESULT
    async function handleWithdraw(name, handleClose) {
        setError("")
        let res
        try {
            res = await Api.post('/withdraws', {
                name
            })
        }
        catch (err) {
            handleClose()
            setErrorType("error")
            setError(err.response.data)
        }
        if (res) {
            await fetchData()
            handleClose()
            setErrorType("success")
            setError(res.data)
        }

    }

        //FIRST POPUP A CONFIRMATION
    //CHECK CONFIRMATION
    //PROCEED WITH WITHDRAW REQUEST
    //SHOW MESSAGE ACCORDINGLY WITH THE RESULT
    async function handleBookUpdate(name, label, value, handleClose) {
        setError("")
        let res
        try {
            if (label == 'newName') {
                res = await Api.put('/books', {
                  name: name,
                  newName : value
                })
              }
              if (label == 'author') {
                res = await Api.put('/books', {
                    name: name,
                  author: value
                })
              }
              if (label == 'publisher') {
                res = await Api.put('/books', {
                    name: name,
                    publisher: value
                })
              }
              if (label == 'publiDate') {
                res = await Api.put('/books', {
                    name: name,
                    publiDate: value
                })
              }
              if (label == 'stock') {
                res = await Api.put('/books', {
                    name: name,
                    stock: value
                })
              }

        }
        catch (err) {
            handleClose()
            setErrorType("error")
            setError(err.response.data)
        }
        if (res) {
            await fetchData()
            handleClose()
            setErrorType("success")
            setError(res.data)

        }
    }

        //FIRST POPUP A CONFIRMATION
    //CHECK CONFIRMATION
    //PROCEED WITH WITHDRAW REQUEST
    //SHOW MESSAGE ACCORDINGLY WITH THE RESULT
    async function handleDelete(name, handleClose) {
        setError("")
        let res
        try {
            res = await Api.delete('/books', {
                data: {
                    bookName: name
                }
            })
        }
        catch (err) {
            handleClose()
            setErrorType("error")
            setError(err.response.data)
        }
        if (res) {
            await fetchData()
            handleClose()
            setErrorType("success")
            setError(res.data)
        }

    }

    const fetchData = async () => {
        setError("")
        let res
        try {
            res = await Api.get('/books')
        }
        catch (err) {
            if (err.response.status == 401) {
                setErrorType("error")
                setError(`${err.response.statusText}: ${err.response.data.message}`)
                setLoading(false)
            } else {
                setErrorType("error")
                setError(`${err.response.statusText}: ${err.response.data.message}`)
            }
        }
        if (res) {
            setData(res.data);
        }
    };

    useEffect(() => {
        setLoading(true);

        setError("")    
        fetchData();
        setTimeout(() => setLoading(false), 2000);

    }, []);

if(loading) {
    return(
        <Box sx={{display: 'flex', flexDisplay: 'columns', mt:10, height: '600px'}} >
    <Box sx={{width: '100%'}}>
         <Typography sx={{textAlign: 'center', pt:5, pb: 3}} variant="h3" component="h3">Catalogo de Livros</Typography>
         <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 12}}>
         <ReactLoading type='spin' color='black' height={250} width={250} />
     </Box>
         </Box>

     </Box>
    )
}
else{
        return (
        <Box sx={{  
            display: 'flex',
            flexDirection: 'column',
            alignCcontent: 'center',
            justifyItems: 'center',
            marginTop: '5rem', 
            
    }}
    >
                <Box sx={{pt:5, pb: 3}}>
                    <Typography sx={{textAlign: 'center'}} variant="h3" component="h3">Catalogo de Livros</Typography>
                </Box>

                {error.length > 0 && (
                    <Box sx={{ width: '100%', display:'flex', alignItems: 'center', justifyContent: 'center'}} >
                        <DismissAlert type={errorType} text={error} setText={setError} />
                    </Box>
                )}
                {/* End hero unit */}
                <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' , py: 2, mb:2}} className="search_div">
                    <SearchComponent data={data} setData={setData} />
                </Box>
                <Grid sx={{
                    width: '100%',
                    padding: '1rem 3rem 1rem 3rem',
                    display: 'flex',
                    alignItems: 'center',   
                    justifyContent: 'center',
                    mb: 10
                }} container spacing={4}>
                {data.length > 0 && data.map((book) => (
                        <Grid item key={book.isbn} xs={12} sm={8} md={6} lg={2.5}>
                            <Card
                                sx={{maxWidth: 300,  maxHeight:500 ,height: '100%', display: 'flex', flexDirection: 'column', mb:1.5 }}
                            >
                                <CardMedia
                                    component="container"
                                    sx={{ height: 300, width: 300 }}
                                    image={book.img_url}
                                    
                                />
                                
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        {Capitalize(book.name)}
                                    </Typography>
                                    <Typography>
                                        Autor: {Capitalize(book.author)}
                                    </Typography>
                                    <Typography>
                                        Editora: {Capitalize(book.publisher)}
                                    </Typography>
                                    <Typography>
                                        Estoque: {book.stock}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <WithdrawModal book={book} handleWithdraw={handleWithdraw} error={error} setError={setError} errorType={errorType} setErrorType={setErrorType}/>
                                    <EditBookModal book={book} handleBookUpdate={handleBookUpdate} error={error} setError={setError} errorType={errorType} setErrorType={setErrorType}/>
                                    <RemoveBookModal book={book} handleDelete={handleDelete} error={error} setError={setError} errorType={errorType} setErrorType={setErrorType}/>
                                </CardActions>
                            </Card>
                        </Grid>
        ))}

                </Grid>
            </Box>
        );
    }
}

export default Books;






// {data.length > 0 && data.map((book) => (
//     <Grid item key={book.isbn} xs={12} sm={8} md={6} lg={3}>
//         <Card
//             sx={{ border:"1px solid black",maxWidth: 250,  height: '100%', display: 'flex', flexDirection: 'column' }}
//         >
//             <CardMedia
//                 component="container"
//                 sx={{ height: 250, width: 250 }}
//                 image={book.img_url}
                
//             />
            
//             <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h6" component="h6">
//                     {Capitalize(book.name)}
//                 </Typography>
//                 <Typography>
//                     Autor: {Capitalize(book.author)}
//                 </Typography>
//                 <Typography>
//                     Editora: {Capitalize(book.publisher)}
//                 </Typography>
//                 <Typography>
//                     Estoque: {book.stock}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <WithdrawModal book={book} handleWithdraw={handleWithdraw} message={error} setMessage={setError} />
//                 <Button size="small">Editar</Button>
//                 <Button size="small">Excluir</Button>
//             </CardActions>
//         </Card>
//     </Grid>
// ))}