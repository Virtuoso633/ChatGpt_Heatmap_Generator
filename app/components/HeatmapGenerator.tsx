// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from '@/components/ui/button';

// interface Conversation {
//   create_time: number;
// }

// interface Stats {
//   total: number;
//   maxDate: string | null;
//   maxCount: number;
// }

// const HeatmapGenerator: React.FC = () => {
//   const [timezone, setTimezone] = useState('US/Pacific');
//   const currentYear = new Date().getFullYear();
//   const [year, setYear] = useState(currentYear);
//   const [heatmapData, setHeatmapData] = useState<number[][]| null>(null);
//   const [stats, setStats] = useState<Stats>({ total: 0, maxDate: null, maxCount: 0 });

//   // Generate range of available years
//   const yearRange = Array.from(
//     { length: currentYear - 2021 }, 
//     (_, i) => 2022 + i
//   );
  
//   const processConversations = (jsonData: Conversation[]) => {
//     try {
//       const startDate = new Date(Date.UTC(year, 0, 1));
//       let totalConvos = 0;
//       let maxCount = 0;
//       let maxDate: Date = new Date();

//       // Initialize empty data structure (53 weeks × 7 days)
//       const yearData = Array(53).fill(null).map(() => Array(7).fill(0));
      
//       jsonData.forEach(conv => {
//         try {
//           const timestamp = conv.create_time * 1000;
//           const date = new Date(timestamp);
          
//           if (date.getFullYear() === year) {
//             const weekNumber = Math.floor((date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
            
//             if (weekNumber >= 0 && weekNumber < 53) {
//               const dayOfWeek = (date.getDay() + 6) % 7;
              
//               if (yearData[weekNumber]) {
//                 yearData[weekNumber][dayOfWeek]++;
//                 totalConvos++;
                
//                 if (yearData[weekNumber][dayOfWeek] > maxCount) {
//                   maxCount = yearData[weekNumber][dayOfWeek];
//                   maxDate = date;
//                 }
//               }
//             }
//           }
//         } catch (error) {
//           console.error('Error processing conversation:', error);
//         }
//       });

//       setHeatmapData(yearData);
//       setStats({
//         total: totalConvos,
//         maxDate: maxDate?.toLocaleDateString(undefined, {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//         }),
//         maxCount: maxCount
//       });
//     } catch (error) {
//       console.error('Error in processConversations:', error);
//       setHeatmapData(null);
//       setStats({ total: 0, maxDate: null, maxCount: 0 });
//     }
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const result = e.target?.result;
//         if (typeof result === 'string') {
//           const json = JSON.parse(result);
//           processConversations(json);
//         }
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         setHeatmapData(null);
//         setStats({ total: 0, maxDate: null, maxCount: 0 });
//       }
//     };
//     reader.onerror = () => {
//       console.error('Error reading file');
//     };
//     reader.readAsText(file);
//   };

//   const getColor = (value: number): string => {
//     if (value === 0) return '#f0f0f0';
//     const maxValue = stats.maxCount || 1;
//     const intensity = Math.min(Math.max(value / (maxValue * 0.9), 0), 1);
//     const green = Math.floor(intensity * 255);
//     return `rgb(0, ${green}, 0)`;
//   };

//   const getMonthLabels = () => {
//     const months: { label: string; week: number }[] = [];
//     const startDate = new Date(Date.UTC(year, 0, 1));
    
//     for (let month = 0; month < 12; month++) {
//       const date = new Date(Date.UTC(year, month, 1));
//       const week = Math.floor((date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
//       months.push({
//         label: date.toLocaleString('default', { month: 'short' }),
//         week
//       });
//     }
//     return months;
//   };

//   const timezones = [
//     'US/Pacific',
//     'US/Eastern',
//     'UTC',
//     'Europe/London',
//     'Asia/Tokyo'
//   ] as const;

