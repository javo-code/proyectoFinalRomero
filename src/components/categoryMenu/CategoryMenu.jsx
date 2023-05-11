import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './categoryMenu.css';

const CategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  return (
    <div className="CategoryMenu">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">CATEGORIAS</option>
        <option value="nutrition">Nutrición Enteral</option>
        <option value="deponsables">Artículos Descartables</option>
        <option value="bombs">Bombas de Infusión</option>
      </select>
      {selectedCategory && (
       <NavLink to={`/category/${selectedCategory}`} activeclassname="selected">
  <button className='btn-go'>Ir</button>
</NavLink>
      )}
    </div>
  );
};

export default CategoryMenu;
