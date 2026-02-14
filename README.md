
# EmailSum: Newsletter Architect 🚀

**EmailSum** is a high-performance intelligence dashboard designed to solve information overload. It transforms dense, long-form newsletters into structured, actionable insights in seconds.

Powered by the **Vibe O Coding Tool** AI engine, this application automates the tedious task of reading daily news, AI tool updates, and community links.

---

## ✨ Key Features

- **AI-Powered Distillation**: Leverages the **Vibe O Coding Tool** to compress 2,000+ word newsletters into high-density, 2-sentence summaries.
- **Automatic Taxonomy**: Smart categorization into *Important News*, *AI Tools*, *Links*, *Prompts*, and more.
- **Impact Scoring**: Every summary is assigned an importance score (1-10) by the **Vibe O Coding Tool** to help you prioritize your reading.
- **Persistent Archive**: All ingested data is saved to your browser's local storage, allowing you to access summaries from days or weeks ago without a backend database.
- **BYOK (Bring Your Own Key)**: A secure deployment model that lets users connect their own API key via a secure gateway.
- **Resource Extraction**: Automatically identifies and lists the most critical URLs from the raw text.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (ESM)
- **Styling**: Tailwind CSS
- **Intelligence**: Vibe O Coding Tool API
- **Charts**: Recharts
- **Persistence**: Browser LocalStorage API
- **Deployment**: Optimized for GitHub Pages

---

## 🚀 How to Use

1. **Connect Your Key**: On the first load, click the **"Connect API Key"** button. This opens a secure dialog to link your billing account for the **Vibe O Coding Tool**.
2. **Ingest a Newsletter**: Click **"New Ingest"** in the top right.
3. **Paste & Analyze**: Copy the raw text from any email newsletter and paste it into the modal.
4. **Scan the Dashboard**: View the categorized summaries. Click on "High Impact" items first.
5. **Filter**: Use the sidebar to drill down into specific areas like "AI Tools" or "Prompts."

---

## 📦 Deployment Instructions (GitHub)

This app is designed to be serverless and client-side only.

1. **Upload**: Push this repository to your GitHub account.
2. **GitHub Pages**:
   - Navigate to **Settings > Pages**.
   - Select the **main** branch and **root (/)** folder.
   - Click **Save**.
3. **Privacy**: No environment variables are required in the GitHub settings because the app uses the **Vibe O Coding Tool**'s native secure key selector (`window.aistudio`). Your personal API keys are never exposed in the source code.

---

## 🏗️ Architecture

- **Ingestion**: Raw text is captured via a UI modal.
- **Processing**: The **Vibe O Coding Tool** performs semantic analysis and returns structured JSON.
- **Storage**: Data is serialized to `localStorage`.
- **Presentation**: A reactive React dashboard with real-time filtering.

---
*Developed by a  Senior AI Product Architect for efficient knowledge management.*
