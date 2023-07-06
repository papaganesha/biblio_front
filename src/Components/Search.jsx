import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.80),
    },
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(3),
    width: '77%',
    [theme.breakpoints.up('sm')]: {
        width: '77%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '18ch',
        },
    },
}));

export default function SearchComponent({ data, setData }) {
    const [searchInput, setSearchInput] = React.useState("")
    const [result, setResult] = React.useState([])
    const [initialData, setInitialData] = React.useState(data)

    React.useEffect(() => {
        if(searchInput){
            setData(data.filter(book => book.name.toLowerCase().includes(searchInput)))
        }else{
            setData(initialData)
        }

    },[searchInput]);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onChange={(e) => { setSearchInput(e.target.value) }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}
