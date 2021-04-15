const isProductionEnv = process.env.NODE_ENV === 'production';
export const API_URL = isProductionEnv ? 'https://dance-school-management-system.herokuapp.com' : `http://localhost:3000`;
