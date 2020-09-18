import React, { useCallback } from 'react';

export default function useToggle(initiallyActive) {
  const [isActive, setIsActive] = React.useState(initiallyActive);
  const toggle = useCallback(() => setIsActive(isActive => !isActive), []);
  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);

  return [isActive, toggle, deactivate, activate];
}
