const express = require ('express');
const cors = require ('cors');
const formData = require ('express-form-data');

const app = express();

app.use(formData.parse());
app.use(cors());


const uidGenerator = require ('node-unique-id-generator');
class Book {
    constructor (title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uidGenerator.generateUniqueId()) { 
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}
const stor = {
    books: [],
}; 
[1, 2, 3, 4].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`);
    stor.books.push(newBook);
});




app.post('/api/user/login', (req, res) => { //метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
    res.status (201);
    res.json ('заглушка');
});

app.get('/api/books', (req, res) => { //получаем массив всех книг
    const {books} = stor;
    res.json (books);
});

app.get('/api/books/:id', (req, res) => { //получаем объект книги, если запись не найдено вернем Code: 404
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        res.json (books[idx]);
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});

app.post('/api/books', (req, res) => { //создаем книги и возврашаем ее же вместе с присвоенным id
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => { //редактируем объект книги, если запись не найдено вернем Code: 404
    const {books} = stor;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };
        res.json(books[idx]);
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});

app.delete('/api/books/:id', (req, res) => { //удаляем книгу и возвращаем ответ: 'ok'
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        books.splice(idx,1)
        res.json(true);
        res.json('ok')
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
