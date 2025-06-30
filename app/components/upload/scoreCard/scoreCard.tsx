"use client";

import styles from "./ScoreCard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScoreCardProps {
  loading: boolean;
  scores: Array<Record<string, number>> | null;
}

export default function ScoreCard({ loading, scores }: ScoreCardProps) {
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.message}>Analyzing…</div>
      ) : !scores || scores.length === 0 ? (
        <div className={styles.message}>No results to display.</div>
      ) : (
        scores.map((scoreObj, idx) => {
          const data = Object.entries(scoreObj).map(([part, val]) => ({
            subject: part,
            value: Math.round(val * 100),
          }));
          return (
            <div key={idx} className={styles.chartWrapper}>
              <h4 className={styles.header}>Pair {idx + 1}</h4>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00EAB8" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#00EAB8" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#555" strokeDasharray="3 3" />
                  <XAxis dataKey="subject" stroke="#ddd" />
                  <YAxis stroke="#ddd" />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.2)' }}
                    wrapperStyle={{ backgroundColor: '#1d1d1d', border: 'none' }}
                    contentStyle={{ color: '#fff' }}
                    formatter={(value: number) => `${value}%`}
                    labelFormatter={(label: string) => label}
                  />
                  <Bar
                    dataKey="value"
                    fill="url(#barGrad)"
                    radius={[8, 8, 0, 0]}
                    barSize={60}
                    background={{ fill: 'rgba(255,255,255,0.1)' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })
      )}
    </div>
  );
}
