import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({ extended: false });
import express from 'express';
import { rabbitMqLong, rabbitMqShort } from './utils_rabbit.js';
const app = express();
const port = 3000;
app.get('/form', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});
app.post('/', urlencodedParser, async (req, res) => {
    const longUrl = req.body.longurl;
    const account = req.body.account;
    const shortUrl = req.body.shorturl;
    if (longUrl && account) {
        console.log("request longUrl send !!");
        await rabbitMqLong(longUrl, account);
        res.send("request longUrl send !!");
    }
    if (shortUrl) {
        console.log("request shortUrl send !!");
        await rabbitMqShort(shortUrl);
        res.send("request shortUrl send !!");
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/form`);
});
