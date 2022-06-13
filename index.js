require('dotenv').config();
// This is a test
const express = require('express');
const cors = require('cors');
const { notFollowing, notFollowingMe } = require('./compareFiles');
const { loadData } = require('./process');

const app = express();
const port = process.env.PORT;
const router = express.Router();

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false, limit: '15mb' }));
app.use(express.json({ limit: '15mb' }));


// Rutas
router.post('/not-following-me', async (req, res) => {

    const responseData = await loadData(req.body.username);
    if (responseData?.status == 'error') {
        return res.status(200).json(responseData);
    }

    const response = notFollowingMe(req.body.username);
    if (response?.status == 'error') {
        return res.status(200).json(response);
    }
    return res.status(200).json({ 'data': response });
});

router.post('/not-following', async (req, res) => {
    const responseData = await loadData(req.body.username);

    if (responseData?.status == 'error') {
        return res.status(200).json(responseData);
    }

    const response = notFollowing(req.body.username);
    if (response?.status == 'error') {
        return res.status(200).json(response);
    }
    return res.status(200).json({ 'data': response });
});


app.use(router);


app.listen(port, () => console.log(`APP DE GORDO [Puerto: ${port}]`));
