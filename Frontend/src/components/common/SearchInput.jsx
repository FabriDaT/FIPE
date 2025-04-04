import { useState } from "react"; // Importamos useState para manejar el estado del input
import PropTypes from "prop-types";

const SearchInput = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState(""); // Estado para almacenar el valor de búsqueda

  // Función para manejar el cambio en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); // Actualizamos el estado con el valor del input
    onSearch(value); // Ejecutamos la función de búsqueda pasada como prop
  };

  return (
    <div className="relative w-[60%]">
      <svg
        className="absolute left-3 top-[24px] transform -translate-y-1/2 text-gray-400"
        width="20"
        height="20"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 2.50003C4.93913 2.50003 3.92172 2.92146 3.17157 3.67161C2.42143 4.42175 2 5.43917 2 6.50003C2 7.5609 2.42143 8.57832 3.17157 9.32846C3.92172 10.0786 4.93913 10.5 6 10.5C7.06087 10.5 8.07828 10.0786 8.82843 9.32846C9.57857 8.57832 10 7.5609 10 6.50003C10 5.43917 9.57857 4.42175 8.82843 3.67161C8.07828 2.92146 7.06087 2.50003 6 2.50003ZM1.13461e-07 6.50003C-0.00012039 5.55574 0.222642 4.62475 0.650171 3.78278C1.0777 2.9408 1.69792 2.21163 2.4604 1.65456C3.22287 1.09749 4.10606 0.728246 5.03815 0.576867C5.97023 0.425488 6.92488 0.496245 7.82446 0.783384C8.72404 1.07052 9.54315 1.56594 10.2152 2.22933C10.8872 2.89272 11.3931 3.70537 11.6919 4.60117C11.9906 5.49697 12.0737 6.45063 11.9343 7.38459C11.795 8.31855 11.4372 9.20643 10.89 9.97603L15.707 14.793C15.8892 14.9816 15.99 15.2342 15.9877 15.4964C15.9854 15.7586 15.8802 16.0094 15.6948 16.1949C15.5094 16.3803 15.2586 16.4854 14.9964 16.4877C14.7342 16.49 14.4816 16.3892 14.293 16.207L9.477 11.391C8.57936 12.0293 7.52335 12.4082 6.42468 12.4862C5.326 12.5641 4.22707 12.3381 3.2483 11.833C2.26953 11.3279 1.44869 10.5631 0.875723 9.62239C0.30276 8.68171 -0.000214051 7.60147 1.13461e-07 6.50003Z"
          fill="#1E1E1E"
          fillOpacity="0.5"
        />
      </svg>

      <input
        type="text"
        placeholder="Buscador"
        value={searchValue} // Valor controlado por el estado
        onChange={handleInputChange} // Maneja el cambio en el input
        className="border-none p-2 pl-10 w-full mb-4 rounded-lg  focus:ring-2 focus:ring-gris2 shadow-lg"
      />
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired, // Prop para la función de búsqueda
};

export default SearchInput;
