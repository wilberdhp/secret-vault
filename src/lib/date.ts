export const formatDate = (numericDate: number): string => {
  const date = new Date(numericDate);

  //   const date = numericDate == 0 || !numericDate ? new Date() : new Date(numericDate);


  const formatted = date.toISOString().split('T')[0];
  
  return formatted
}