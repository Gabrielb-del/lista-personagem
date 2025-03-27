import React, { useState, useEffect } from "react";
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material"

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
        <div>
            <h1>Personagens</h1>
            <Grid container spacing={2} justifyContent="center">
                {!posts || posts.length === 0 ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (posts.map(({ id, image, name, }) => (
                    <div key={id} className="post">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{
                                        height: 300,
                                        width: "100%", // Garante que ocupa toda a largura do card
                                        objectFit: "cover", // Mantém a proporção e corta excessos para preencher
                                        objectPosition: "center"
                                    }}
                                    image={image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        { }
                                    </Typography>
                                </CardContent>

                            </Card>
                    </div>

                ))
                )}
            </Grid>
        </div>
    );
}

export default Morty