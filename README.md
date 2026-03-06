# EcoProposalBot Frontend 🌱

A modern, professional React-based frontend application for an AI-powered sustainable proposal system with comprehensive history tracking and impact analysis.

## ✨ Features

### 🎯 Core Modules

- **Proposal Generator**: AI-powered sustainable proposal generation with budget optimization
- **Product Categorization**: Intelligent product classification with SEO tags and sustainability filters
- **Impact Analysis**: Environmental impact measurement with carbon footprint and plastic reduction metrics

### 🎨 UI/UX Highlights

- **Modern Design**: Professional gradient-based UI with smooth animations
- **Interactive Sidebar**: Scrollable history with clickable items to view full results
- **Responsive Layout**: Fully responsive design that works on all screen sizes
- **Visual Feedback**: Loading states, hover effects, and smooth transitions
- **Color-Coded Sections**: Intuitive color schemes for different modules
- **PDF Export**: Generate professional PDF reports from proposals

### 📊 History Tracking

- Real-time history updates for all modules
- Click any history item to view complete details
- Beautiful card-based layouts with preview information
- Empty states with meaningful icons

## 🛠️ Tech Stack

- **React** 19.2.0 - Modern UI library
- **Vite** 7.3.1 - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for custom designs
- **Axios** - Promise-based HTTP client
- **jsPDF & html2canvas** - Client-side PDF generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/prakhar80212/EcoProposalBot-frontend.git

# Navigate to project directory
cd EcoProposalBot-frontend

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Development

```bash
# Start development server
npm run dev

# Server will run on http://localhost:5173
```

### Build

```bash
# Create production build
npm run build

# Output will be in the dist/ folder
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
ai-system-frontend/
├── src/
│   ├── pages/
│   │   ├── ProposalPage.jsx          # AI Proposal Generator
│   │   ├── HistoryPage.jsx           # Proposal History Sidebar
│   │   ├── CategorizePage.jsx        # Product Categorization
│   │   ├── CategorizeHistoryPage.jsx # Categorization History
│   │   ├── ImpactPage.jsx            # Impact Analysis
│   │   └── ImpactHistoryPage.jsx     # Impact History
│   ├── App.jsx                        # Main App Component
│   ├── main.jsx                       # Entry Point
│   └── App.css                        # Global Styles
├── public/
├── .env                               # Environment Variables
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Design Features

### Color Schemes
- **Proposal Generator**: Blue/Indigo gradients
- **Product Categorization**: Purple/Pink gradients
- **Impact Analysis**: Green/Teal gradients

### UI Components
- Gradient headers with icons
- Card-based layouts with shadows
- Smooth hover transitions
- Loading spinners
- Empty state illustrations
- Responsive forms with focus states

## 🔗 API Integration

The frontend connects to the backend API for:
- Proposal generation
- Product categorization
- Impact analysis
- History retrieval for all modules

## 📝 Usage

1. **Generate Proposals**: Enter budget, client type, event type, and priority to generate AI-powered sustainable proposals
2. **Categorize Products**: Input product details to get AI-based categorization with SEO tags
3. **Analyze Impact**: Add products to measure environmental impact and sustainability metrics
4. **View History**: Click any item in the sidebar to view complete details
5. **Export PDFs**: Download professional reports for proposals and categorizations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Private

## 👨‍💻 Author

Prakhar - [GitHub](https://github.com/prakhar80212)
