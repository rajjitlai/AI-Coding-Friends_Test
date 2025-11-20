# Quick Start Script for Authentication System
# Run this script to start both backend and frontend servers

Write-Host "🚀 Starting Authentication System..." -ForegroundColor Cyan
Write-Host ""

# Start backend in new window
Write-Host "📡 Starting Backend Server (Port 3000)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm start"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start frontend in new window
Write-Host "🎨 Starting Frontend Server (Port 5173)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Access the application at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📝 Backend API is running at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers." -ForegroundColor Gray
