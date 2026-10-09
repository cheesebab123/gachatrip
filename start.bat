@echo off
title GachaTrip Launcher

echo ======================================================
echo   [GachaTrip] Starting Backend and Frontend Servers...
echo   (H2 Virtual Local Database enabled)
echo ======================================================
echo.

set "BASE_DIR=%~dp0"

if exist "C:\Program Files\Java\jdk21" (
    set "JAVA_HOME=C:\Program Files\Java\jdk21"
    set "PATH=C:\Program Files\Java\jdk21\bin;%PATH%"
)

echo [1/2] Starting Spring Boot Backend (Port 8080)...
start "GachaTrip Backend (Spring Boot 8080)" cmd /k "cd /d %BASE_DIR%backend && gradlew.bat bootRun"

echo [2/2] Starting Vite Frontend (Port 5173)...
start "GachaTrip Frontend (Vite 5173)" cmd /k "cd /d %BASE_DIR%frontend && npm run dev"

echo.
echo ======================================================
echo   Servers started in background console windows!
echo   - Frontend : http://localhost:5173
echo   - Backend  : http://localhost:8080
echo   - H2 DB    : http://localhost:8080/h2-console
echo.
echo   * To stop servers, run stop.bat
echo ======================================================
echo.
pause