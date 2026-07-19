import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    console.log(`Received event: ${event}`);

    if (event === 'pull_request' && payload.action === 'opened') {
        console.log('PR opened! Running SovereignLayer verification...');
    }

    res.status(200).send('Event received');
});

app.listen(3000, () => console.log('SovereignLayer Webhook server running on port 3000'));
