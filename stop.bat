@echo off
title GachaTrip Server Stopper

echo ======================================================
echo   [GachaTrip] Stopping running server processes...
echo ======================================================
echo.

echo 1. Stopping Backend (Port 8080)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do (
    taskkill /F /PID %%a > nul 2>&1
)

echo 2. Stopping Frontend (Port 5173)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    taskkill /F /PID %%a > nul 2>&1
)

echo.
echo ======================================================
echo   All servers have been stopped safely.
echo ======================================================
echo.
pause