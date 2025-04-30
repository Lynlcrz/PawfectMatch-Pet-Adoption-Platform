const BASE_URL = 'http://localhost:5000/api';

export interface SignUpResponse {
  id?: string;
  username?: string;
  email?: string;
  message?: string;
}

export const signUpUser = async (
  username: string,
  email: string,
  password: string
): Promise<SignUpResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    return await response.json();
  } catch (error) {
    return { message: 'Network error. Please try again.' };
  }
};