import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

/*eslint-disable */
function LineGraph({ casesType }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=150")
                .then((response) => response.json())
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    const maxY = data.reduce((max, point) => (point.y > max ? point.y : max), 0);
    const yMargin = 5000;

    return (
        <div>
            {data?.length > 0 && (
                <ResponsiveContainer width="90%" height={270}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <XAxis dataKey="x" />
                        <YAxis domain={[0, maxY + yMargin]} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="y"
                            stroke="#c31212"
                            fill="rgba(222, 11, 11, 0.3)"
                            dot={{ stroke: "#1294c3", fill: "#fff", strokeWidth: 0, r: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default LineGraph;
