import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

function SButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      disabled={disabled}
      size={size}
    >
      {loading ? <Spinner animation='border' variant='light' size='sm' /> : children}
    </Button>
  );
}

export default SButton;