import  { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface LineGraphComponentProps {
  data: any[];
  dataKey: string;
}
const LineGraphComponent = ({ data, dataKey }
  :LineGraphComponentProps) => {
  const [chartHeight, setChartHeight] = useState(400);
  const [chartWidth, setChartWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(250);
        setChartWidth("100%");
      } else {
        setChartHeight(400);
        setChartWidth("100%");
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#F5F5F5] py-5 mt-5">
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis 
            label={{ 
              value: "SPerformace", 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={"SPerformance"} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraphComponent;
