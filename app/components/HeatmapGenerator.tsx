import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const HeatmapGenerator = () => {
  const [timezone, setTimezone] = useState('US/Pacific');
  const [year, setYear] = useState(new Date().getFullYear());
  const [heatmapData, setHeatmapData] = useState(null);
  const [stats, setStats] = useState({ total: 0, maxDate: null, maxCount: 0 });
  
  // Generate weeks array for the entire year
  const getWeeksArray = (year) => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const weeks = [];
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
      const week = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000));
      if (!weeks.includes(week)) weeks.push(week);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weeks;
  };

  const processConversations = (jsonData) => {
    const dateCountMap = new Map();
    const startDate = new Date(year, 0, 1);
    let totalConvos = 0;
    let maxCount = 0;
    let maxDate = null;

    // Initialize empty data structure
    const yearData = Array(53).fill().map(() => Array(7).fill(0));
    
    jsonData.forEach(conv => {
      const timestamp = conv.create_time * 1000; // Convert to milliseconds
      const date = new Date(timestamp);
      
      if (date.getFullYear() === year) {
        const week = Math.floor((date - startDate) / (7 * 24 * 60 * 60 * 1000));
        const dayOfWeek = (date.getDay() + 6) % 7; // Monday = 0, Sunday = 6
        
        yearData[week][dayOfWeek]++;
        totalConvos++;
        
        // Track maximum
        if (yearData[week][dayOfWeek] > maxCount) {
          maxCount = yearData[week][dayOfWeek];
          maxDate = date;
        }
      }
    });

    setHeatmapData(yearData);
    setStats({
      total: totalConvos,
      maxDate: maxDate?.toLocaleDateString(),
      maxCount: maxCount
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          processConversations(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Get color based on value using a green color scheme similar to the Python version
  const getColor = (value) => {
    if (value === 0) return '#f0f0f0';
    const intensity = Math.min(value / (stats.maxCount * 0.9), 1);
    const green = Math.floor(intensity * 255);
    return `rgb(0, ${green}, 0)`;
  };

  // Get month labels
  const getMonthLabels = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const week = Math.floor((date - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000));
      months.push({ label: date.toLocaleString('default', { month: 'short' }), week });
    }
    return months;
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="text-xl">
          {year} ChatGPT Conversation Heatmap
          {stats.total > 0 && (
            <span className="block text-sm text-gray-600 mt-2">
              Total: {stats.total} conversations
              {stats.maxDate && ` • Most active day: ${stats.maxDate} with ${stats.maxCount} conversations`}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {['US/Pacific', 'US/Eastern', 'UTC', 'Europe/London', 'Asia/Tokyo'].map(tz => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {[2022, 2023, 2024, 2025].map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload').click()}
              className="w-48"
            >
              Upload conversations.json
            </Button>
          </div>

          {heatmapData && (
            <div className="relative overflow-x-auto">
              <div className="flex">
                <div className="w-16">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="h-8 flex items-center justify-end pr-2 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="flex flex-wrap">
                      {heatmapData.map((week, weekIndex) => (
                        <div key={weekIndex} className="w-8">
                          {week.map((value, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className="h-8 border border-gray-200 relative"
                              style={{ backgroundColor: getColor(value) }}
                            >
                              {value > 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-xs">
                                  {value}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="absolute -bottom-6 left-0 right-0">
                      <div className="flex">
                        {getMonthLabels().map(({ label, week }, i) => (
                          <div
                            key={i}
                            className="w-8 text-center text-xs"
                            style={{ marginLeft: i === 0 ? `${week * 2}rem` : 0 }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapGenerator;