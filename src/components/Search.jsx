import { useState } from "react";

function Search(props) {
  const [searchInput, setSearchInput] = useState("");

  const handsleSearchChange = (event) => {
    // guardamos el valor en el estado
    setSearchInput(event.target.value);

    // Filtrar el array de juegos
    props.searchProduct(event.target.value);
  };

return (
  <div>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Búsquedas</h2>

    <input
      type="text"
      name="search"
      value={searchInput}
      placeholder="Busca por nombre o plataforma"
      onChange={handsleSearchChange}
      style={{
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "20px",
        width: "300px",
        boxSizing: "border-box",
      }}
    />
  </div>
);
}

export default Search;
