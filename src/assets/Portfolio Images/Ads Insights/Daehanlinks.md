# Antigravity Chart Brief: Meta Ads Case Study Dataset

This document provides a clean, structured dataset and technical specifications for the **Antigravity** development team to implement interactive, animated data visualizations for the Meta Ads project case study pages.

---

## 📊 1. Complete Campaign Master Dataset

This dataset captures performance across multiple campaign variants, tracking awareness metrics, audience reach, conversion volume, and financial spend.

| Campaign & Creative Hook | Date Run | Metric: Views | Metric: Unique Viewers | Conversions: Messages | Total Spend (PKR) | Daily Budget (PKR) | Campaign Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **⚠️ LAST CAL...** (Ad) | Mar 14 | 24,639 | 10,088 | **248** | 8,746.38 | 800.00 / day | Not delivering |
| **KR Study in So...** (Ad) | Apr 05 | 19,478 | 9,228 | **175** | 4,424.69 | 800.00 / day | Not delivering |
| **🚨 BREAKING...** (Boosted Post) | Apr 05 | 1,381 | 1,048 | **4** | 278.47 | 280.52 / day | Completed |
| **Worried about ...** (Boosted Reel) | Apr 07 | 1,078 | 740 | **2** | 353.27 | 300.00 / day | Completed |
| **Dreaming of a ...** (Ad Var 1) | Apr 09 | 3,459 | 2,542 | **28** | 1,000.00 | 1,000.00 / day | Completed |
| **KR Your Master...** (Ad) | Apr 09 | 4,111 | 2,897 | **27** | 1,659.91 | 1,000.00 / day | Not delivering |
| **Dreaming of a ...** (Ad Var 2) | Apr 09 | 4,544 | 2,937 | **27** | 1,572.65 | 1,000.00 / day | Not delivering |

---

## 📈 2. Calculated Performance Metrics (For Advanced ROI Charts)

Use these derived metrics to show campaign optimization and Cost-Per-Lead (CPL) efficiencies. 

* **Cost Per Messaging Conversion (CPL)** = *Total Spend ÷ Messaging Conversions*
* **Conversion Rate (CVR %)** = *(Messaging Conversions ÷ Unique Viewers) × 100*

| Campaign & Creative Hook | Cost Per Conversion (PKR) | Viewer-to-Lead Conversion Rate (%) |
| :--- | :---: | :---: |
| **KR Study in So...** (Apr 05) | **25.28 PKR** *(Most Cost-Efficient)* | 1.90% |
| **⚠️ LAST CAL...** (Mar 14) | **35.26 PKR** *(Best High-Volume ROI)* | **2.46%** *(Highest Conversion Rate)* |
| **Dreaming of a ...** (Apr 09 - Var 1) | 35.71 PKR | 1.10% |
| **Dreaming of a ...** (Apr 09 - Var 2) | 58.25 PKR | 0.92% |
| **KR Your Master...** (Apr 09) | 61.48 PKR | 0.93% |
| **🚨 BREAKING...** (Boosted Post) | 69.62 PKR | 0.38% |
| **Worried about ...** (Boosted Reel) | 176.64 PKR | 0.27% |

---

## 🛠️ 3. Animated Chart Technical Specs for Antigravity

### Chart 1: Interactive Conversion Funnel (Awareness to Lead)
* **Visual Format:** Dynamic step-down horizontal funnel or nested bar animation.
* **Data Points to Feature:** * *Top Funnel:* Total Views (24,639)
    * *Mid Funnel:* Unique Viewers (10,088)
    * *Bottom Funnel:* Messaging Conversions (248)
* **Animation Behavior:** On-scroll sequence drawing the wide funnel top down to a concentrated bottom-funnel node to visualize conversion leakage and performance.

### Chart 2: Cost-Per-Lead (CPL) Efficiency Graph
* **Visual Format:** Animated Column/Bar Chart tracking individual CPL numbers.
* **Key Insight to Highlight:** Showcase how optimized Ad Sets significantly outperform organic boosted posts. Emphasize the **Apr 05 Ad** at **25.28 PKR** vs. the **Boosted Reel** at **176.64 PKR** (a 7x improvement in acquisition cost).
* **Animation Behavior:** Bars slide up from the baseline on viewport entry, using a color gradient scale (Green = highly efficient/low cost, Amber/Red = higher cost per result).

### Chart 3: Scaling Impact (Daily Budget vs. Total Volume)
* **Visual Format:** Multi-axis Combination Chart (Bars representing Daily Budget, Line representing Messaging Conversions).
* **Key Insight to Highlight:** Demonstrate a clear correlation showing that raising daily budgets to PKR 800 - PKR 1,000 scales user engagement exponentially compared to the PKR 280 - PKR 300 tier.
* **Animation Behavior:** The budget bars animate into position first, followed by a dynamic path-drawing animation for the conversion line graph looping through the campaign dates.