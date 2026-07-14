"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  published: boolean;
  createdAt: string;
}

interface Tutor {
  id: number;
  name: string;
  specialties: string[];
  grades: string[];
}

interface Booking {
  id: number;
  parentName: string;
  grade: string;
  status: string;
  createdAt: string;
  subject?: string;
}

interface DashboardChartsProps {
  bookings: Booking[];
  tutors: Tutor[];
  blogs: BlogPost[];
}

export default function DashboardCharts({ bookings, tutors, blogs }: DashboardChartsProps) {
  const [animate, setAnimate] = useState(false);
  const [hoveredTrendIdx, setHoveredTrendIdx] = useState<number | null>(null);
  const [hoveredDonutIdx, setHoveredDonutIdx] = useState<number | null>(null);
  const [hoveredGradeIdx, setHoveredGradeIdx] = useState<number | null>(null);

  useEffect(() => {
    // Trigger entry animations
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ────────────────────────────────────────────────────────────────
  // 1. DATA PREPARATION: Booking Activity (6-Month Trend)
  // ────────────────────────────────────────────────────────────────
  const getMonthlyTrend = () => {
    const trend: { label: string; year: number; monthNum: number; count: number }[] = [];
    const now = new Date();
    // Generate past 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      trend.push({
        label: d.toLocaleDateString("en-US", { month: "short" }),
        year: d.getFullYear(),
        monthNum: d.getMonth(),
        count: 0,
      });
    }

    // Distribute bookings
    bookings.forEach((b) => {
      if (!b.createdAt) return;
      const bDate = new Date(b.createdAt);
      const bYear = bDate.getFullYear();
      const bMonth = bDate.getMonth();
      const match = trend.find((m) => m.year === bYear && m.monthNum === bMonth);
      if (match) {
        match.count++;
      }
    });

    return trend;
  };

  const trendData = getMonthlyTrend();
  const maxTrendVal = Math.max(...trendData.map((t) => t.count), 5);

  // Line chart coordinates helper
  const lineChartWidth = 500;
  const lineChartHeight = 220;
  const trendPadding = { left: 40, right: 20, top: 25, bottom: 40 };
  const trendGraphWidth = lineChartWidth - trendPadding.left - trendPadding.right;
  const trendGraphHeight = lineChartHeight - trendPadding.top - trendPadding.bottom;

  const getTrendCoords = () => {
    const N = trendData.length;
    return trendData.map((d, i) => {
      const x = trendPadding.left + (i / (N - 1)) * trendGraphWidth;
      const y = trendPadding.top + trendGraphHeight - (d.count / maxTrendVal) * trendGraphHeight;
      return { x, y };
    });
  };

  const trendCoords = getTrendCoords();
  
  // Construct line path & area path
  let linePathD = "";
  let areaPathD = "";
  if (trendCoords.length > 0) {
    linePathD = `M ${trendCoords[0].x} ${trendCoords[0].y} ` + 
      trendCoords.slice(1).map((pt) => `L ${pt.x} ${pt.y}`).join(" ");
    areaPathD = `${linePathD} L ${trendCoords[trendCoords.length - 1].x} ${trendPadding.top + trendGraphHeight} L ${trendCoords[0].x} ${trendPadding.top + trendGraphHeight} Z`;
  }

  // ────────────────────────────────────────────────────────────────
  // 2. DATA PREPARATION: Booking Status (Donut Chart)
  // ────────────────────────────────────────────────────────────────
  const getStatusData = () => {
    const counts = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    bookings.forEach((b) => {
      const s = (b.status || "pending").toLowerCase();
      if (s in counts) {
        counts[s as keyof typeof counts]++;
      } else {
        counts.pending++;
      }
    });

    return [
      { label: "Pending", count: counts.pending, color: "#ccb892", hoverColor: "#b29e79" },
      { label: "Confirmed", count: counts.confirmed, color: "#5d0260", hoverColor: "#49014b" },
      { label: "Completed", count: counts.completed, color: "#10B981", hoverColor: "#059669" },
      { label: "Cancelled", count: counts.cancelled, color: "#B4533C", hoverColor: "#993f2c" },
    ].filter((s) => bookings.length === 0 || s.count > 0);
  };

  const statusData = getStatusData();
  const totalBookings = bookings.length;

  // Donut values helper
  const donutRadius = 60;
  const donutCircumference = 2 * Math.PI * donutRadius; // ~376.99
  let accumulatedAngle = 0;

  // ────────────────────────────────────────────────────────────────
  // 3. DATA PREPARATION: Tutor Specialties (Progress Bars)
  // ────────────────────────────────────────────────────────────────
  const getSpecialtyData = () => {
    const counts: Record<string, number> = {};
    tutors.forEach((t) => {
      if (Array.isArray(t.specialties)) {
        t.specialties.forEach((spec) => {
          counts[spec] = (counts[spec] || 0) + 1;
        });
      }
    });

    const list = Object.entries(counts).map(([name, count]) => ({ name, count }));
    if (list.length === 0) {
      return [
        { name: "Mathematics", count: 0 },
        { name: "Sciences", count: 0 },
        { name: "English", count: 0 },
        { name: "Coding", count: 0 },
      ];
    }
    return list.sort((a, b) => b.count - a.count).slice(0, 5);
  };

  const specialtyData = getSpecialtyData();
  const maxSpecialtyCount = Math.max(...specialtyData.map((s) => s.count), 1);

  // ────────────────────────────────────────────────────────────────
  // 4. DATA PREPARATION: Bookings by Grade Level (Vertical Bar Chart)
  // ────────────────────────────────────────────────────────────────
  const getGradeData = () => {
    const counts: Record<string, number> = {};
    bookings.forEach((b) => {
      if (b.grade) {
        counts[b.grade] = (counts[b.grade] || 0) + 1;
      }
    });

    const list = Object.entries(counts).map(([label, count]) => ({ label, count }));
    if (list.length === 0) {
      return [
        { label: "Grade 5–8", count: 0 },
        { label: "Grade 9 & 10", count: 0 },
        { label: "Grade 11 & 12", count: 0 },
        { label: "SAT/TOEFL", count: 0 },
      ];
    }
    return list.sort((a, b) => b.label.localeCompare(a.label)).slice(0, 5);
  };

  const gradeData = getGradeData();
  const maxGradeVal = Math.max(...gradeData.map((g) => g.count), 5);

  const gradeChartWidth = 400;
  const gradeChartHeight = 220;
  const gradePadding = { left: 30, right: 15, top: 25, bottom: 40 };
  const gradeGraphWidth = gradeChartWidth - gradePadding.left - gradePadding.right;
  const gradeGraphHeight = gradeChartHeight - gradePadding.top - gradePadding.bottom;
  const gradeBarSpacing = 0.4; // 40% spacing between bars

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* ─── Chart 1: Booking Trends over Time (Full or 2/2 width on MD) ─── */}
      <div className="md:col-span-2 bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col p-5 relative group/card hover:border-brand-primary/20 transition-all duration-300">
        <div className="mb-4">
          <h3 className="font-serif text-base font-bold text-brand-ink">Booking Activity Trends</h3>
          <p className="text-[11px] text-brand-muted">Number of student trial bookings requested over the last 6 months.</p>
        </div>

        <div className="relative flex-1 min-h-[220px]">
          {/* Tooltip Overlay */}
          {hoveredTrendIdx !== null && (
            <div
              className="absolute z-10 bg-brand-ink/95 text-brand-paper p-2.5 rounded-xl shadow-xl text-xs pointer-events-none transition-all duration-150 border border-brand-rule/20"
              style={{
                left: `${(trendCoords[hoveredTrendIdx].x / lineChartWidth) * 100}%`,
                top: `${(trendCoords[hoveredTrendIdx].y / lineChartHeight) * 100 - 30}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="font-semibold text-brand-secondary/90 text-[10px] uppercase tracking-wider">
                {trendData[hoveredTrendIdx].label} {trendData[hoveredTrendIdx].year}
              </div>
              <div className="text-sm font-bold mt-0.5">
                {trendData[hoveredTrendIdx].count} Booking{trendData[hoveredTrendIdx].count !== 1 ? "s" : ""}
              </div>
            </div>
          )}

          {/* SVG Area/Line Chart */}
          <svg
            viewBox={`0 0 ${lineChartWidth} ${lineChartHeight}`}
            width="100%"
            height="100%"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5d0260" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5d0260" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
              const yVal = trendPadding.top + trendGraphHeight * r;
              const gridLabel = Math.round(maxTrendVal * (1 - r));
              return (
                <g key={idx} className="opacity-40">
                  <line
                    x1={trendPadding.left}
                    y1={yVal}
                    x2={lineChartWidth - trendPadding.right}
                    y2={yVal}
                    stroke="#DDD1B8"
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={trendPadding.left - 10}
                    y={yVal + 3}
                    textAnchor="end"
                    className="fill-brand-muted font-sans text-[10px] font-semibold"
                  >
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Area Path with transition */}
            {bookings.length > 0 && areaPathD && (
              <path
                d={areaPathD}
                fill="url(#trendAreaGradient)"
                className="transition-all duration-700 ease-out"
                style={{
                  transform: animate ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: `0px ${trendPadding.top + trendGraphHeight}px`,
                }}
              />
            )}

            {/* Line Path */}
            {bookings.length > 0 && linePathD && (
              <path
                d={linePathD}
                fill="none"
                stroke="#5d0260"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-700 ease-out"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: animate ? 0 : 1000,
                }}
              />
            )}

            {/* Hover Guides */}
            {hoveredTrendIdx !== null && (
              <line
                x1={trendCoords[hoveredTrendIdx].x}
                y1={trendPadding.top}
                x2={trendCoords[hoveredTrendIdx].x}
                y2={trendPadding.top + trendGraphHeight}
                stroke="#5d0260"
                strokeWidth="1"
                className="opacity-40"
              />
            )}

            {/* X-Axis labels */}
            {trendData.map((d, i) => {
              const pt = trendCoords[i];
              return (
                <text
                  key={i}
                  x={pt.x}
                  y={lineChartHeight - 15}
                  textAnchor="middle"
                  className="fill-brand-muted font-sans text-[10px] font-bold"
                >
                  {d.label}
                </text>
              );
            })}

            {/* Circles and interactive vertical hit zones */}
            {bookings.length > 0 && trendCoords.map((pt, i) => (
              <g key={i}>
                {/* Visual marker */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredTrendIdx === i ? 6 : 4}
                  fill={hoveredTrendIdx === i ? "#ccb892" : "#5d0260"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-150 cursor-pointer shadow-sm"
                />
                {/* Wider hit zone for hover convenience */}
                <rect
                  x={pt.x - trendGraphWidth / (trendData.length - 1) / 2}
                  y={trendPadding.top}
                  width={trendGraphWidth / (trendData.length - 1)}
                  height={trendGraphHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredTrendIdx(i)}
                  onMouseLeave={() => setHoveredTrendIdx(null)}
                />
              </g>
            ))}
          </svg>

          {bookings.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <span className="text-xs text-brand-muted italic font-medium">No bookings data to visualize trend.</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Chart 2: Booking Status (Donut Chart) ─── */}
      <div className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col p-5 hover:border-brand-primary/20 transition-all duration-300">
        <div className="mb-4">
          <h3 className="font-serif text-base font-bold text-brand-ink">Bookings by Status</h3>
          <p className="text-[11px] text-brand-muted">Operational distribution of trial booking status.</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {bookings.length === 0 ? (
                <circle
                  cx="100"
                  cy="100"
                  r={donutRadius}
                  fill="none"
                  stroke="#F5ECDA"
                  strokeWidth="16"
                />
              ) : (
                statusData.map((item, idx) => {
                  const percent = item.count / totalBookings;
                  const strokeLength = percent * donutCircumference;
                  const strokeOffset = donutCircumference - strokeLength;
                  const currentAngle = accumulatedAngle;
                  accumulatedAngle += percent * 360;

                  return (
                    <circle
                      key={idx}
                      cx="100"
                      cy="100"
                      r={donutRadius}
                      fill="none"
                      stroke={item.color}
                      strokeWidth={hoveredDonutIdx === idx ? 20 : 16}
                      strokeDasharray={donutCircumference}
                      strokeDashoffset={strokeOffset}
                      transform={`rotate(${currentAngle} 100 100)`}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        strokeDashoffset: animate ? strokeOffset : donutCircumference,
                      }}
                      onMouseEnter={() => setHoveredDonutIdx(idx)}
                      onMouseLeave={() => setHoveredDonutIdx(null)}
                    />
                  );
                })
              )}
            </svg>

            {/* Central Total Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-brand-primary leading-none">
                {totalBookings}
              </span>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mt-1">
                Bookings
              </span>
            </div>
          </div>

          {/* Custom Info Display/Legend */}
          <div className="w-full mt-4 space-y-2">
            {statusData.map((item, idx) => {
              const percent = totalBookings > 0 ? Math.round((item.count / totalBookings) * 100) : 0;
              const isHovered = hoveredDonutIdx === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-1.5 rounded-xl transition-colors ${
                    isHovered ? "bg-brand-cream-warm/30 font-semibold" : ""
                  }`}
                  onMouseEnter={() => setHoveredDonutIdx(idx)}
                  onMouseLeave={() => setHoveredDonutIdx(null)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform"
                      style={{
                        backgroundColor: item.color,
                        transform: isHovered ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                    <span className="text-xs text-brand-ink font-medium">{item.label}</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-brand-ink font-bold">{item.count}</span>
                    <span className="text-brand-muted text-[10px] ml-1">({percent}%)</span>
                  </div>
                </div>
              );
            })}
            {bookings.length === 0 && (
              <p className="text-xs text-brand-muted italic text-center py-2">No bookings recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── Chart 3: Tutors by Specialty (Horizontal Bar Chart) ─── */}
      <div className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col p-5 hover:border-brand-primary/20 transition-all duration-300">
        <div className="mb-4">
          <h3 className="font-serif text-base font-bold text-brand-ink">Tutors by Specialty</h3>
          <p className="text-[11px] text-brand-muted">Number of specialized tutors available in each subject area.</p>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          {specialtyData.map((item, idx) => {
            const percent = maxSpecialtyCount > 0 ? (item.count / maxSpecialtyCount) * 100 : 0;
            return (
              <div key={idx} className="group/bar">
                <div className="flex justify-between items-center text-xs font-semibold text-brand-ink mb-1">
                  <span>{item.name}</span>
                  <span className="text-brand-primary">{item.count} Tutor{item.count !== 1 ? "s" : ""}</span>
                </div>
                <div className="w-full h-3 bg-brand-cream-warm/40 rounded-full overflow-hidden border border-brand-rule/30">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: animate ? `${percent}%` : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
          {tutors.length === 0 && (
            <p className="text-xs text-brand-muted italic text-center py-4">No tutors registered yet.</p>
          )}
        </div>
      </div>

      {/* ─── Chart 4: Bookings by Grade Level (Vertical Bar Chart) ─── */}
      <div className="md:col-span-2 bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden flex flex-col p-5 relative hover:border-brand-primary/20 transition-all duration-300">
        <div className="mb-4">
          <h3 className="font-serif text-base font-bold text-brand-ink">Bookings by Grade Level</h3>
          <p className="text-[11px] text-brand-muted">Distribution of student academic grades in current trial requests.</p>
        </div>

        <div className="relative flex-1 min-h-[220px]">
          {/* Tooltip Overlay */}
          {hoveredGradeIdx !== null && (
            <div
              className="absolute z-10 bg-brand-ink/95 text-brand-paper p-2.5 rounded-xl shadow-xl text-xs pointer-events-none transition-all duration-150 border border-brand-rule/20"
              style={{
                left: `${
                  ((gradePadding.left +
                    hoveredGradeIdx * (gradeGraphWidth / gradeData.length) +
                    (gradeGraphWidth / gradeData.length) / 2) /
                    gradeChartWidth) *
                  100
                }%`,
                top: `${
                  ((gradePadding.top +
                    gradeGraphHeight -
                    (gradeData[hoveredGradeIdx].count / maxGradeVal) * gradeGraphHeight -
                    15) /
                    gradeChartHeight) *
                  100
                }%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="font-bold">{gradeData[hoveredGradeIdx].label}</div>
              <div className="text-brand-secondary font-bold mt-0.5">
                {gradeData[hoveredGradeIdx].count} Booking{gradeData[hoveredGradeIdx].count !== 1 ? "s" : ""}
              </div>
            </div>
          )}

          {/* SVG Vertical Bar Chart */}
          <svg
            viewBox={`0 0 ${gradeChartWidth} ${gradeChartHeight}`}
            width="100%"
            height="100%"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ccb892" />
                <stop offset="100%" stopColor="#5d0260" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
              const yVal = gradePadding.top + gradeGraphHeight * r;
              const gridLabel = Math.round(maxGradeVal * (1 - r));
              return (
                <g key={idx} className="opacity-40">
                  <line
                    x1={gradePadding.left}
                    y1={yVal}
                    x2={gradeChartWidth - gradePadding.right}
                    y2={yVal}
                    stroke="#DDD1B8"
                    strokeWidth="0.8"
                  />
                  <text
                    x={gradePadding.left - 8}
                    y={yVal + 3}
                    textAnchor="end"
                    className="fill-brand-muted font-sans text-[10px] font-semibold"
                  >
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Vertical Bars */}
            {gradeData.map((d, i) => {
              const barCellWidth = gradeGraphWidth / gradeData.length;
              const barWidth = barCellWidth * (1 - gradeBarSpacing);
              const x = gradePadding.left + i * barCellWidth + (barCellWidth * gradeBarSpacing) / 2;
              const barHeight = (d.count / maxGradeVal) * gradeGraphHeight;
              const y = gradePadding.top + gradeGraphHeight - barHeight;

              const isHovered = hoveredGradeIdx === i;

              return (
                <g key={i}>
                  {bookings.length > 0 && (
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      ry="4"
                      fill="url(#barGradient)"
                      className="transition-all duration-500 ease-out cursor-pointer hover:opacity-90"
                      style={{
                        transform: animate ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: `0px ${gradePadding.top + gradeGraphHeight}px`,
                        filter: isHovered ? "brightness(1.15)" : "none",
                      }}
                      onMouseEnter={() => setHoveredGradeIdx(i)}
                      onMouseLeave={() => setHoveredGradeIdx(null)}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={x + barWidth / 2}
                    y={gradeChartHeight - 15}
                    textAnchor="middle"
                    className="fill-brand-muted font-sans text-[9px] font-bold"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {bookings.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <span className="text-xs text-brand-muted italic font-medium">No bookings data to visualize grade levels.</span>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
