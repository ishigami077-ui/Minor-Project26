# Kisan Setu (किसान सेतु)
### Digital Agricultural Marketplace and Farmer Support Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646C99?logo=vite&logoColor=white)](https://vitejs.dev/)
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

Smallholder and medium-scale farmers in India routinely lose **15% to 25% of gross harvest value** to non-transparent intermediary layers (*arthiyas* and commission agents) operating across agricultural mandis. Concurrently, high-value agricultural machinery (such as 45–55 HP tractors, combine harvesters, JCB loaders, and laser land levelers) experiences up to **40% seasonal idle time** because local custom hiring centers lack an accessible digital channel to reach farmers within a 25–40 km operational radius.

**Kisan Setu (किसान सेतु)** solves these structural bottlenecks by providing an integrated, transparent, four-tier digital marketplace platform that connects:
1. **Primary Agricultural Producers (Farmers)**
2. **Bulk Commodity Buyers (Millers, Food Processors, Wholesalers)**
3. **Heavy Equipment & Machinery Service Providers**

The platform is backed by **Kisan Sahayak (किसान सहायक)**, an automated AI assistant with a strict **dual-tier safety guardrail** mechanism that answers platform navigation and listing queries directly while responsibly escalating agronomic disease diagnoses or legal payment disputes to certified government helplines.

---

## 🏛️ Four-Layer System Architecture

```
+---------------------------------------------------------------------------------+
|                          LAYER 1: PRESENTATION TIER                              |
|  - Farmer Producer Desk           - Bulk Buyer Procurement Catalog               |
|  - Machinery & Rental Explorer    - Bilateral Real-Time Messaging Hub            |
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
+---------------------------------------------------------------------------------+
                                       │
                                       ▼
+---------------------------------------------------------------------------------+
|                             LAYER 3: DATA TIER                                   |
|  - Client-Side Persistent Store Engine (Zero-Latency LocalStorage Schema)        |
|  - Normalized Entities: ProduceLots, MachineryFleet, Users, Chats, FollowGraph  |
|  - Full-State Factory Reset Dispatcher                                           |
+---------------------------------------------------------------------------------+
                                       │
                                       ▼
+---------------------------------------------------------------------------------+
|                       LAYER 4: EXTERNAL SERVICES TIER                            |
|  - Kisan Sahayak AI Platform Assistant (Platform navigation & Mandi benchmarking)|
|  - Statutory Government Helpline Gateway (Kisan Call Center: 1800-180-1551)     |
|  - APMC Agmarknet Market Rate Telemetry Feed                                     |
|  - Phase-2 Roadmap: Escrow Smart Contracts & Computer Vision Grain Grading       |
+---------------------------------------------------------------------------------+
```

---

## 🚀 Key Modules & Capabilities

### 1. Structured Agricultural Produce Marketplace
- **Standardized Listings**: Eliminates ambiguous informal communications by enforcing strict data attributes: crop name, botanical variety, category (Cereals, Pulses, Oilseeds, Cash Crops), total available volume, measurement unit (Quintals/Tonnes), and Minimum Order Quantity (MOQ).
- **APMC Mandi Price Benchmarking**: Automatically shows official APMC benchmark rates alongside farmer gate prices to highlight arbitrage savings and protect against below-MSP distress sales.
- **Multifaceted Filtering**: Filter by agricultural commodity, geographic state/district (e.g., Saoner, Nagpur, Amravati), and minimum lot size.

### 2. Agricultural Machinery & Equipment Custom Hiring Hub
- **Equipment Scope**: Covers tractors (45–55 HP), combine harvesters, JCB backhoe loaders, mini tillers, rotary tillers, and agricultural drone sprayers.
- **Service Modalities**:
  - *Turnkey Service*: Machine provided with an experienced, certified operator and fuel terms.
  - *Self-Drive Rental*: Billed on an hourly or daily rate.
  - *Direct Sale*: Pre-owned machinery listings with verified mechanical inspections.
- **Operational Radius Matching**: Defines service dispatch range (15 to 40 km) to prevent unviable transit distances.