//   return (
//     <Card className="w-full max-w-6xl">
//       <CardHeader>
//         <CardTitle className="text-xl">
//           {year} ChatGPT Conversation Heatmap
//           {stats.total > 0 && (
//             <span className="block text-sm text-gray-600 mt-2">
//               Total: {stats.total.toLocaleString()} conversations
//               {stats.maxDate && ` • Most active day: ${stats.maxDate} with ${stats.maxCount.toLocaleString()} conversations`}
//             </span>
//           )}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           <div className="flex gap-4 items-center flex-wrap">
//             <div className="w-48">
//               <Select defaultValue={timezone} onValueChange={setTimezone}>
//                 <SelectTrigger id="timezone">
//                   <SelectValue placeholder="Select timezone" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                   <SelectLabel>Timezones</SelectLabel>
//                     {timezones.map(tz => (
//                       <SelectItem key={tz} value={tz}>
//                         {tz}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="w-32">
//               <Select defaultValue={year.toString()} onValueChange={(value) => setYear(parseInt(value, 10))}>
//                 <SelectTrigger id="year">
//                   <SelectValue placeholder="Select year" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                   <SelectLabel>Timezones</SelectLabel>
//                     {yearRange.map(y => (
//                       <SelectItem key={y} value={y.toString()}>
//                         {y}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <input
//               type="file"
//               accept=".json"
//               onChange={handleFileUpload}
//               className="hidden"
//               id="file-upload"
//             />
//             <Button
//               onClick={() => document.getElementById('file-upload')?.click()}
//               className="w-48"
//             >
//               Upload conversations.json
//             </Button>
//           </div>

//           {heatmapData && (
//             <div className="relative overflow-x-auto">
//               <div className="flex">
//                 <div className="w-16">
//                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                     <div key={day} className="h-8 flex items-center justify-end pr-2 text-sm">
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex-1">
//                   <div className="relative">
//                     <div className="flex flex-wrap">
//                       {heatmapData.map((week, weekIndex) => (
//                         <div key={weekIndex} className="w-8">
//                           {week.map((value, dayIndex) => (
//                             <div
//                               key={`${weekIndex}-${dayIndex}`}
//                               className="h-8 border border-gray-200 relative group"
//                               style={{ backgroundColor: getColor(value) }}
//                             >
//                               <div className="absolute inset-0 flex items-center justify-center text-xs">
//                                 {value > 0 && value}
//                               </div>
//                               <div className="hidden group-hover:block absolute z-10 bg-black text-white p-2 rounded text-xs -top-8 left-1/2 transform -translate-x-1/2">
//                                 {value} conversations
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="absolute -bottom-6 left-0 right-0">
//                       <div className="flex">
//                         {getMonthLabels().map(({ label, week }, i) => (
//                           <div
//                             key={i}
//                             className="w-8 text-center text-xs"
//                             style={{ marginLeft: i === 0 ? `${week * 2}rem` : 0 }}
//                           >
//                             {label}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default HeatmapGenerator;

"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface Conversation {
  create_time: number;
}

interface Stats {
  total: number;
  maxDate: string | null;
  maxCount: number;
}

