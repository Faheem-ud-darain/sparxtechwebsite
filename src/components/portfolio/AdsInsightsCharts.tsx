import { useState } from 'react';
import { motion } from 'framer-motion';

interface FunnelStage {
  label: string;
  value: number;
  sublabel: string;
  percent: number;
  color: string;
}

interface CPLData {
  campaign: string;
  cpl: number;
  cvr: number;
  highlight: string;
  color: string;
}

interface ScaleData {
  campaign: string;
  date: string;
  budget: number;
  leads: number;
}

export default function AdsInsightsCharts() {
  const [activeTooltip, setActiveTooltip] = useState<{ chart: string; index: number; x: number; y: number; content: any } | null>(null);

  // 1. Funnel Dataset
  const funnelStages: FunnelStage[] = [
    { label: 'Impressions & Views', value: 24639, sublabel: 'Total reach generated', percent: 100, color: 'from-green-500 to-emerald-400' },
    { label: 'Unique Viewers', value: 10088, sublabel: 'Interested prospects engaged', percent: 41, color: 'from-cyan-500 to-blue-400' },
    { label: 'Messaging Conversions', value: 248, sublabel: 'Direct WhatsApp leads generated', percent: 2.46, color: 'from-blue-600 to-indigo-500' }
  ];

  // 2. CPL Dataset
  const cplDataset: CPLData[] = [
    { campaign: 'KR Study in SK (Ad)', cpl: 25.28, cvr: 1.90, highlight: 'Most Cost-Efficient Lead Acquisition', color: 'from-emerald-500 to-green-400' },
    { campaign: 'LAST CALL (Ad)', cpl: 35.26, cvr: 2.46, highlight: 'Best Volume & CVR % ROI Combo', color: 'from-cyan-500 to-emerald-400' },
    { campaign: 'Dreaming Var 1 (Ad)', cpl: 35.71, cvr: 1.10, highlight: 'High CTR Ad Creative Set', color: 'from-blue-500 to-cyan-400' },
    { campaign: 'Dreaming Var 2 (Ad)', cpl: 58.25, cvr: 0.92, highlight: 'Moderate Audience Frequency Ad', color: 'from-indigo-500 to-blue-400' },
    { campaign: 'KR Your Master (Ad)', cpl: 61.48, cvr: 0.93, highlight: 'Niche Postgraduate Campaign Group', color: 'from-purple-500 to-indigo-400' },
    { campaign: 'BREAKING (Boosted)', cpl: 69.62, cvr: 0.38, highlight: 'Low Budget / Organic Boost Test', color: 'from-amber-500 to-orange-400' },
    { campaign: 'Worried (Boosted Reel)', cpl: 176.64, cvr: 0.27, highlight: 'Inefficient Direct Video Boost', color: 'from-red-500 to-rose-400' }
  ];

  // 3. Scale Dataset
  const scaleDataset: ScaleData[] = [
    { campaign: 'LAST CALL', date: 'Mar 14', budget: 800, leads: 248 },
    { campaign: 'Study in SK', date: 'Apr 05', budget: 800, leads: 175 },
    { campaign: 'BREAKING', date: 'Apr 05', budget: 280, leads: 4 },
    { campaign: 'Worried', date: 'Apr 07', budget: 300, leads: 2 },
    { campaign: 'Dreaming v1', date: 'Apr 09', budget: 1000, leads: 28 },
    { campaign: 'Your Master', date: 'Apr 09', budget: 1000, leads: 27 },
    { campaign: 'Dreaming v2', date: 'Apr 09', budget: 1000, leads: 27 }
  ];

  // Calculations for Scale Chart bounds
  const maxBudget = 1000;
  const maxLeads = 250;
  const chartHeight = 200;
  const chartWidth = 500;

  return (
    <section className="mt-24 sm:mt-32 relative z-20">
      <div className="flex flex-col mb-12">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase self-start mb-4">
          Campaign Analytics
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Meta Ads Performance Insights
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
          Interactive metrics and CPL efficiency reports for the Daehan Links growth strategy, displaying a 7x cost-efficiency gain on optimized ad sets over standard boosted posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* Chart 1: Conversion Funnel */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Interactive Conversion Funnel</h3>
            <p className="text-xs text-gray-400 mb-6">Views and Audience Reach filtered down to active Messaging Leads.</p>
          </div>

          <div className="space-y-6 py-4">
            {funnelStages.map((stage, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-end mb-2 text-xs font-mono">
                  <span className="text-gray-300 font-bold">{stage.label}</span>
                  <span className="text-white font-extrabold">
                    {stage.value.toLocaleString()} <span className="text-gray-500">({stage.percent}%)</span>
                  </span>
                </div>
                <div className="h-6 rounded-full bg-white/[0.03] border border-white/[0.05] overflow-hidden p-0.5 relative group cursor-help">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${stage.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stage.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.2 }}
                  />
                  <div className="absolute inset-0 flex items-center pl-3">
                    <span className="text-[10px] font-medium text-white/50 group-hover:text-white transition-colors">
                      {stage.sublabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
            <span>Overall Conversion Rate (CVR):</span>
            <span className="text-green-400 font-bold font-mono">2.46% of engaged viewers became active leads</span>
          </div>
        </div>

        {/* Chart 2: CPL Efficiency */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between relative">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Cost-Per-Lead (CPL) Efficiency</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">Lower is better. Highlighting cost acquisition efficiencies across creatives.</p>
          </div>

          {/* Graphical columns */}
          <div className="h-56 flex items-end justify-between gap-2 px-2 relative pt-8">
            {cplDataset.map((item, idx) => {
              // Inverse height representation since lower CPL is better
              const maxCpl = 180;
              const colHeightPercent = Math.max(10, ((item.cpl) / maxCpl) * 100);
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setActiveTooltip({
                      chart: 'cpl',
                      index: idx,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                      content: (
                        <div className="text-left font-mono">
                          <p className="text-xs font-bold text-white mb-1">{item.campaign}</p>
                          <p className="text-[10px] text-green-400 font-extrabold">CPL: {item.cpl.toFixed(2)} PKR</p>
                          <p className="text-[10px] text-gray-400">CVR Rate: {item.cvr.toFixed(2)}%</p>
                          <p className="text-[9px] text-gray-500 mt-1 italic leading-tight">{item.highlight}</p>
                        </div>
                      )
                    });
                  }}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {/* CPL Badge overlay for high volume hooks */}
                  <span className="text-[9px] font-mono text-gray-400 mb-1 group-hover:text-white transition-colors">
                    {Math.round(item.cpl)}
                  </span>
                  <div className="w-full bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-40 flex items-end overflow-hidden relative">
                    <motion.div
                      className={`w-full bg-gradient-to-t ${item.color} rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity`}
                      style={{ height: `${colHeightPercent}%` }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                      style={{ originY: 1 }}
                    />
                  </div>
                  <span className="text-[8px] font-medium text-gray-500 rotate-45 origin-top-left mt-2 block whitespace-nowrap group-hover:text-gray-300 font-mono">
                    {item.campaign.substring(0, 10)}...
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
            <span>acquisition index:</span>
            <span className="text-emerald-400 font-bold font-mono">Apr 05 Campaign lead (25.28 PKR) is 7x cheaper than boosted post</span>
          </div>
        </div>

        {/* Chart 3: Scaling Impact (Budget vs conversions) */}
        <div className="lg:col-span-12 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between relative mt-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Scaling Impact (Budget vs. Conversions)</h3>
            <p className="text-xs text-gray-400 mb-6">Comparison of Daily Budget (columns, left axis) against Conversions (line, right axis).</p>
          </div>

          <div className="relative w-full overflow-x-auto flex justify-center py-6">
            <div style={{ width: chartWidth, height: chartHeight }} className="relative font-mono">
              {/* Axes lines */}
              <svg width={chartWidth} height={chartHeight} className="overflow-visible select-none">
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = chartHeight * (1 - ratio);
                  return (
                    <g key={i}>
                      <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                      {/* Left axis values (Budget in PKR) */}
                      <text x={-10} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="end">
                        {Math.round(maxBudget * ratio)} PKR
                      </text>
                      {/* Right axis values (Leads count) */}
                      <text x={chartWidth + 10} y={y + 4} fill="rgba(74, 222, 128, 0.4)" fontSize="8" textAnchor="start">
                        {Math.round(maxLeads * ratio)}
                      </text>
                    </g>
                  );
                })}

                {/* Draw Columns for Budgets */}
                {scaleDataset.map((item, idx) => {
                  const colWidth = 24;
                  const xGap = chartWidth / (scaleDataset.length + 1);
                  const x = xGap * (idx + 1) - colWidth / 2;
                  const colHeight = (item.budget / maxBudget) * chartHeight;
                  const y = chartHeight - colHeight;

                  return (
                    <g key={idx} className="cursor-pointer group"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setActiveTooltip({
                          chart: 'scale',
                          index: idx,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                          content: (
                            <div className="text-left font-mono">
                              <p className="text-xs font-bold text-white mb-1">{item.campaign} ({item.date})</p>
                              <p className="text-[10px] text-blue-400">Daily Budget: {item.budget} PKR</p>
                              <p className="text-[10px] text-green-400">Leads Generated: {item.leads}</p>
                            </div>
                          )
                        });
                      }}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <motion.rect
                        x={x}
                        y={y}
                        width={colWidth}
                        height={colHeight}
                        fill="rgba(59, 130, 246, 0.15)"
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="1.5"
                        rx="4"
                        className="group-hover:fill-blue-500/25 group-hover:stroke-blue-500/50 transition-colors"
                        initial={{ height: 0, y: chartHeight }}
                        whileInView={{ height: colHeight, y: y }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                      />
                    </g>
                  );
                })}

                {/* Draw Line for Messaging Conversions */}
                {(() => {
                  const xGap = chartWidth / (scaleDataset.length + 1);
                  const points = scaleDataset.map((item, idx) => {
                    const x = xGap * (idx + 1);
                    const y = chartHeight - (item.leads / maxLeads) * chartHeight;
                    return { x, y };
                  });

                  // Build SVG path
                  const d = points.reduce((acc, p, idx) => {
                    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                  }, '');

                  return (
                    <>
                      {/* Path background shadow */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(74, 222, 128, 0.15)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                      {/* Foreground path */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                      {/* Dots on line intersections */}
                      {points.map((p, idx) => (
                        <g key={idx}>
                          <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r="4.5"
                            fill="#030303"
                            stroke="#4ade80"
                            strokeWidth="2.5"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + idx * 0.05, type: 'spring', stiffness: 200 }}
                            className="cursor-pointer"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const item = scaleDataset[idx];
                              setActiveTooltip({
                                chart: 'scale-dot',
                                index: idx,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
                                content: (
                                  <div className="text-left font-mono">
                                    <p className="text-xs font-bold text-white mb-1">{item.campaign} ({item.date})</p>
                                    <p className="text-[10px] text-green-400">Leads: {item.leads}</p>
                                    <p className="text-[10px] text-gray-500">CPL acquisition status: High Efficiency</p>
                                  </div>
                                )
                              });
                            }}
                            onMouseLeave={() => setActiveTooltip(null)}
                          />
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="8"
                            fill="rgba(74,222,128,0.15)"
                            className="animate-ping pointer-events-none"
                            style={{ animationDuration: '3s' }}
                          />
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* X Axis Labels */}
              <div className="absolute left-0 right-0 bottom-[-24px] flex justify-between px-2 text-[8px] text-gray-500">
                {scaleDataset.map((item, idx) => {
                  const xGap = chartWidth / (scaleDataset.length + 1);
                  const x = xGap * (idx + 1);
                  return (
                    <div
                      key={idx}
                      className="absolute transform -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${(x / chartWidth) * 100}%` }}
                    >
                      <span className="text-gray-300 font-bold">{item.campaign}</span>
                      <span className="text-gray-600 text-[7px] uppercase mt-0.5">{item.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
            <span>scaling analysis:</span>
            <span className="text-blue-400 font-bold font-mono">Raising budgets from 300 to 800 PKR yielded exponential Lead gains</span>
          </div>
        </div>
      </div>

      {/* Global Tooltip Element */}
      {activeTooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl bg-[#09090c]/95 border border-white/[0.08] p-3 shadow-2xl backdrop-blur-md text-white -translate-x-1/2 -translate-y-full mb-2 transition-all duration-150"
          style={{ left: activeTooltip.x, top: activeTooltip.y }}
        >
          {activeTooltip.content}
        </div>
      )}
    </section>
  );
}
