import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Component to animate numeric counters
function Counter({ value, duration = 1.5, isCurrency = false, currencyCode = '' }: { value: number; duration?: number; isCurrency?: boolean; currencyCode?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const steps = totalMiliseconds / incrementTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  if (isCurrency) {
    return (
      <span>
        {currencyCode ? `${currencyCode} ` : ''}
        {count.toFixed(2)}
      </span>
    );
  }
  return <span>{Math.floor(count).toLocaleString()}</span>;
}

interface AdsInsightsChartsProps {
  slug: string;
}

interface PlacementData {
  placement: string;
  volume: number;
  share: number;
  color: string;
  glowColor: string;
}

export default function AdsInsightsCharts({ slug }: AdsInsightsChartsProps) {
  const [activeTooltip, setActiveTooltip] = useState<{ x: number; y: number; content: any } | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // --- DATASET 1: DAEHAN LINKS ---
  const funnelStages = [
    { label: 'Impressions & Views', value: 24639, sublabel: 'Total reach generated', percent: 100, color: 'from-green-500 to-emerald-400' },
    { label: 'Unique Viewers', value: 10088, sublabel: 'Interested prospects engaged', percent: 41, color: 'from-cyan-500 to-blue-400' },
    { label: 'Messaging Conversions', value: 248, sublabel: 'Direct WhatsApp leads generated', percent: 2.46, color: 'from-blue-600 to-indigo-500' }
  ];

  const cplDataset = [
    { campaign: 'KR Study in SK (Ad)', cpl: 25.28, cvr: 1.90, highlight: 'Most Cost-Efficient Lead Acquisition', color: 'from-emerald-500 to-green-400' },
    { campaign: 'LAST CALL (Ad)', cpl: 35.26, cvr: 2.46, highlight: 'Best Volume & CVR % ROI Combo', color: 'from-cyan-500 to-emerald-400' },
    { campaign: 'Dreaming Var 1 (Ad)', cpl: 35.71, cvr: 1.10, highlight: 'High CTR Ad Creative Set', color: 'from-blue-500 to-cyan-400' },
    { campaign: 'Dreaming Var 2 (Ad)', cpl: 58.25, cvr: 0.92, highlight: 'Moderate Audience Frequency Ad', color: 'from-indigo-500 to-blue-400' },
    { campaign: 'KR Your Master (Ad)', cpl: 61.48, cvr: 0.93, highlight: 'Niche Postgraduate Campaign Group', color: 'from-purple-500 to-indigo-400' },
    { campaign: 'BREAKING (Boosted)', cpl: 69.62, cvr: 0.38, highlight: 'Low Budget / Organic Boost Test', color: 'from-amber-500 to-orange-400' }
  ];

  const scaleDataset = [
    { campaign: 'LAST CALL', date: 'Mar 14', budget: 800, leads: 248 },
    { campaign: 'Study in SK', date: 'Apr 05', budget: 800, leads: 175 },
    { campaign: 'BREAKING', date: 'Apr 05', budget: 280, leads: 4 },
    { campaign: 'Worried', date: 'Apr 07', budget: 300, leads: 2 },
    { campaign: 'Dreaming v1', date: 'Apr 09', budget: 1000, leads: 28 },
    { campaign: 'Your Master', date: 'Apr 09', budget: 1000, leads: 27 },
    { campaign: 'Dreaming v2', date: 'Apr 09', budget: 1000, leads: 27 }
  ];

  // --- DATASET 2: GOLD OF HIMALAYA ---
  const placements: PlacementData[] = [
    { placement: 'Facebook Mobile Feed', volume: 2020, share: 64.17, color: '#3b82f6', glowColor: 'rgba(59,130,246,0.3)' },
    { placement: 'Facebook Reels', volume: 910, share: 28.91, color: '#14b8a6', glowColor: 'rgba(20,184,166,0.3)' },
    { placement: 'Instagram Reels', volume: 138, share: 4.38, color: '#ec4899', glowColor: 'rgba(236,72,153,0.3)' },
    { placement: 'Instagram Feed', volume: 60, share: 1.91, color: '#f97316', glowColor: 'rgba(249,115,22,0.3)' },
    { placement: 'Facebook Stories', volume: 24, share: 0.76, color: '#6366f1', glowColor: 'rgba(99,102,241,0.3)' },
    { placement: 'Instagram Stories', volume: 16, share: 0.51, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.3)' }
  ];

  // Render Daehan Links Charts
  if (slug === 'daehan-links-social-media-ads-management') {
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
            Interactive metrics and CPL efficiency reports for the Daehan Links growth strategy, displaying a significant cost-efficiency gain on optimized ad sets over standard boosted posts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Funnel */}
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

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Overall Conversion Rate (CVR):</span>
              <span className="text-green-400 font-bold font-mono">2.46% of engaged viewers became active leads</span>
            </div>
          </div>

          {/* Chart 2: CPL Efficiency */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cost-Per-Lead (CPL) Efficiency</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Lower is better. Highlighting cost acquisition efficiencies across creatives.</p>
            </div>

            {/* Mobile View: Horizontal Progress Bars */}
            <div className="space-y-4 md:hidden py-4 font-mono">
              {cplDataset.map((item, idx) => {
                const maxCpl = 80;
                const barWidthPercent = Math.min(100, (item.cpl / maxCpl) * 100);
                
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-300 font-medium truncate max-w-[180px]">{item.campaign}</span>
                      <span className="text-white font-bold">{item.cpl.toFixed(2)} PKR</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/[0.03] border border-white/[0.05] overflow-hidden p-0.5 relative">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${barWidthPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Vertical Columns */}
            <div className="hidden md:flex h-64 items-end justify-between gap-2 px-2 relative pt-8 pb-12">
              {cplDataset.map((item, idx) => {
                const maxCpl = 80;
                const colHeightPercent = Math.max(10, (item.cpl / maxCpl) * 100);
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setActiveTooltip({
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
                    <span className="text-[9px] font-mono text-gray-400 mb-1 group-hover:text-white transition-colors">
                      {Math.round(item.cpl)}
                    </span>
                    <div className="w-full bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-40 flex items-end overflow-hidden">
                      <motion.div
                        className={`w-full bg-gradient-to-t ${item.color} rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity`}
                        style={{ height: `${colHeightPercent}%`, originY: 1 }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                      />
                    </div>
                    <span className="text-[8px] font-medium text-gray-500 rotate-45 origin-top-left mt-2 block whitespace-nowrap group-hover:text-gray-300 font-mono">
                      {item.campaign.substring(0, 10)}...
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">acquisition index:</span>
              <span className="text-emerald-400 font-bold font-mono">Apr 05 Campaign lead (25.28 PKR) is 2.7x cheaper than boosted post (69.62 PKR)</span>
            </div>
          </div>

          {/* Chart 3: Scaling Impact */}
          <div className="lg:col-span-12 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between mt-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Scaling Impact (Budget vs. Conversions)</h3>
              <p className="text-xs text-gray-400 mb-6">Comparison of Daily Budget (columns, left axis) against Conversions (line, right axis).</p>
            </div>

            <div className="relative w-full overflow-x-auto flex justify-center py-6">
              <div style={{ width: chartWidth, height: chartHeight }} className="relative font-mono">
                <svg width={chartWidth} height={chartHeight} className="overflow-visible select-none">
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = chartHeight * (1 - ratio);
                    return (
                      <g key={i}>
                        <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                        <text x={-10} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="end">
                          {Math.round(maxBudget * ratio)} PKR
                        </text>
                        <text x={chartWidth + 10} y={y + 4} fill="rgba(74, 222, 128, 0.4)" fontSize="8" textAnchor="start">
                          {Math.round(maxLeads * ratio)}
                        </text>
                      </g>
                    );
                  })}

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

                  {(() => {
                    const xGap = chartWidth / (scaleDataset.length + 1);
                    const points = scaleDataset.map((item, idx) => {
                      const x = xGap * (idx + 1);
                      const y = chartHeight - (item.leads / maxLeads) * chartHeight;
                      return { x, y };
                    });

                    const d = points.reduce((acc, p, idx) => {
                      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                    }, '');

                    return (
                      <>
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

            <div className="mt-10 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">scaling analysis:</span>
              <span className="text-blue-400 font-bold font-mono">Raising budgets from 300 to 800 PKR yielded exponential Lead gains</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- RENDERING GOLD OF HIMALAYA ---
  if (slug === 'gold-of-himalaya-shopify-meta-ads') {
    // Increased size and radius for better proportion
    const radius = 60;
    const strokeWidth = 16;
    const size = 165;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    // Calculate dynamic stroke offsets
    let cumulativePercent = 0;

    return (
      <section className="mt-24 sm:mt-32 relative z-20">
        <div className="flex flex-col mb-12">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase self-start mb-4">
            Campaign Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Placement Distribution & Scaling
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Advertising delivery insights and scaling statistics for the Gold of Himalaya campaign, displaying a heavy audience concentration across Facebook mobile placements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Placement Distribution Donut */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between min-h-[380px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Platform Distribution</h3>
              <p className="text-xs text-gray-400 mb-6">Percentage share of delivery actions across Facebook and Instagram placements.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 flex-1">
              {/* Legend list */}
              <div className="space-y-2.5 font-mono w-full sm:w-3/5">
                {placements.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs p-1.5 rounded-lg border transition-all cursor-pointer ${
                      hoveredSegment === idx
                        ? 'bg-white/[0.04] border-white/10 scale-[1.02]'
                        : 'border-transparent hover:bg-white/[0.02]'
                    }`}
                    onMouseEnter={() => setHoveredSegment(idx)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-300 text-[11px] font-medium">{item.placement}</span>
                    </div>
                    <span className="text-white font-bold text-[11px] font-mono">
                      {item.volume.toLocaleString()} <span className="text-gray-500">({item.share.toFixed(2)}%)</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Circular Donut Diagram */}
              <div className="relative flex items-center justify-center p-4 w-full sm:w-2/5 min-h-[180px]">
                <svg width={size} height={size} className="transform -rotate-90 select-none overflow-visible">
                  {placements.map((item, idx) => {
                    const percent = item.share;
                    const strokeDasharray = `${circumference} ${circumference}`;
                    const strokeDashoffset = circumference - (percent / 100) * circumference;
                    const rotationOffset = (cumulativePercent / 100) * 360;
                    cumulativePercent += percent;

                    const isHovered = hoveredSegment === idx;

                    return (
                      <g key={idx} transform={`rotate(${rotationOffset}, ${center}, ${center})`}>
                        {/* Glow support */}
                        {isHovered && (
                          <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={strokeWidth + 4}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="opacity-20 blur-[2px] transition-all"
                          />
                        )}

                        <motion.circle
                          cx={center}
                          cy={center}
                          r={radius}
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="cursor-pointer transition-all duration-200"
                          style={{ originX: 'center', originY: 'center' }}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset: strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                          onMouseEnter={(e) => {
                            setHoveredSegment(idx);
                            const rect = e.currentTarget.getBoundingClientRect();
                            setActiveTooltip({
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                              content: (
                                <div className="text-left font-mono">
                                  <p className="text-xs font-bold text-white mb-0.5">{item.placement}</p>
                                  <p className="text-[10px] text-green-400 font-extrabold">{item.share.toFixed(2)}% Share</p>
                                  <p className="text-[9px] text-gray-400">Total Volume: {item.volume.toLocaleString()}</p>
                                </div>
                              )
                            });
                          }}
                          onMouseLeave={() => {
                            setHoveredSegment(null);
                            setActiveTooltip(null);
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>
                {/* Central text node */}
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center pointer-events-none">
                  <span className="text-xl font-black text-white leading-none">3,148</span>
                  <span className="text-[8px] uppercase tracking-widest text-gray-500 mt-1 font-bold">Actions</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">campaign delivery:</span>
              <span className="text-emerald-400 font-bold font-mono">Facebook Placements generated 93.1% of reach volume</span>
            </div>
          </div>

          {/* Chart 2: Milestone Scaling Metric */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between relative">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Campaign Scaling Progression</h3>
              <p className="text-xs text-gray-400 mb-6">Visual progression comparison tracking Reach and Spend metrics through the campaign lifecycle.</p>
            </div>

            <div className="space-y-6 py-4">
              {/* Node 1: Mid-Campaign */}
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 font-mono text-sm font-bold">
                  Mid
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Reach Milestone</span>
                    <span className="text-white text-base font-extrabold font-mono">
                      <Counter value={7100} duration={1} />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Spend Metric</span>
                    <span className="text-white text-base font-extrabold font-mono">
                      <Counter value={55.00} duration={1} isCurrency={true} currencyCode="AED" />
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 text-[9px] text-gray-500 font-mono italic">Intermediate</div>
              </div>

              {/* Progress connector line */}
              <div className="h-8 flex justify-center items-center">
                <svg width="2" height="32" className="overflow-visible">
                  <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="0" cy="16" r="3" fill="#4ade80" className="animate-ping" style={{ animationDuration: '2s' }} />
                </svg>
              </div>

              {/* Node 2: Final Lifecycle */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/20 p-4 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">
                  Fin
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-500/50 font-bold">Total Final Reach</span>
                    <span className="text-emerald-400 text-lg font-black font-mono">
                      <Counter value={7600} duration={1.5} />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-500/50 font-bold">Final Spend</span>
                    <span className="text-emerald-400 text-lg font-black font-mono">
                      <Counter value={59.11} duration={1.5} isCurrency={true} currencyCode="AED" />
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 text-[9px] text-emerald-400/60 font-mono font-bold uppercase tracking-wider">Finalized</div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">progression impact:</span>
              <span className="text-emerald-400 font-bold font-mono">Reach scaled by +500 accounts in the final campaign phase</span>
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

  // --- RENDERING TOOTH CLINIC MANSEHRA ---
  if (slug === 'tooth-clinic-mansehra-meta-ads') {
    const maxLeads = 600;
    const maxCpl = 80;

    return (
      <section className="mt-24 sm:mt-32 relative z-20">
        <div className="flex flex-col mb-12">
          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase self-start mb-4">
            Campaign Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ads Campaign Optimization & Scaling
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Data insights from The Tooth Clinic campaigns, demonstrating the direct trade-off between lead acquisition scaling and unit-cost efficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Cost vs. Lead Volume Grouped Columns */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cost vs. Lead Volume Comparison</h3>
              <p className="text-xs text-gray-400 mb-6">Trade-off between campaign CPL (left axis) and total messaging conversions (right axis).</p>
            </div>

            <div className="flex justify-around items-end h-44 gap-8 px-4 relative pt-4 font-mono">
              {/* Campaign 1 */}
              <div className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="flex gap-2 items-end w-full justify-center">
                  {/* CPL Bar */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-red-400 mb-1">Rs 76</span>
                    <div className="w-8 bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-28 flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-red-500 to-rose-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${(75.81 / maxCpl) * 100}%`, originY: 1 }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">CPL</span>
                  </div>
                  {/* Leads Bar */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-green-400 mb-1">579</span>
                    <div className="w-8 bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-28 flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${(579 / maxLeads) * 100}%`, originY: 1 }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Leads</span>
                  </div>
                </div>
                <span className="text-[10px] text-white font-bold mt-2">Campaign 1 (Scaling)</span>
              </div>

              {/* Campaign 2 */}
              <div className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="flex gap-2 items-end w-full justify-center">
                  {/* CPL Bar */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-red-400 mb-1">Rs 36</span>
                    <div className="w-8 bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-28 flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${(36.21 / maxCpl) * 100}%`, originY: 1 }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">CPL</span>
                  </div>
                  {/* Leads Bar */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-green-400 mb-1">141</span>
                    <div className="w-8 bg-white/[0.03] border border-white/[0.05] rounded-t-lg h-28 flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${(141 / maxLeads) * 100}%`, originY: 1 }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Leads</span>
                  </div>
                </div>
                <span className="text-[10px] text-white font-bold mt-2">Campaign 2 (Efficiency)</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Optimization Trade-off:</span>
              <span className="text-emerald-400 font-bold font-mono">Campaign 2 cut acquisition unit cost in half (Rs 36.21)</span>
            </div>
          </div>

          {/* Chart 2: ROAS Showcase (Spend vs Revenue) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Return on Ad Spend (ROAS)</h3>
              <p className="text-xs text-gray-400 mb-6">Financial performance metrics showing total investment return architecture.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-1">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* 3D Circular Progress */}
                <svg width="144" height="144" className="transform -rotate-90">
                  <circle cx="72" cy="72" r="54" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="54"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - 43894 / 300000) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-black text-white">6.8x</span>
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider font-bold">ROAS ROI</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs w-full sm:w-1/2">
                <div className="flex justify-between items-center p-2 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                  <span className="text-gray-500">Ad Spend:</span>
                  <span className="text-white font-bold">Rs <Counter value={43894} /></span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-green-500/5 border border-green-500/10">
                  <span className="text-emerald-400">Revenue Gen:</span>
                  <span className="text-emerald-400 font-extrabold">Rs <Counter value={300000} />+</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Financial Impact:</span>
              <span className="text-green-400 font-bold font-mono">Generated over 3 Lacs revenue from Rs 44K budget</span>
            </div>
          </div>

          {/* Chart 3: Top-of-Funnel Retargeting Funnel */}
          <div className="lg:col-span-12 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between mt-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Patient Conversion Funnel</h3>
              <p className="text-xs text-gray-400 mb-6">Complete step-down pipeline mapping impressions down to patients requesting bookings.</p>
            </div>

            <div className="space-y-6 py-4 max-w-3xl mx-auto w-full">
              {[
                { label: 'Total Views (Impressions)', value: 617246, percent: 100, sublabel: 'Massive brand reach', color: 'from-blue-500 to-indigo-400' },
                { label: '3-Sec Video Plays', value: 184856, percent: 29.9, sublabel: 'High brand engagement', color: 'from-indigo-500 to-purple-400' },
                { label: 'Link Clicks', value: 1951, percent: 0.32, sublabel: 'Active clinical interest', color: 'from-purple-500 to-pink-400' },
                { label: 'Conversions (Leads)', value: 720, percent: 0.12, sublabel: 'Direct WhatsApp requests', color: 'from-pink-500 to-emerald-400' }
              ].map((stage, idx) => (
                <div key={idx} className="relative">
                  <div className="flex justify-between items-end mb-2 text-xs font-mono">
                    <span className="text-gray-300 font-bold">{stage.label}</span>
                    <span className="text-white font-extrabold">
                      {stage.value.toLocaleString()} <span className="text-gray-500">({stage.percent}%)</span>
                    </span>
                  </div>
                  <div className="h-6 rounded-full bg-white/[0.03] border border-white/[0.05] overflow-hidden p-0.5 relative group">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${stage.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
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

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Funnel Efficiency:</span>
              <span className="text-blue-400 font-bold font-mono">37% click-to-conversation conversion rate indicates strong intent</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- RENDERING STERLING SMILES ---
  if (slug === 'sterling-smiles') {
    return (
      <section className="mt-24 sm:mt-32 relative z-20">
        <div className="flex flex-col mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase self-start mb-4">
            Recruitment Campaign
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Targeted Recruitment Campaign Analytics
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Performance metrics for Sterling Smiles, showcasing extreme conversion velocity and cost efficiency in hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Onboarding Velocity Timer */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Onboarding Velocity Timeline</h3>
              <p className="text-xs text-gray-400 mb-6">Timeline showing immediate conversion from ad launch to sourcing the right candidate.</p>
            </div>

            <div className="space-y-6 py-4 relative font-mono">
              {/* Node 1 */}
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 text-xs font-bold">
                  0h
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Campaign Launch</span>
                  <span className="text-white text-sm font-extrabold">Ads delivering in Islamabad</span>
                </div>
              </div>

              {/* Progress connector line */}
              <div className="h-6 flex justify-center items-center">
                <svg width="2" height="24" className="overflow-visible">
                  <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Node 2 */}
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 text-xs font-bold">
                  +73
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Applications Sourced</span>
                  <span className="text-white text-sm font-extrabold"><Counter value={73} /> Candidates Sourced</span>
                </div>
              </div>

              {/* Progress connector line */}
              <div className="h-6 flex justify-center items-center">
                <svg width="2" height="24" className="overflow-visible">
                  <line x1="0" y1="0" x2="0" y2="24" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="0" cy="12" r="3" fill="#10b981" className="animate-ping" style={{ animationDuration: '2s' }} />
                </svg>
              </div>

              {/* Node 3 */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/20 p-4 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-xs font-bold">
                  24h
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-500/50 font-bold">Candidate Contract Signed</span>
                  <span className="text-emerald-400 text-sm font-black uppercase">Successfully Hired & Onboarded</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Hiring Speed:</span>
              <span className="text-emerald-400 font-bold font-mono">First-day candidate hired in less than 24 hours</span>
            </div>
          </div>

          {/* Chart 2: Candidate Acquisition Cost Ring */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Hyper-Efficient Candidate Acquisition</h3>
              <p className="text-xs text-gray-400 mb-6">Unit costs and total ad budget required to fill the clinical vacancy.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-1">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg width="144" height="144" className="transform -rotate-90">
                  <circle cx="72" cy="72" r="54" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="54"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - 837.31 / 25000) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-base font-black text-white">Rs 11.47</span>
                  <span className="text-[7px] text-gray-500 uppercase tracking-wider font-bold">Cost / Lead</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs w-full sm:w-1/2">
                <div className="flex justify-between items-center p-2 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                  <span className="text-gray-500">Total Spend:</span>
                  <span className="text-white font-bold">Rs <Counter value={837.31} /></span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <span className="text-blue-400">Total Leads:</span>
                  <span className="text-blue-400 font-extrabold"><Counter value={73} /> Candidates</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Cost Efficiency:</span>
              <span className="text-blue-400 font-bold font-mono">30x cheaper than traditional recruitment agency options</span>
            </div>
          </div>

          {/* Chart 3: Click-to-Lead Funnel */}
          <div className="lg:col-span-12 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between mt-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">High-Intent Recruitment Funnel</h3>
              <p className="text-xs text-gray-400 mb-6">Transition levels showing the direct candidate qualification funnel breakdown.</p>
            </div>

            <div className="space-y-6 py-4 max-w-3xl mx-auto w-full">
              {[
                { label: 'Total Views (Impressions)', value: 3482, percent: 100, sublabel: 'Targeted reach in Islamabad area', color: 'from-blue-500 to-indigo-400' },
                { label: 'Link Clicks', value: 159, percent: 4.56, sublabel: 'Clinical interest clicked through', color: 'from-purple-500 to-pink-400' },
                { label: 'Completed Leads (Applications)', value: 73, percent: 2.09, sublabel: 'Form completed (45.9% conversion velocity)', color: 'from-pink-500 to-emerald-400' }
              ].map((stage, idx) => (
                <div key={idx} className="relative">
                  <div className="flex justify-between items-end mb-2 text-xs font-mono">
                    <span className="text-gray-300 font-bold">{stage.label}</span>
                    <span className="text-white font-extrabold">
                      {stage.value.toLocaleString()} <span className="text-gray-500">({stage.percent}%)</span>
                    </span>
                  </div>
                  <div className="h-6 rounded-full bg-white/[0.03] border border-white/[0.05] overflow-hidden p-0.5 relative group">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${stage.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
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

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-gray-400">
              <span className="font-semibold tracking-wider text-gray-500 uppercase text-[10px]">Funnel Engagement:</span>
              <span className="text-emerald-400 font-bold font-mono">45.9% Click-to-Lead conversion rate represents extremely high intent</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
