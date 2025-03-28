import express from 'express';
import viewRouter from './routes/view.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// For parsing JSON bodies
app.use(express.json());

// For parsing URL-encoded bodies
app.use(express.urlencoded( { extended: true } ));

// Seting up ejs view engine
app.set('view engine', 'ejs');

// Making public folder accessible
app.use(express.static('public'));

// Handeling the view routes
app.use('/', viewRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));