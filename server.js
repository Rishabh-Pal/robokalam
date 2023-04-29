const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Form = require('./models/Form');

// Configure middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://boletorishabh1999:n5QYsLZNqT3VGXWV@cluster0.fhhxryf.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error));

// Define API routes
app.post('/api/form', (req, res) => {
    const { name, email, message } = req.body;
    const form = new Form({ name, email, message });
    form.save((error, data) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            res.json(data);
        }
    });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
