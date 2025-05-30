import React, { useEffect, useState } from 'react';
import './Sidebar.css';

export const Sidebar = () => {
  const [calendar, setCalendar] = useState('');
  const [today, setToday] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [temperature, setTemperature] = useState('32°C 🌤️'); // Static for now
  const [quote, setQuote] = useState('');

  useEffect(() => {
    generateCalendar();

    const now = new Date();
    setToday(now.toLocaleDateString());
    setDayOfWeek(now.toLocaleString('default', { weekday: 'long' }));

    const quotes = [
      "Smile and breathe 🌸",
      "Believe in yourself! 🌈",
      "You’re doing great! 🌿",
      "Keep pushing forward! 🦋 ",
      "Every day is a new chance. 🌼",
      
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const generateCalendar = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const today = now.getDate();
    const firstDay = new Date(year, now.getMonth(), 1).getDay();
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

    let html = `<table class="custom-calendar"><caption>${month} ${year}</caption>`;
    html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          html += '<td></td>';
        } else if (day > daysInMonth) {
          html += '<td></td>';
        } else {
          if (day === today) {
            html += `<td class="today">${day}</td>`;
          } else {
            html += `<td>${day}</td>`;
          }
          day++;
        }
      }
      html += '</tr>';
      if (day > daysInMonth) break;
    }
    html += '</table>';
    setCalendar(html);
  };

  return (
    <div className="sidebar">
      <h3>Quick Info</h3>
      <ul>
        <li>📅 {today}</li>
        <li>🗓️ {dayOfWeek}</li>
        <li>🌡️ {temperature}</li>
        <li> {quote}</li>
      </ul>

      <div className="calendar" dangerouslySetInnerHTML={{ __html: calendar }}></div>
    </div>
  );
};
