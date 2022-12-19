import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';

export default function Book() {
    const [data, setData] = useState([]);
    let bookIds = localStorage.getItem("bookIds") ? JSON.parse(localStorage.getItem("bookIds")) : [];
    const [addedBookIds, setAddedBookIds] = useState(bookIds);
    const navigate = useNavigate();
    const sampleBook = 'https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-3-CRC.png';

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            loadAllBook();
        }
    }, []);

    const loadAllBook = async () => {
        await axios("http://localhost:8080/Book/findAll")
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleBookSearch = async (e) => {
        let searchBook = e.target.value;
        if (searchBook) {
            await axios.get(`http://localhost:8080/Book/getByBookName/${searchBook}`)
            .then((response) => {
                setData([response.data.obj]);
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            loadAllBook();

        }
    }

    const handleAddToCart = (productId) => {
        let bookIds = JSON.parse(JSON.stringify(addedBookIds));
        bookIds.push(productId);
        setAddedBookIds(bookIds);
        localStorage.setItem("bookIds", JSON.stringify(bookIds));
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
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
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
    }));

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Bookstore
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        onChange={handleBookSearch}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <button style={{borderRadius: '5px', height: '30px', cursor: 'pointer'}} onClick={() => navigate('/cart')}><ShoppingCartIcon /></button>
                    </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '10px' }}>
                {
                    data.map((item, index) => {
                        let isAdded = addedBookIds.find(id => id === item.bookId)

                        return <div style={{ width: '250px', height: '350px' }} key={index}>
                            <Card>
                                <div style={{ backgroundColor: 'LightGrey', padding: '20px 0px' }}><img src={item.bookImage || sampleBook} style={{ height: '135px', width: '105px' }} /></div>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '15px'}}>
                                    <span>{item.bookName}</span>
                                    <span>{item.authorName}</span>
                                    <span>Rs. {item.price}</span>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                        <button className='addtocart-button' style={{backgroundColor: isAdded ? '#3371B5' : '#A03037', color: 'white'}} onClick={() => handleAddToCart(item.bookId)}>
                                            {isAdded ? 'ADDED TO BAG' : 'ADD TO BAG' }
                                        </button>
                                        <button className='wishlist-button'>WISHLIST</button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    )
}