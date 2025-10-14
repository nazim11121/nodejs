const express = require('express');
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello now you enter to express js.');
});
app.get('/', (req, res) => res.send('Hello Express!'));
app.post('/user', (req, res) => res.json(req.body));
app.put('/user/:id', (req, res) => { res.json({ id: req.params.id, ...req.body }); });
app.delete('/user/:id', (req, res) => { res.json({ id: req.params.id }); });
app.listen(3001, () => console.log('Express server is running on 3001'));