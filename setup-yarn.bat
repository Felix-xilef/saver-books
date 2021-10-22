start "Backend - Node" cmd /c "cd backend && yarn && yarn migration:run"

start "Frontend - Vue" cmd /c "cd frontend && yarn"

start "Frontend Remote - Vue" cmd /c "cd frontend-remote && yarn"
