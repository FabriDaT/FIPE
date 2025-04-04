import { backendUrl, SecretKey } from '../config/constants'

export const fetchLogin = async (email, password) => {
  const response = await fetch(`${backendUrl}/api/auth/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': SecretKey,
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return await response.json();
};