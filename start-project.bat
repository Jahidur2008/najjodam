@echo off
title Najjo Dam - কৃষকের বাজারদর
echo ===================================================
echo     Starting "Najjo Dam" (ন্যায্য দাম) Full-Stack System
echo ===================================================
echo.
echo 1. Starting Backend Server on http://localhost:5000 ...
start "Najjo Dam Backend (Port 5000)" cmd /k "cd /d %~dp0server && npm run dev"

echo 2. Starting Frontend Client on http://localhost:3000 ...
start "Najjo Dam Frontend (Port 3000)" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ===================================================
echo Both servers have been launched in separate windows!
echo - Public Website:  http://localhost:3000
echo - Admin Login:     http://localhost:3000/admin/login
echo - Backend API:     http://localhost:5000/api/health
echo ===================================================
pause
