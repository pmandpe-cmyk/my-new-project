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
