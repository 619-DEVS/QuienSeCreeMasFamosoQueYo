require('dotenv').config();
// This is a test
const express = require('express');
const cors = require('cors');
const { notFollowing, notFollowingMe } = require('./compareFiles');
const { loadData } = require('./process');
const {getFingerprint, setFingerprint, removeFingerprint, changeFingerprint} = require('./fingerprint');

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
        return res.status(500).json(responseData);
    }

    const response = notFollowingMe(req.body.username);
    if (response?.status == 'error') {
        return res.status(400).json(response);
    }
    return res.status(200).json({ 'data': response });
});

router.post('/not-following', async (req, res) => {
    const responseData = await loadData(req.body.username);

    if (responseData?.status == 'error') {
        return res.status(500).json(responseData);
    }

    const response = notFollowing(req.body.username);
    if (response?.status == 'error') {
        return res.status(400).json(response);
    }
    return res.status(200).json({ 'data': response });
});

router.post('/fingerprint', async (req, res) => {
    const response = setFingerprint(req.body.fingerprint);
    res.status(204).json({});
});

router.get('/fingerprint/:fingerprint', async (req, res) => {
    const response = getFingerprint(req.params.fingerprint);
    return res.status(200).json({'fingerprint':response})
});

router.put('/fingerprint/:fingerprint', async (req, res) => {
    console.log('::value', req.body.value);
    
    const response = changeFingerprint(req.params.fingerprint, req.body.value);
    return res.status(200).json({});
});

router.delete('/fingerprint/:fingerprint', )


app.use(router);


app.listen(port, () => console.log(`APP DE GORDO [Puerto: ${port}]`));
