start "Backend - Node" cmd /c "cd backend && npm install && npm run migration:run"

start "Frontend - Vue" cmd /c "cd frontend && npm install"

start "Frontend Remote - Vue" cmd /c "cd frontend-remote && npm install"
