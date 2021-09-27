import React from 'react';

export const ErrorForm: React.FC = ({ children }) => {
  return (
    <p
      className="fc-block fc-mt-2 fc-text-xs fc-leading-3 fc-text-error-medium"
      role="error-paragraph"
    >
      {children}
    </p>
  );
};
