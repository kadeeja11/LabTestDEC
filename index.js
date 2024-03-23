const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'be3582f2506c451d9e0e231ed9777ca5';

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Serve the index.html file from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Generate a meal plan
app.post('/mealplan/generate', async (req, res) => {
    const { diet, targetCalories } = req.body;
    try {
        const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&diet=${diet}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get random recipes
app.get('/recipes/random', async (req, res) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get recipe information
app.post('/recipe/info', async (req, res) => {
    const { recipeId } = req.body;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get recipe by ID
app.get('/recipe/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
