const express = require ('express');
const app = express();

const cors = require ('cors');
const bodyParser = require ('body-parser');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

app.use(bodyParser());
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/api/book', bookRouter);
app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер стартовал, порт: ${PORT}`);
});
