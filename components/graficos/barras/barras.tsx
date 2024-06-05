"use client";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import "./barras.scss";
import { CustomTooltip } from "@/components/auth/GraphicTooltip/GraphicTooltip";

interface BarrasProps {
  data: any[];
}

export default function Barras(props: BarrasProps) {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
        setChartHeight(chartContainerRef.current.offsetHeight);
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div ref={chartContainerRef} className="chart-container">
      <BarChart width={chartWidth} height={chartHeight} data={props.data}>
        <CartesianGrid
          horizontalCoordinatesGenerator={(props) =>
            props.height > 250 ? [12, 77, 149, 221] : [100, 200]
          }
          verticalPoints={[0]}
        />
        <XAxis
          dataKey="name"
          style={{
            font: "var(--s-typography-caption-regular)",
            color: "var(--s-color-content-default)",
            minWidth: "50px",
          }}
        />
        <YAxis
          type="number"
          name="R$"
          tickFormatter={(value) => `R$ ${value}`}
          style={{
            font: "var(--s-typography-caption-regular)",
            color: "var(--s-color-content-default)",
            minWidth: "unset",
          }}
        />
        <Tooltip content={<CustomTooltip area={false} />} />
        <Bar dataKey="Ganhos" stackId="a" fill="var(--s-color-fill-success)" />
        <Bar
          dataKey="Despesas"
          stackId="a"
          fill="var(--s-color-fill-warning)"
        />
      </BarChart>
    </div>
  );
}
