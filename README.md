# Kisan Setu (किसान सेतु)
### Digital Agricultural Marketplace, Mechanization Hub & Agro-Intelligence Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646C99?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Live Weather](https://img.shields.io/badge/Live_Weather-Open--Meteo-sky?logo=cloud&logoColor=white)](https://open-meteo.com/)
[![Live Mandi](https://img.shields.io/badge/Mandi_Rates-Agmarknet_APMC-emerald.svg)](https://data.gov.in/)
[![License](https://img.shields.io/badge/License-Academic_Use-emerald.svg)]()
[![Documentation](https://img.shields.io/badge/Project_Report-32_Pages-red.svg)](docs/Kisan_Setu_Project_Report_Updated_31_October_2026.pdf)

> **B.Tech Computer Science and Engineering &middot; Minor Project (2026)**  
> **Department of Computer Science and Engineering**  
> **G H Raisoni University, Saikheda / Nagpur**

---

## 👥 Project Team & Academic Credentials

* **Student Project Team:**
  * **Misty Jamabholkar** (Enrollment No: `GHRUS25011020008`)
  * **Namrata Jaiswal** (Enrollment No: `GHRUS25011020001`)
  * **Naved Mansuri** (Enrollment No: `GHRUS25011020035`)
  * **Neel Tawre** (Enrollment No: `GHRUS25011020061`)

* **Project Supervisor:**
  * **Dr. Rahul Khokale**, Department of Computer Science and Engineering

* **Head of Department (HOD):**
  * **Mr. Dheeraj Ghagre**, Department of Computer Science and Engineering

---

## 🌾 Project Motivation & Overview

Smallholder and medium-scale farmers in India routinely lose **15% to 25% of gross harvest value** to non-transparent intermediary layers (*arthiyas* and commission agents) operating across agricultural mandis. Concurrently, high-value agricultural machinery (such as 45–55 HP tractors, combine harvesters, JCB loaders, and laser land levelers) experiences up to **40% seasonal idle time** because local custom hiring centers lack an accessible digital channel to reach farmers within a 25–40 km operational radius. Furthermore, farmers lack direct, hyper-local agro-meteorological advisories and transparent mandi price intelligence at harvest time.

**Kisan Setu (किसान सेतु)** solves these structural bottlenecks by providing an integrated, transparent, four-tier digital marketplace platform that connects:
1. **Primary Agricultural Producers (Farmers)**
2. **Bulk Commodity Buyers (Millers, Food Processors, Wholesalers)**
3. **Heavy Equipment & Machinery Service Providers**
4. **Live Agro-Intelligence Services (Live Mandi APMC Telemetry & Real-Time Weather Forecasting)**

The platform is backed by **Kisan Sahayak (किसान सहायक)**, an automated AI assistant with a strict **dual-tier safety guardrail** mechanism that answers platform navigation and listing queries directly while responsibly escalating agronomic disease diagnoses or legal payment disputes to certified government helplines.

---

## 🏛️ Four-Layer System Architecture

```
+---------------------------------------------------------------------------------+
|                          LAYER 1: PRESENTATION TIER                              |
|  - Farmer Producer Desk           - Bulk Buyer Procurement Catalog               |
|  - Machinery & Rental Explorer    - Bilateral Real-Time Messaging Hub            |
|  - Live Mandi APMC Intelligence   - Live Farm Weather & Scientific Advisories    |
|  - Followed Network Feed          - Responsive Mobile Viewports & Devanagari UI  |
+---------------------------------------------------------------------------------+
                                       │
                                       ▼
+---------------------------------------------------------------------------------+
|                          LAYER 2: APPLICATION TIER                               |
|  - Role-Based Access Control (RBAC: Farmer / Buyer / Equipment Provider)         |
|  - Listing Validation Schemas (Variety, MOQ, Moisture, APMC Benchmark)          |
|  - Bilateral Negotiation State Machine (Counter-offers, Sampling, Logistics)    |
|  - Dual-Tier Guardrail Safety Triage Engine                                      |
|  - Agro-Meteorological Advisory Engine (Spraying, Irrigation, Harvest Alerts)   |
+---------------------------------------------------------------------------------+
                                       │
                                       ▼
+---------------------------------------------------------------------------------+
|                             LAYER 3: DATA TIER                                   |
|  - Client-Side Persistent Store Engine (Zero-Latency LocalStorage Schema)        |
|  - Normalized Entities: ProduceLots, MachineryFleet, Users, Chats, FollowGraph  |
|  - Live Cache Layer: Open-Meteo Weather Cache & Agmarknet Daily Cache           |
|  - Full-State Factory Reset Dispatcher                                           |
+---------------------------------------------------------------------------------+
                                       │
                                       ▼
+---------------------------------------------------------------------------------+
|                       LAYER 4: EXTERNAL SERVICES TIER                            |
|  - Live APMC Mandi Feed: data.gov.in Agmarknet API (Resource 9ef84268...)        |
|  - Live Agro-Weather Feed: Open-Meteo & IMD / ECMWF Meteorological Engine        |
|  - Open-Meteo Geocoding Service (National Town, District & City Resolution)     |
|  - Kisan Sahayak AI Platform Assistant (Platform navigation & Mandi benchmarking)|
|  - Statutory Government Helpline Gateway (Kisan Call Center: 1800-180-1551)     |
|  - Phase-2 Roadmap: Escrow Smart Contracts & Computer Vision Grain Grading       |
+---------------------------------------------------------------------------------+
```

---

## 🚀 Key Modules & Capabilities

### 1. Live Mandi Updates (APMC Market Telemetry)
- **Dedicated Live Mandi Section**: Real-time agricultural commodity prices from regional Agricultural Produce Market Committees (APMCs) across India.
- **Official Open Government Data (data.gov.in)**: Directly integrates with the official Agmarknet resource dataset (`9ef84268-d588-465a-a308-a864a43d0070`).
- **Comprehensive Commodity Metrics**: Displays crop name, botanical variety, minimum price, maximum price, modal benchmark price, price spread, arrival volume (tonnes), market location (market, district, state), and arrival timestamp.
- **Dynamic Search & Filtering**: Multi-parameter search by commodity, variety, mandi market, district, state, or category (Cereals, Pulses, Oilseeds, Cash Crops, Vegetables, Spices).
- **Price Benchmarking & Sorting**: Sort by Modal Price (High-to-Low, Low-to-High), Commodity Name (A-Z), or Arrival Volume.
- **Dual Visualization Modes**: Switch seamlessly between **Grid Cards View** (with visual price spread bars) and **APMC Table View** (full data table).
- **Direct Cross-Navigation**: "Find Sellers in Marketplace" button instantly links from a mandi commodity to farm-gate listings with active lots.
- **Truth in Data Reporting**: Clearly flags live data feeds vs verified archived benchmarks. Never displays fabricated prices. When credentials are missing or rate-limited, provides an interactive API key manager with direct links to free registration on [data.gov.in](https://data.gov.in/).

### 2. Live Weather Reporting & Scientific Field Advisories
- **Dedicated Live Weather Section**: Accurate, hyper-local meteorological data powered by Open-Meteo (IMD / ECMWF numerical weather prediction models) with zero API key barriers.
- **Core Atmospheric Telemetry**:
  - Ambient Temperature (°C) & Apparent / Feels-Like Temperature (°C).
  - Relative Humidity (%) with transpiration gauge.
  - Precipitation / Rainfall (mm) & precipitation probability (%).
  - Wind Speed (km/h) & Cardinal Direction (N, NE, E, SE, S, SW, W, NW).
  - Surface Atmospheric Pressure (hPa) & elevation profile.
  - Weather condition description and dynamic WMO iconography.
- **Scientific Agricultural Advisories**:
  - *Spraying Advisory*: Evaluates wind speed (< 18 km/h) and upcoming 12-hour rain probability to prevent chemical drift or pesticide runoff wash-off.
  - *Irrigation Advisory*: Balances surface moisture and evapotranspiration rates to recommend evening drip or hold surface watering.
  - *Harvest & Grain Drying Advisory*: Alerts farmers regarding open-yard solar drying conditions or severe storm cover recommendations.
- **Next 24-Hour Hourly Forecast**: Hourly slider with temperatures, rain probabilities, and condition icons.
- **7-Day Agricultural Outlook**: Day-by-day forecast with minimum/maximum temperature gradient bars, rain chances, and sunrise/sunset times.
- **Location Flexibility**: Search any town, district, or tehsil in India via real-time geocoding, use one-click GPS detection, or toggle preset agricultural hubs (Sehore, Saikheda, Nagpur, Indore, Nashik, Karnal, Ludhiana, Amravati).
- **Automatic Background Sync**: Auto-refreshes data every 5 minutes with a live countdown timer and instant manual refresh toggle.

### 3. Structured Agricultural Produce Marketplace
- **Standardized Listings**: Eliminates ambiguous informal communications by enforcing strict data attributes: crop name, botanical variety, category (Cereals, Pulses, Oilseeds, Cash Crops), total available volume, measurement unit (Quintals/Tonnes), and Minimum Order Quantity (MOQ).
- **APMC Mandi Price Benchmarking**: Automatically shows official APMC benchmark rates alongside farmer gate prices to highlight arbitrage savings and protect against below-MSP distress sales.
- **Multifaceted Filtering**: Filter by agricultural commodity, geographic state/district (e.g., Saoner, Nagpur, Amravati), and minimum lot size.

### 4. Agricultural Machinery & Equipment Custom Hiring Hub
- **Equipment Scope**: Covers tractors (45–55 HP), combine harvesters, JCB backhoe loaders, mini tillers, rotary tillers, and agricultural drone sprayers.
- **Service Modalities**:
  - *Turnkey Service*: Machine provided with an experienced, certified operator and fuel terms.
  - *Self-Drive Rental*: Billed on an hourly or daily rate.
  - *Direct Sale*: Pre-owned machinery listings with verified mechanical inspections.
- **Operational Radius Matching**: Defines service dispatch range (15 to 40 km) to prevent unviable transit distances.

### 5. Producer Management Desk (Farmer Dashboard)
- Instant inventory tracking: Active lots, quantities under negotiation, and sold-out flags.
- Real-time farm gate gross valuation metrics.
- Integrated telemetry shortcuts linking directly to Live Mandi prices and Live Weather advisories.

### 6. Direct Bilateral Messaging & Negotiation Hub
- Eliminates predatory middleman price distortion through private direct chat.
- Rapid negotiation action pills: Counter-offers (`-₹50/Qtl`, `-₹100/Qtl`), grain quality inspection sample requests, and formal price acceptance.

### 7. Dual-Tier AI Guardrail Triage (Kisan Sahayak)
- **Tier 1 (Direct Assistance)**: Guidance on creating crop listings, searching machinery, comparing Mandi MSP rates, and platform navigation.
- **Tier 2 (Statutory Escalation)**: To ensure farmer safety, queries regarding chemical pesticide dosages, plant pathology, or legal disputes are routed to certified government helplines:
  - *Kisan Call Center (Ministry of Agriculture)*: `1800-180-1551` (Toll-Free, 22 languages).
  - *National Legal Services Authority & APMC Grievance Cell*: `15100`.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 19 | Component-driven UI architecture with hooks and reactive state |
| **Styling** | Tailwind CSS v4 | High-performance atomic CSS engine with responsive utility classes |
| **Icons** | Lucide React | Modern, clean vector iconography |
| **Build Tool** | Vite 6 / 8 | Rapid Hot-Module Replacement (HMR) and optimized rollup production bundles |
| **Mandi API** | Agmarknet (data.gov.in) | Official Indian Government APMC daily commodity auction rate dataset |
| **Weather API** | Open-Meteo & IMD / ECMWF | Zero-key high-accuracy agro-meteorological forecasting & geocoding |
| **Typography** | Plus Jakarta Sans & Mukta | Clean modern Latin sans-serif with native Devanagari script support |
| **Persistence** | HTML5 Web Storage | Offline-first client persistence with exportable JSON schemas |

---

## 📦 Getting Started (Local Development)

### Prerequisites
- Node.js (v18.0 or higher) or Bun (v1.1 or higher)
- npm or bun package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ishigami077-ui/Minor-Project26.git
   cd Minor-Project26
   ```

2. **Configure Environment Variables (Optional for Live Mandi Feeds):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your free [data.gov.in](https://data.gov.in/) API key for live Agmarknet APMC rates:
   ```env
   VITE_DATAGOV_API_KEY=your_40_character_api_key_here
   ```
   *(Note: Live Weather works out of the box with zero API key configuration).*

3. **Install project dependencies:**
   ```bash
   npm install
   # or with bun
   bun install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   # or with bun
   bun run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for production:**
   ```bash
   npm run build
   # or with bun
   bun run build
   ```
   The production-ready artifacts will be generated in the `dist/` directory.

---

## 📄 Project Documentation

The complete 32-page B.Tech Minor Project Report is available inside the [`docs/`](docs/) directory in both PDF and DOCX formats:

- 📕 [**Kisan Setu Project Report (PDF)**](docs/Kisan_Setu_Project_Report_Updated_31_October_2026.pdf) — Complete 32-page academic submission copy with certificates, declaration, diagrams, and formatting adhering to standard university dissertation norms.
- 📘 [**Kisan Setu Project Report (Word DOCX)**](docs/Kisan_Setu_Project_Report_Updated_31_October_2026.docx) — Fully editable Microsoft Word document.

---

## 📜 Academic Declaration & Acknowledgments

We hereby declare that the prototype and project report entitled **"Kisan Setu: Digital Agricultural Marketplace and Farmer Support Platform"** was developed and documented by us as our Minor Project in the Department of Computer Science and Engineering, G H Raisoni University, Saikheda / Nagpur.

We express our sincere gratitude to our supervisor **Dr. Rahul Khokale** and Head of Department **Mr. Dheeraj Ghagre** for their invaluable guidance, encouragement, and technical oversight.

---
&copy; 2026 Department of Computer Science & Engineering, G H Raisoni University. All rights reserved.
