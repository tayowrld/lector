import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLecture = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  // Преобразование даты в формат YYYY-MM-DD
  const formatDateToYYYYMMDD = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Добавляем один день к дате
  const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // Добавляем 1 день
    return newDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && link) {
      const newLecture = {
        title,
        date: formatDateToYYYYMMDD(addOneDay(date)), // Добавляем один день к выбранной дате
        link,
      };

      // Отправляем данные на сервер
      fetch("http://localhost:5121/lectures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLecture),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Лекция добавлена!");
          navigate("/");
        })
        .catch((error) => console.error("Ошибка при добавлении лекции:", error));
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => navigate("/")}>Вернуться назад</button>
        <button onClick={handleSubmit} disabled={!title || !date || !link}>Опубликовать</button>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название лекции"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Выберите дату"
          dateFormat="yyyy-MM-dd"
        />
        <input
          type="text"
          placeholder="Ссылка на лекцию"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AddLecture;
