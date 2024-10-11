import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware to enable CORS
app.use(cors());

// Example route to fetch news
app.get('/news', async (req, res) => {
    try {
        const query = req.query.q || 'India'; // Default query to 'India' if not provided
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
