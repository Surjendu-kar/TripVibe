export function formatDate(dateString: string, format: 'full' | 'short' = 'full'): string {
    const date = new Date(dateString);
    if (format === 'short') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    } else {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
      };
      return date.toLocaleDateString('en-US', options);
    }
  }
  
  export function getAllDates(start: string, end: string): string[] {
    const dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates.map(date => date.toISOString());
  }