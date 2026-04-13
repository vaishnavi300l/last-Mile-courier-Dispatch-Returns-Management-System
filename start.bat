@echo off
echo Starting Courier Dispatch System...

echo Starting Spring Boot Backend...
start cmd /k "cd backend && mvn spring-boot:run"

echo Starting Vite React Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both processes have been launched in separate windows!
pause
