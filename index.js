const express = require('express');

const server = express();

server.get('/', (req, res) => res.sendFile('index.html', { root: 'public', maxAge: 0 }));

// serve static files
server.use(express.static('public', { maxAge: 0 }));

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Listening on ${port}`);
});