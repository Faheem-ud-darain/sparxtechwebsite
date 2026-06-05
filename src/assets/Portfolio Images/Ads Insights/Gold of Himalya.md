# Antigravity Chart Brief: Gold of Himalaya Campaign

This document contains structured data and technical requirements for the **Antigravity** development team to build interactive, animated charts specifically for the **Gold of Himalaya** campaign case study.

---

## 📊 1. Campaign Overview Dataset

This dataset captures performance metrics from the recent campaign run for `https://goldofhimalaya.com/`, tracked in United Arab Emirates Dirhams (AED).

| Campaign / Ad Link | Date Range | Reach | Total Amount Spent | Status |
| :--- | :--- | :---: | :---: | :--- |
| **Gold of Himalaya Traffic Ad** | Mar 13 - Mar 20 | 7,600 (7.6K) | AED 59.11 | Completed |
| **New Sales Campaign by SST** | *N/A* | -- | AED 40.16 | Pending |

> **Data Validation Note:** Data from the screenshots captured an intermediate phase with 7.1K Reach and AED 55.00 Spent, while the finalized screen shows completed performance metrics at 7.6K Reach and AED 59.11 Spent. The charts should leverage the final finalized data.

---

## 📱 2. Placement Breakdown Dataset (Platform Distribution)

This breakdown demonstrates audience engagement across different mobile UI formats on Facebook and Instagram, sorted from highest to lowest volume.

| Platform Placement (Mobile Devices) | Distribution Volume | Share Percentage (%) |
| :--- | :---: | :---: |
| **Facebook Feed** | 2,020 (2.02K) | 64.17% |
| **Facebook Reels** | 910 | 28.91% |
| **Instagram Reels** | 138 | 4.38% |
| **Instagram Feed** | 60 | 1.91% |
| **Facebook Stories** | 24 | 0.76% |
| **Instagram Stories** | 16 | 0.51% |
| **Total Placement Actions** | **3,148** | **100.00%** |

---

## 🛠️ 3. Animated Chart Technical Specs for Antigravity

### Chart 1: Interactive Platform & Placement Distribution Breakdown
* **Visual Format:** Animated Donut Chart or Segregated Horizontal Bar Stack.
* **Key Insight to Highlight:** Facebook Placements totally dominated this campaign run, capturing **over 93% of the overall reach volume** (with Facebook Mobile Feed accounting for 64.17% and Reels capturing 28.91%). Instagram configurations captured a minor share (~6.8%).
* **Animation Behavior:** The donut chart should draw its paths clockwise upon viewport entry, with each segment pulsing slightly outwards when hovered, dynamically exposing the share percentages.

### Chart 2: Milestone Scaling Metric (Campaign Lifecycle Progression)
* **Visual Format:** Dynamic Dual-Node Progress Tracker or Counter Animation.
* **Data Points to Feature:** * Mid-Campaign: **7.1K Reach** | **AED 55.00 Spent**
    * Final Lifecycle: **7.6K Reach** | **AED 59.11 Spent**
* **Animation Behavior:** A simple linear progression track where the numbers rapidly tally up (`0` to `7,600` for Reach, and `0.00` to `59.11` for Budget Spend) showcasing how delivery scaled dynamically over the custom date block.