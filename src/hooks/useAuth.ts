// hooks/useAuth.ts
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('isAuthenticated useAuth');

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth', { method: 'GET' });

      console.log(res);

      console.log('res');

      setIsAuthenticated(res.ok);
    };
    checkAuth();
  }, []);

  return isAuthenticated;
};
