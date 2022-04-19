const app = require('./app');

// Start the server
const port = process.env.PORT || 3500;
app.listen(port, () => console.log('listening on port ' + port));