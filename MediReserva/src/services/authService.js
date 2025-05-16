export function loginUserFake(email, password) {
  if (email && password) {
    localStorage.setItem('user', JSON.stringify({ email }));
    return { success: true, token: 'fake-token' };
  }
  return { success: false };
}