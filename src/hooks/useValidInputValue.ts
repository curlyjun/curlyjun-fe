import { useState, ChangeEvent } from 'react';

interface UseValidInputValueParams {
  initalValue?: string;
  pattern: RegExp;
}

export const useValidInputValue = ({ initalValue = '', pattern }: UseValidInputValueParams) => {
  const [inputValue, setInputValue] = useState<string>(initalValue);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (checkIsValid(value)) {
      if (showErrorMessage) {
        setShowErrorMessage(false);
      }
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onBlur = () => {
    if (!checkIsValid(inputValue)) {
      setShowErrorMessage(true);
    }
  };

  const checkIsValid = (value: string) => {
    if (!pattern.test(value)) {
      return false;
    }

    return true;
  };

  return {
    value: inputValue,
    isValid,
    showErrorMessage,
    onChange,
    onBlur,
  };
};
