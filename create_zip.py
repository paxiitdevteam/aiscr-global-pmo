import zipfile
import os
from datetime import datetime

# Create ZIP file
zip_filename = 'AISCR_PMO_Complete_System.zip'

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    # Add Excel file
    if os.path.exists('AISCR_PMO_Full_Automated_System.xlsx'):
        zipf.write('AISCR_PMO_Full_Automated_System.xlsx')
        print(f"Added: AISCR_PMO_Full_Automated_System.xlsx")
    
    # Add all Word templates
    templates_dir = 'Templates'
    if os.path.exists(templates_dir):
        for root, dirs, files in os.walk(templates_dir):
            for file in files:
                if file.endswith('.docx'):
                    file_path = os.path.join(root, file)
                    zipf.write(file_path, os.path.join('Templates', file))
                    print(f"Added: Templates/{file}")

print(f"\nZIP file created successfully: {zip_filename}")
print(f"File size: {os.path.getsize(zip_filename) / 1024:.2f} KB")

