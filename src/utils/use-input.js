import { useState } from 'react';


//вспомогательная функция для обработки инпутов
export function useInputHandlers() {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return [inputValues, handleInputChange];
}