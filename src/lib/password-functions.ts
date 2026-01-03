export const generatePassword = () => {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return newPassword;
};


export const analyzePassword = (password: string) => {
  let strength = 0;
  if (password.trim().length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return 'Débil';
  else if (strength <= 3) return 'Media';
  else if (strength <= 4) return 'Fuerte';
  else return 'Muy Fuerte';
};


export const estimateCrackTime = (password: string) => {
  const charsetSize = 95; // Aproximación para caracteres imprimibles
  const attemptsPerSecond = 1000000000; // 1 billón de intentos por segundo
  const combinations = Math.pow(charsetSize, password.trim().length);
  const seconds = combinations / attemptsPerSecond;
  
  if (seconds < 60) return `${Math.round(seconds)} segundos`;
  else if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
  else if (seconds < 86400) return `${Math.round(seconds / 60)} horas`;
  else if (seconds < 31536000) return `${Math.round(seconds / 86400)} días`;
  else return `${Math.round(seconds / 31536000)} años`;
};