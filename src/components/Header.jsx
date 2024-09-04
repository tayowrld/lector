import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Конспекты 436</h1>
      <Link to="/add">Добавить лекцию</Link>
    </header>
  );
};

export default Header;
