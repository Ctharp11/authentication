const app = require('./app');

//ports
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening at ${port}`)
})