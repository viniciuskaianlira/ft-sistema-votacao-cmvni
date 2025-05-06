import { useRouter } from 'vue-router';

export const checkAuth = (to, from, next) => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  if (!token) {
    return next({ name: 'Login' });
  }
  next();
};
