const app = require('./src/app');

const port = process.env.PORT || 5188;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});