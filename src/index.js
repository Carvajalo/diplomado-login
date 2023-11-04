
const app = require('./app.js');
const database = require('./database.js');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});