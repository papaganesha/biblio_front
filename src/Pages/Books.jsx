import './Books.css'
import { useState, useEffect, useContext } from 'react'
import ReactLoading from 'react-loading';

import Capitalize from '../Utils/Capitalize';

import WithdrawModal from '../Components/WithdrawModal';

import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

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

function Books() {
    const [data, setData] = useState([])
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const { authenticated, error, setError, handleLogout, setLoading, loading, errorType, setErrorType } = useContext(AuthContext)
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    console.debug("AUTH: ", authenticated)
    console.debug("ACCESS: ", accessToken)
    console.debug("REFRESH: ", refreshToken)
    console.debug("LOADING: ", loading)

    //FIRST POPUP A CONFIRMATION
    //CHECK CONFIRMATION
    //PROCEED WITH WITHDRAW REQUEST
    //SHOW MESSAGE ACCORDINGLY WITH THE RESULT
    async function handleWithdraw(name) {
        setLoading(true);
        setError("")
        let res
        try {
            res = await Api.post('/withdraws', {
                name
            })
        }
        catch (err) {
            console.log(err.response.data)
            setErrorType("error")

            setError(err.response.data)
        }
        if (res) {
            console.log(res)
            fetchData()
            setErrorType("success")
            setError(res.data)

        }
        // console.log(res.data)
        setLoading(false);

    }

    const fetchData = async () => {
        setError("")
        setLoading(true);
        let res
        try {
            res = await Api.get('/books')
        }
        catch (err) {
            if (err.response.status == 401) {
                console.log(err.response.statusText)
                setErrorType("error")
                setError(`${err.response.statusText}: ${err.response.data.message}`)
                setLoading(false)
            } else {
                console.log(err.response.statusText)
                setErrorType("error")
                setError(`${err.response.statusText}: ${err.response.data.message}`)
            }
        }
        if (res) {
            setData(res.data);
        }
        // console.log(res.data)
        setLoading(false);
    };

    useEffect(() => {



        fetchData();

    }, []);

    if (loading) {
        return (
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

    if (!authenticated) {
        return <Navigate to='/signin' />
    }

    else {
        return (
        <div className="books_div">
                <Box sx={{pt:5, pb: 3}}>
                    <Typography sx={{textAlign: 'center'}} variant="h3" component="h3">Catalogo de Livros</Typography>
                </Box>

                {error.length > 0 && 
                    <Box sx={{ width: '100%', display:'flex', alignItems: 'center', justifyContent: 'center'}} >
                    <DismissAlert type={errorType} text={error} setText={setError} />
                    </Box>
                }
                {/* End hero unit */}
                <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' , py: 2, mb:2}} className="search_div">
                    <SearchComponent data={data} setData={setData} />
                </Box>
                <Grid className="books_grid" container spacing={4}>
                {data.length > 0 && data.map((book) => (
                        <Grid item key={book.isbn} xs={12} sm={8} md={6} lg={2.5}>
                            <Card
                                sx={{maxWidth: 300,  maxHeight:500 ,height: '100%', display: 'flex', flexDirection: 'column' }}
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
                                    <WithdrawModal book={book} handleWithdraw={handleWithdraw} message={error} setMessage={setError} />
                                    <Button size="small">Editar</Button>
                                    <Button size="small">Excluir</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </div>
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