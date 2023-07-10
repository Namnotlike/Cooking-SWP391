export const formatDate = (date: Date): string => {
    return date.toString().substring(0,10);
};

export const formatDateString = (date: string): string => {
    return date.substring(0,10);
};
  
export const getTimeDiff = (createAt: Date): string => {
  const currentDateTime = new Date();
  const createAtDate = new Date(createAt);
  const diffInMinutes = Math.floor((currentDateTime.getTime() - createAtDate.getTime()) / (1000 * 60));
  if (diffInMinutes < 1) {
      return 'Just now';
  } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
  } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};

export const calculateAge = (dateOfBirth: string) => {
    const currentDate = new Date();
    const dob = new Date(dateOfBirth);
     // Tính toán khoảng thời gian giữa ngày hiện tại và ngày sinh
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    // Kiểm tra nếu chưa đến ngày sinh trong năm nay hoặc đã qua ngày sinh trong năm nay
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}