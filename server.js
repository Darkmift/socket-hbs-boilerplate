const path = require('path');

const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const axios = require('axios');

const port = 8080;

const http = require('http');
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//VIEW ENGINE
const exphbs = require('express-handlebars');
app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            fetch: async function (url) {
                try {
                    const res = await axios(url);
                    console.log('🚀 ~ file: server.js ~ line 31 ~ res', res);
                    return res.data;
                } catch (error) {
                    return error;
                }
            },
        },
    })
);

app.set('view engine', 'hbs');

// ROUTES
app.get('/', function (req, res) {
    res.render('home', { test: 'working' });
});
app.get('/testUrl', function (req, res) {
    res.json({ test: 'route working' });
});

//SOCKETS
const { socketService } = require('./services/io.service');
socketService(server);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
