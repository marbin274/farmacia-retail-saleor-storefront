import debounce from 'lodash.debounce';
import * as React from "react";
import TextField, { TextFieldProps } from "../TextField";

interface DebouncedTextFieldProps extends TextFieldProps {
  time?: number;
  handleDebounce:(nextValue: string)=>void;
}

const DebouncedTextField: React.FC<DebouncedTextFieldProps> = props => {
  const {
    time,
    value,
    onChange,
    handleDebounce,
    ...textFieldProps
  } = props;

  const debouncedSave = React.useCallback(
		debounce((nextValue: string) => handleDebounce(nextValue), time),
		[]
	);

  const handleChange = event =>{
    const { value: nextValue } = event.target;
    onChange(event);
    debouncedSave(nextValue);
  }

  
  return (
    <TextField {...textFieldProps} value={value} onChange={handleChange} />
  );
};

DebouncedTextField.defaultProps = {
  time: 250,
};

export default DebouncedTextField;
