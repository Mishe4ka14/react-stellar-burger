import { useState } from 'react';


//вспомогательная функция для обработки инпутов
export function useInputHandlers(inputValues) {
  const [values, setInputValues] = useState(inputValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...values,
      [name]: value,
    });
  };

  return [values, handleInputChange, setInputValues];
}