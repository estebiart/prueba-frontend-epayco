import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Item } from '../../../interfaces/Item.interface';
import { ItemFormProps } from './ItemForm.types';



const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
  });

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting, isSubmitted, isValid } 
  } = useForm<Omit<Item, 'id'>>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit', 
  });

  const handleFormSubmit = async (data: Omit<Item, 'id'>) => {
    await onSubmit(data);
    reset(); 
  };

  return (
    <form className='home__form' onSubmit={handleSubmit(handleFormSubmit)}>
      <input 
        className={`home__input ${errors.title ? 'border-accent' : 'border-gray-300'}`} 
        {...register('title')} 
        placeholder="Title" 
      />
      {errors.title && <p className="text-accent">{errors.title.message}</p>}

      <textarea 
        className={`home__textarea ${errors.body ? 'border-accent' : 'border-gray-300'}`} 
        {...register('body')} 
        placeholder="Body" 
      />
      {errors.body && <p className="text-accent">{errors.body.message}</p>} 

      <button 
        className={`home__button ${(!isValid && isSubmitted) || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}`} 
        type="submit" 
        disabled={(!isValid && isSubmitted) || isSubmitting} 
      >
        {isSubmitting ? 'Submitting...' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
