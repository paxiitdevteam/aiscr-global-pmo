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
├── Templates/             # Word document templates
├── create_pmo_system.py  # Excel generator
├── create_word_templates.py  # Word generator
├── create_zip.py         # Archive creator
├── landing.html          # Landing page
├── download.html         # Download page
└── README.md             # This file
```

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.7+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "PMO AUTOMATED EXCEL SYSTEM"
   ```

2. **Install Python dependencies**
   ```bash
   pip install openpyxl python-docx
   ```

3. **Generate Excel and Word files**
   ```bash
   python create_pmo_system.py
   python create_word_templates.py
   python create_zip.py
   ```

4. **Start the web server**
   ```bash
   python -m http.server 8000
   ```

5. **Access the application**
   - Landing Page: http://localhost:8000/landing.html
   - Dashboard: http://localhost:8000/frontend/index.html
   - Downloads: http://localhost:8000/download.html

## 🌐 Deployment

### Option 1: Static Hosting (Recommended)
The frontend is a static site and can be deployed to:
- **Netlify** (Recommended - Easy CI/CD)
- **Vercel** (Great for static sites)
- **GitHub Pages** (Free hosting)
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

### Option 2: Traditional Web Server
- Apache
- Nginx
- IIS

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Automated testing
- Build validation
- Deployment to staging/production

See `.github/workflows/` for CI/CD configuration.

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

