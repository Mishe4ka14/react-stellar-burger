import { useState } from 'react';


//вспомогательная функция для обработки инпутов
export function useInputHandlers(inputValues: {[name: string]: string}) {
  const [values, setInputValues] = useState(inputValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({
      ...values,
      [name]: value,
    });
  };

  return {values, handleInputChange, setInputValues};
}