const HeatmapGenerator: React.FC = () => {
  const [timezone, setTimezone] = useState('US/Pacific');
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [heatmapData, setHeatmapData] = useState<number[][]| null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, maxDate: null, maxCount: 0 });

  const yearRange = Array.from(
    { length: currentYear - 2021 }, 
    (_, i) => 2022 + i
  );
  
  const processConversations = (jsonData: Conversation[]) => {
    try {
      const startDate = new Date(Date.UTC(year, 0, 1));
      let totalConvos = 0;
      let maxCount = 0;
      let maxDate: Date = new Date();

      // Initialize 53 weeks × 7 days data structure
      const yearData = Array(53).fill(null).map(() => Array(7).fill(0));
      
      jsonData.forEach(conv => {
        try {
          const timestamp = conv.create_time * 1000;
          const date = new Date(timestamp);
          
          if (date.getFullYear() === year) {
            const weekNumber = Math.floor((date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
            
            if (weekNumber >= 0 && weekNumber < 53) {
              const dayOfWeek = (date.getDay() + 6) % 7; // Monday = 0, Sunday = 6
              
              if (yearData[weekNumber]) {
                yearData[weekNumber][dayOfWeek]++;
                totalConvos++;
                
                if (yearData[weekNumber][dayOfWeek] > maxCount) {
                  maxCount = yearData[weekNumber][dayOfWeek];
                  maxDate = date;
                }
              }
            }
          }
        } catch (error) {
          console.error('Error processing conversation:', error);
        }
      });

      setHeatmapData(yearData);
      setStats({
        total: totalConvos,
        maxDate: maxDate?.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        maxCount: maxCount
      });
    } catch (error) {
      console.error('Error in processConversations:', error);
      setHeatmapData(null);
      setStats({ total: 0, maxDate: null, maxCount: 0 });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const json = JSON.parse(result);
          processConversations(json);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setHeatmapData(null);
        setStats({ total: 0, maxDate: null, maxCount: 0 });
      }
    };
    reader.readAsText(file);
  };

  const getColor = (value: number): string => {
    if (value === 0) return '#ebedf0';
    const maxValue = stats.maxCount || 1;
    const p90 = maxValue * 0.9; // 90th percentile like in Python version
    const intensity = Math.min(Math.max(value / p90, 0), 1);
    return `rgb(${Math.round(229 - intensity * 229)}, ${Math.round(245 - intensity * 64)}, ${Math.round(224 - intensity * 224)})`; // Green colorscale
  };

  const getMonthLabels = () => {
    const months: { label: string; startWeek: number; endWeek: number }[] = [];
    const startDate = new Date(Date.UTC(year, 0, 1));
    
    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(Date.UTC(year, month, 1));
      const lastDay = new Date(Date.UTC(year, month + 1, 0));
      
      const startWeek = Math.floor((firstDay.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const endWeek = Math.floor((lastDay.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      
      months.push({
        label: firstDay.toLocaleString('default', { month: 'short' }),
        startWeek,
        endWeek
      });
    }
    return months;
  };

  const timezones = [
    'US/Pacific',
    'US/Eastern',
    'UTC',
    'Europe/London',
    'Asia/Tokyo'
  ] as const;

  return (
    <Card className="w-full max-w-[1200px]">
      <CardHeader>
        <CardTitle className="text-xl">
          {year} ChatGPT Conversation Heatmap
          {stats.total > 0 && (
            <span className="block text-sm text-gray-600 mt-2">
              Total: {stats.total.toLocaleString()} conversations
              {stats.maxDate && ` • Most active day: ${stats.maxDate} with ${stats.maxCount.toLocaleString()} conversations`}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="w-48">
              <Select defaultValue={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Timezones</SelectLabel>
                    {timezones.map(tz => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-32">
              <Select defaultValue={year.toString()} onValueChange={(value) => setYear(parseInt(value, 10))}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {yearRange.map(y => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="w-48"
            >
              Upload conversations.json
            </Button>
          </div>

          {heatmapData && (
            <div className="relative">
              <div className="flex">
                <div className="w-20 pt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-end pr-4 text-sm text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative">
                  <div className="flex">
                    {heatmapData.map((week, weekIndex) => (
                      <div key={weekIndex} className="w-8">
                        {week.map((value, dayIndex) => (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className="h-8 border border-gray-100 relative group"
                            style={{ backgroundColor: getColor(value) }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-900">
                              {value > 0 && value}
                            </div>
                            <div className="hidden group-hover:block absolute z-10 bg-gray-900 text-white px-2 py-1 rounded text-xs -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                              {value} conversations
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-6 left-0 right-0">
                    <div className="flex">
                      {getMonthLabels().map((month, i) => (
                        <div
                          key={i}
                          className="absolute text-xs text-gray-600"
                          style={{
                            left: `${month.startWeek * 2}rem`,
                            width: `${(month.endWeek - month.startWeek + 1) * 2}rem`
                          }}
                        >
                          {month.label}
                        </div>
                      ))}
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