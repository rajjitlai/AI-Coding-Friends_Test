#!/usr/bin/env pwsh
# Test script to verify the authentication system is working

Write-Host "🔍 Testing Full-Stack Authentication System..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if backend is running
Write-Host "Test 1: Checking backend server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/me" -Method GET -ErrorAction SilentlyContinue
    Write-Host "❌ Backend should return 401 for unauthenticated request" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✅ Backend is running and protecting routes correctly" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 2: Check if frontend is running
Write-Host "Test 2: Checking frontend server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend is running on port 5173" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend is not responding: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Test registration endpoint
Write-Host "Test 3: Testing registration endpoint..." -ForegroundColor Yellow
$testEmail = "test_$(Get-Random)@example.com"
$testPassword = "TestPassword123"
$body = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Registration successful: $($response.user.email)" -ForegroundColor Green
    
    # Test 4: Test login endpoint
    Write-Host ""
    Write-Host "Test 4: Testing login endpoint..." -ForegroundColor Yellow
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Login successful, token received" -ForegroundColor Green
    
    # Test 5: Test protected endpoint
    Write-Host ""
    Write-Host "Test 5: Testing protected endpoint..." -ForegroundColor Yellow
    $headers = @{
        Authorization = "Bearer $($loginResponse.token)"
    }
    $meResponse = Invoke-RestMethod -Uri "http://localhost:3000/me" -Method GET -Headers $headers
    Write-Host "✅ Protected endpoint accessible: $($meResponse.email)" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎉 All tests completed!" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host "2. Register a new account" -ForegroundColor White
Write-Host "3. Login and access the dashboard" -ForegroundColor White
Write-Host ""
