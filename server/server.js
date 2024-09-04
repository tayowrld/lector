import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Для работы с путями в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем приложение Express
const app = express();
const PORT = 5121;

// Включаем CORS
app.use(cors());

// Для обработки JSON
app.use(bodyParser.json());

// Путь к файлу JSON с лекциями
const lecturesFilePath = path.join(__dirname, 'lectures.json');

// Эндпоинт для получения всех лекций
app.get('/lectures', (req, res) => {
  fs.readFile(lecturesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при чтении файла' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.parse(data));
  });
});

// Эндпоинт для добавления лекций
app.post('/lectures', (req, res) => {
  const newLecture = req.body;

  fs.readFile(lecturesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при чтении файла' });
    }

    const lectures = JSON.parse(data);
    lectures.push(newLecture);

    fs.writeFile(lecturesFilePath, JSON.stringify(lectures, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка при записи в файл' });
      }

      res.status(201).json(newLecture);
    });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
