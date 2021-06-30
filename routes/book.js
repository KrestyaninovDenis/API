const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');

const stor = {
    books: [],
}; 
[1, 2, 3, 4].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => { //получаем массив всех книг
    const {books} = stor;
    res.json (books);
});

router.get('/:id', (req, res) => { //получаем объект книги, если запись не найдено вернем Code: 404
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

router.post('/', (req, res) => { //создаем книги и возврашаем ее же вместе с присвоенным id
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => { //редактируем объект книги, если запись не найдено вернем Code: 404
    const {books} = stor;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        };
        res.json(books[idx]);
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
});

router.delete('/:id', (req, res) => { //удаляем книгу и возвращаем ответ: 'ok'
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

// загрузка файлов
router.post('/download', fileMiddleware.single('book-txt'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    //const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = books.findIndex (el => el.id === id);
    if (idx !== -1) {
        res.download(__dirname+'/../public/txt/'+books[idx].fileBook+'.txt', 'load book', err=>{
            if (err){
                res.status(404).json();
            }
        });
    }
    else
    {
        res.status (404);
        res.json ('запись не найдена')
    }
    console.log(books[idx].fileBook)

});



module.exports = router;