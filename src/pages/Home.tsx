import React, { useState } from 'react';
import { ItemList } from '../components/molecules/ItemList';
import { useItemContext } from '../context/ItemContext';
import { Item } from '../interfaces/Item.interface';
import { ItemForm } from '../components/organism/ItemForm';


const Home: React.FC = () => {
  const { items, addItem } = useItemContext();
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  
  const handleAddItem = async (data: Omit<Item, 'id'>) => {
    try {
      const newItem = await addItem(data); 
      setCurrentItem(newItem); 
    } catch (error) {
      console.error("Error adding item:", error); 
    }
  };

  return (
    <div className='home'>
      <div className='home__container'>
        <h1 className='home__title'>Add New Item</h1>
        <ItemForm onSubmit={handleAddItem}  /> 
      </div>
      <div className='home__list'>
        <h2 className='home__list__title'>Items List</h2>
        <ItemList items={currentItem ? [currentItem] : items} /> 
      </div>
    </div>
  );
};

export default Home;
