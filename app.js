'use strict'
let express= require('express');
let app = express();
let port = process.env.PORT || 8000;
let path = require('path')
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

app.use('/public', express.static(path.join(__dirname, '/public')));

let assassinsRouter = require('./routes/assassins');
let contractsRouter = require('./routes/contracts');
let home = require('./routes/');
//let assassinContractsRouter = require('./routes/assassins_contracts');



app.disable('x-powered-by');
app.use(morgan('short'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.use('/assassins', assassinsRouter);
app.use('/contracts',contractsRouter);
app.use('/', home);
// app.use('/assassins_contracts', assassinContractsRouter);

app.listen(port);
