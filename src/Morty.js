import React, { useState, useEffect } from "react";
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material"

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

const Morty = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('https://rickandmortyapi.com/api/character');
                setPosts(data.results);
            } catch (error) {
            }
        };

        fetchPosts();

    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        <div style={{ padding: '20px' }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                Personagens Rick & Morty
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
                {!posts || posts.length === 0 ? (
                    <Grid item>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <CircularProgress />
                        </Box>
                    </Grid>
                ) : (
                    posts.map(({ id, image, name, status, species, location, origin}) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                width: 300,
                                margin: '0 auto'
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 300,
                                        objectFit: "cover"
                                    }}
                                    image={image}
                                    alt={name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {name}
                                    </Typography>
                                    
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{status} - {species}</Typography>

                                    <Typography sx={{ color: 'primary', mb: 1.5 }}>Origem: {origin.name}</Typography>

                                    <Typography sx={{ color: 'primary' }}>Localização: {location.name}</Typography>


                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
        </ThemeProvider>
    );
}

export default Morty