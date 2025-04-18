import  { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const DEFAULT_COLORS = ['#FF8042', '#0088FE', '#00C49F', '#008080', '#FFBB28'];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DynamicPieChart = ({ data }: {data: any}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adjust the window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define the radius dynamically based on window width
  let outerRadius;
  if (windowWidth >= 1024 && windowWidth <= 1239) {
    outerRadius = 60;  // For large screens
  } else if (windowWidth>=315 && windowWidth<=320){
    outerRadius=100;
  } 
  else {
    outerRadius = 120;  // For extra-large screens
  }

  const colors = data.length > DEFAULT_COLORS.length
    ? [...DEFAULT_COLORS, ...Array(data.length - DEFAULT_COLORS.length).fill(1).map(getRandomColor)]
    : DEFAULT_COLORS;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: windowWidth < 1024 ? 'column' : 'row' }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
          >
            {data.map((_: any, index: any) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ paddingLeft: '0px', marginTop: windowWidth < 1024 ? '20px' : '0', display: 'flex', flexDirection: 'column' }}>
        {data.map((entry:any, index: any) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <div className="flex items-center">
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: colors[index % colors.length],
                  marginRight: '20px',
                }}
              />
              <span style={{ marginRight: '10px' }}>{entry.name}</span>
            </div>
            <span style={{ color: 'green' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicPieChart;
