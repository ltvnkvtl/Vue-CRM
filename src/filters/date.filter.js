export default function dateFilter(value, format = 'date') {
  const options = {};

  // method from browser API that enable language-sensitive date and time formatting
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }
  
  return Intl.DateTimeFormat('ru-RU', options).format(new Date(value)); 
}