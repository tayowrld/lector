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

// Функция для чтения лекций из файла
const readLecturesFromFile = () => {
  try {
    const data = fs.readFileSync(lecturesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    return []; // Если файл пустой или отсутствует, возвращаем пустой массив
  }
};

// Функция для записи лекций в файл
const writeLecturesToFile = (lectures) => {
  try {
    fs.writeFileSync(lecturesFilePath, JSON.stringify(lectures, null, 2));
    console.log('Файл lectures.json успешно обновлен');
  } catch (err) {
    console.error('Ошибка при записи в файл:', err);
  }
};

// Эндпоинт для получения всех лекций
app.get('/lectures', (req, res) => {
  const lectures = readLecturesFromFile();
  res.setHeader('Content-Type', 'application/json');
  res.json(lectures);
});

// Эндпоинт для добавления лекций
app.post('/lectures', (req, res) => {
  const newLecture = req.body;

  const lectures = readLecturesFromFile(); // Читаем текущие лекции
  lectures.push(newLecture); // Добавляем новую лекцию

  writeLecturesToFile(lectures); // Записываем обновленный список лекций в файл

  res.status(201).json(newLecture); // Отправляем обратно добавленную лекцию
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
