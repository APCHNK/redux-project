import { useDispatch } from "react-redux";
import { fetchHeroes } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesListItem = ({ name, text, element, id }) => {
  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-success bg-gradient";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  const { request } = useHttp();

  const dispatch = useDispatch();
  const onDelete = () => {
    console.log("delete", id);
    request(`http://localhost:3001/heroes/${id}`, "DELETE").then(() =>
      dispatch(fetchHeroes())
    );
  };

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
      key={id}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{text}</p>
      </div>
      <span
        className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
        onClick={(e) => onDelete(e)}
      >
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
