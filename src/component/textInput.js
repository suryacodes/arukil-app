import React, {useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const InputField = ({
  onChangeText = () => {},
  isFocus = () => {},
  placeholder,
  keyboardType = 'default',
  value,
  isEditable = true,
  customStyle = {},
  changeStyle = false,
  maxLength = 1000,
  autoFocus = false,
}) => {
  const inputRef = useRef(null);
  const [focus, setFocus] = React.useState(false);

  if (changeStyle) {
    customStyle = {
      ...customStyle,
      borderBottomColor: focus ? '#e91e61' : '#ddd',
      borderBottomWidth: focus ? 1.8 : 0.7,
      height: 45,
    };
  }

  useEffect(() => {
    const callback = () => {
      inputRef.current.blur();
    };
    if (focus) {
      isFocus(callback);
    }
  }, [focus]);

  return (
    <TextInput
      ref={inputRef}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      value={value}
      autoFocus={autoFocus}
      maxLength={maxLength}
      editable={isEditable}
      style={customStyle}
    />
  );
};

export default InputField;
