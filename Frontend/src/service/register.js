import { backendUrl, SecretKey } from '../config/constants';

export const fetchRegister = async (email, password, name) => {
  try {
    const response = await fetch(`${backendUrl}/api/auth/register`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SecretKey,
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en el registro:', error.message);
    throw error; // Propaga el error para manejo en el componente
  }
};