import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";

interface ChartProps {
  data: { name: string,  quizzes:number }[];
  colors: string[];
  yrange: number[];
}

const BarChartComponent: React.FC<ChartProps> = ({ data, colors, yrange }) => {
  const [chartHeight, setChartHeight] = useState(400);
  const [chartWidth, setChartWidth] = useState("95%");
  const [margin, setMargin] = useState({ top: 30, right: 20, left: 10, bottom: 20 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(300);
        setChartWidth("100%");
        setMargin({ top: 10, right: 10, left: 5, bottom: 10 });
      } else {
        setChartHeight(400);
        setChartWidth("95%");
        setMargin({ top: 30, right: 20, left: 10, bottom: 20 });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width={chartWidth} height={chartHeight}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" >
          <Label value="Days" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis domain={yrange}>
          <Label
            value={"Quizzes"}
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Bar dataKey="quizzes">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;