### 3. Producer Management Desk (Farmer Dashboard)
- Instant inventory tracking: Active lots, quantities under negotiation, and sold-out flags.
- Real-time farm gate gross valuation metrics.
- One-click shortcuts for listing new seasonal harvest lots or booking preparation machinery.

### 4. Direct Bilateral Messaging & Negotiation Hub
- Eliminates predatory middleman price distortion through private direct chat.
- Rapid negotiation action pills:
  - Counter-offer increments (`-₹50 / Qtl`, `-₹100 / Qtl`).
  - Request 250g grain quality inspection sample.
  - Confirm 48-hour farm gate dispatch and mandi transport.
  - Formally accept quoted prices.
- Counterparty auto-responder simulates realistic agricultural trading negotiations.

### 5. Followed Grower Network
- Bulk buyers and food processing units can "follow" preferred organic or high-grade producers.
- Real-time notification feed delivers immediate alerts when a followed farmer harvests a new batch.

### 6. Dual-Tier AI Guardrail Triage (Kisan Sahayak)
- **Tier 1 (Direct Assistance)**: Step-by-step guidance on creating crop listings, searching machinery, comparing Mandi MSP rates, and platform navigation.
- **Tier 2 (Statutory Escalation)**: To ensure farmer safety, queries regarding chemical pesticide dosages, plant pathology, or legal non-payment disputes are intercepted and routed to certified government agencies:
  - *Kisan Call Center (Ministry of Agriculture)*: `1800-180-1551` (Toll-Free, 22 languages).
  - *National Legal Services Authority & APMC Grievance Cell*: `15100`.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 19 | Component-driven UI architecture with hooks and reactive state |
| **Styling** | Tailwind CSS v4 | High-performance atomic CSS engine with responsive utility classes |
| **Icons** | Lucide React | Modern, clean vector iconography |
| **Build Tool** | Vite 6 | Rapid Hot-Module Replacement (HMR) and optimized rollup production bundles |
| **Typography** | Plus Jakarta Sans & Mukta | Clean modern Latin sans-serif with native Devanagari script support |
| **Persistence** | HTML5 Web Storage | Offline-first client persistence with exportable JSON schemas |

---

## 📦 Getting Started (Local Development)

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ishigami077-ui/Minor-Project26.git
   cd Minor-Project26
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready artifacts will be generated in the `dist/` directory.

---

## 📄 Project Documentation

The complete 32-page B.Tech Minor Project Report is available inside the [`docs/`](docs/) directory in both PDF and DOCX formats:

- 📕 [**Kisan Setu Project Report (PDF)**](docs/Kisan_Setu_Project_Report_Updated_31_October_2026.pdf) — Complete 32-page academic submission copy with certificates, declaration, diagrams, and formatting adhering to standard university dissertation norms.
- 📘 [**Kisan Setu Project Report (Word DOCX)**](docs/Kisan_Setu_Project_Report_Updated_31_October_2026.docx) — Fully editable Microsoft Word document.

### Report Chapter Outline:
* **Chapter 1**: Introduction, Motivation & Problem Formulation
* **Chapter 2**: Literature Review & Analysis of Existing Agricultural Portals
* **Chapter 3**: Four-Tier System Architecture & Dual-Tier Safety Guardrails
* **Chapter 4**: Implementation Methodologies & Data Schemas
* **Chapter 5**: Verification, Validation & Security Analysis
* **Chapter 6**: Results, Telemetry & Discussion
* **Chapter 7**: Future Scope (Escrow Payments, CV Grain Grading & Regional Voice Interfaces)
* **Chapter 8**: Conclusion & Academic Summary

---

## 📜 Academic Declaration & Acknowledgments

We hereby declare that the prototype and project report entitled **"Kisan Setu: Digital Agricultural Marketplace and Farmer Support Platform"** was developed and documented by us as our Minor Project in the Department of Computer Science and Engineering, G H Raisoni University, Saikheda / Nagpur.

We express our sincere gratitude to our supervisor **Dr. Rahul Khokale** and Head of Department **Mr. Dheeraj Ghagre** for their invaluable guidance, encouragement, and technical oversight.

---
&copy; 2026 Department of Computer Science & Engineering, G H Raisoni University. All rights reserved.
