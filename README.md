# AISCR GLOBAL PMO - Automated Excel System & Web Application

A comprehensive Project Management Office (PMO) system with automated Excel workbooks, Word templates, and a modern web application.

## 🚀 Features

### Excel System
- 22 automated sheets with formulas, dashboards, and charts
- Automated calculations and data validation
- Conditional formatting
- No macros required

### Web Application
- Interactive dashboard with KPIs and charts
- Full CRUD operations for all modules
- Real-time data visualization
- Export to PDF, Word, and Excel
- Power BI and Tableau integration ready
- Multi-currency support (including CFA Franc)
- Notification system
- Responsive design

### Modules Implemented
- ✅ Project Portfolio Management
- ✅ Risk Register with Heat Map
- ✅ Budget Management
- ✅ Timeline & Gantt
- ✅ Issues Tracking
- ✅ Volunteer Management
- ✅ Stakeholder Register
- ✅ Project Monitoring
- ✅ Reports & Analytics

## 📁 Project Structure

```
.
├── frontend/              # Web application
│   ├── index.html        # Main dashboard
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript modules
│   └── assets/           # Static assets
├── documents/             # Documentation
│   └── development/      # Development plans
├── scripts/               # Deployment and utility scripts
│   ├── deploy-nas.sh     # Production deployment (NAS)
│   ├── start-server.sh   # Local development server
│   └── setup.sh          # Initial setup
├── Templates/             # Word document templates
├── create_pmo_system.py   # Excel generator
├── create_word_templates.py  # Word generator
├── create_zip.py         # Archive creator
├── landing.html          # Landing page
├── download.html         # Download page
└── README.md             # This file
```

## 🛠️ Quick Start

### Prerequisites
- Python 3.7+
- Git Bash (for Windows)
- Modern web browser

### Initial Setup (First Time)
```bash
bash scripts/setup.sh
```

### Start Local Development
```bash
bash scripts/start-server.sh
```

**Access:**
- Landing Page: `http://localhost:8000/`
- Dashboard: `http://localhost:8000/dashboard`

### Build Artifacts
```bash
# Generate Excel and Word files
python create_pmo_system.py
python create_word_templates.py
python create_zip.py

# Or use npm script
npm run build
```

## 🌐 Deployment

### Production Deployment (NAS)
```bash
bash scripts/deploy-nas.sh
```

**Deploys to:** `https://pmo.paxiit.com`

**Note:** Dashboard and Download pages are blocked in production for security. See `SECURITY_AND_DEPLOYMENT_GUIDE.md` for details.

### CI/CD Pipeline
- Automated validation and build
- Manual approval for production deployment
- See `.github/workflows/ci-cd.yml` for configuration

## 📝 Development

See `documents/development/` for:
- Development recommendations
- TODO implementation plan
- Feature roadmap

## 🧪 Testing

```bash
# Run tests (when implemented)
python -m pytest tests/
```

## 📦 Build

```bash
# Generate all files
python create_pmo_system.py
python create_word_templates.py
python create_zip.py
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with descriptive messages
4. Push and create a Pull Request

## 📄 License

Copyright © 2025 AISCR Global. All rights reserved.

## 👥 Team

AISCR Global PMO Development Team

---

**Version:** 1.0.0  
**Last Updated:** 2025

