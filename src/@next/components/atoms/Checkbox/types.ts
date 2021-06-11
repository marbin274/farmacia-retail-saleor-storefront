import React, { InputHTMLAttributes } from 'react';
export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  parentStyles?: React.CSSProperties;
  checked?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  name: string;
  onChange?: (event: React.SyntheticEvent) => void;
} 
