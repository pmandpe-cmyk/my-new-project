const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the button demo
app.get('/button', (req, res) => {
    res.sendFile(path.join(__dirname, 'button.html'));
});

// Dashboard info route
app.get('/dashboard', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sales Command Center Dashboard</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 50px auto; 
                    padding: 20px; 
                    background-color: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 { color: #333; margin-bottom: 20px; }
                .success { color: #28a745; font-weight: bold; }
                .feature-list {
                    text-align: left;
                    max-width: 600px;
                    margin: 20px auto;
                }
                .feature-list li {
                    margin-bottom: 8px;
                }
                .code-note {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-size: 14px;
                    color: #6c757d;
                }
                .button-link {
                    display: inline-block;
                    background: #066afe;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    text-decoration: none;
                    margin: 10px;
                    transition: background 0.3s;
                }
                .button-link:hover {
                    background: #0556d6;
                }
                .success-link {
                    background: #28a745;
                }
                .success-link:hover {
                    background: #1e7e34;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 Sales Command Center Dashboard</h1>
                <p class="success">✅ Complete React Dashboard Built Successfully!</p>
                <p>A comprehensive AI SDR outreach monitoring dashboard with React + Tailwind + ShadCN/UI</p>
                
                <div class="feature-list">
                    <h3>🎯 Dashboard Features:</h3>
                    <ul>
                        <li><strong>Salesforce-like Navigation:</strong> Top nav with search, global icons, user menu</li>
                        <li><strong>KPI Cards:</strong> 3 clusters (Not Started, In Progress, Completed) with hover tooltips</li>
                        <li><strong>Smart Filters:</strong> Quick filter chips + advanced dropdowns for Owner, Channel, Campaign</li>
                        <li><strong>Interactive Table:</strong> Lead View with sorting, selection, outreach summaries</li>
                        <li><strong>Detail Panel:</strong> Right-slide panel with complete outreach timeline</li>
                        <li><strong>Enterprise UI:</strong> Clean shadows, rounded corners, hover states</li>
                        <li><strong>Responsive Design:</strong> Works on all screen sizes</li>
                    </ul>
                </div>

                <div class="code-note">
                    <strong>📁 Dashboard Location:</strong> <code>/dashboard/</code> directory<br>
                    <strong>🚀 To run locally:</strong> <code>cd dashboard && npm run dev</code><br>
                    <strong>🔧 Tech Stack:</strong> React, Vite, Tailwind CSS, Lucide Icons
                </div>
                
                <div>
                    <a href="/" class="button-link success-link">← Back to Home</a>
                    <a href="/button" class="button-link">🎨 View Button Demo</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Basic route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My New Project</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 50px auto; 
                    padding: 20px; 
                    background-color: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 { color: #333; margin-bottom: 20px; }
                p { color: #666; line-height: 1.6; }
                .success { color: #28a745; font-weight: bold; }
                .button-link {
                    display: inline-block;
                    background: #066afe;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    text-decoration: none;
                    margin: 20px 10px;
                    transition: background 0.3s;
                }
                .button-link:hover {
                    background: #0556d6;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎉 Welcome to My New Project!</h1>
                <p class="success">✅ Your Node.js application is successfully deployed on Heroku!</p>
                <p>This is a simple Express.js web server running on port ${PORT}.</p>
                <p>You can now build amazing things with this foundation.</p>
                
                <div style="margin: 30px 0;">
                    <a href="/dashboard" class="button-link" style="background: #28a745; font-weight: bold;">📊 Sales Command Center Dashboard</a>
                    <a href="/button" class="button-link">🎨 View Figma Button Demo</a>
                </div>
                
                <hr style="margin: 30px 0; border: none; height: 1px; background: #eee;">
                <p><em>Created with GitHub CLI and deployed to Heroku</em></p>
            </div>
        </body>
        </html>
    `);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(\`🚀 Server is running on port \${PORT}\`);
    console.log(\`🌐 Visit: http://localhost:\${PORT}\`);
});
