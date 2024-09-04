import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LectureList = () => {
  const [lectures, setLectures] = useState([]); // Все лекции
  const [filteredLectures, setFilteredLectures] = useState([]); // Отфильтрованные лекции
  const [selectedDate, setSelectedDate] = useState(new Date()); // Сегодняшняя дата по умолчанию

  // Функция для загрузки лекций с сервера
  const fetchLectures = async () => {
    try {
      const response = await fetch("http://localhost:5121/lectures");
      const data = await response.json();
      setLectures(data);
      filterLecturesByDate(new Date(), data); // Фильтруем по сегодняшней дате сразу после загрузки
    } catch (error) {
      console.error("Ошибка при загрузке лекций:", error);
    }
  };

  // Преобразование даты в строку "YYYY-MM-DD"
  const formatDateToYYYYMMDD = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Функция для фильтрации лекций по дате
  const filterLecturesByDate = (date, allLectures) => {
    const formattedDate = formatDateToYYYYMMDD(date); // Преобразуем дату в строку YYYY-MM-DD
    const filtered = allLectures.filter((lecture) => lecture.date === formattedDate);
    setFilteredLectures(filtered);
  };

  // Загружаем лекции при монтировании компонента
  useEffect(() => {
    fetchLectures();
  }, []);

  // Обработчик изменения даты
  const handleDateChange = (date) => {
    setSelectedDate(date); // Обновляем выбранную дату
    filterLecturesByDate(date, lectures); // Фильтруем лекции по выбранной дате
  };

  return (
    <div className="list">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Фильтр по дате"
        dateFormat="yyyy-MM-dd" // Форматирование даты в календаре
        className="datePicker"
      />
      {filteredLectures.length > 0 ? (
        <ul>
          {filteredLectures.map((lecture, index) => (
            <li key={index}>
              <a target="_blank" href={lecture.link}>{lecture.title} - {lecture.date}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Лекций на выбранную дату нет.</p>
      )}
    </div>
  );
};

export default LectureList;
