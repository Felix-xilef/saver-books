wt -p "Fatec" -d ".\backend" --title "Backend - Node" cmd /k "yarn dev" ; split-pane -V -p "Fatec" -d ".\frontend" --title "Frontend - Vue" cmd /k "yarn serve"
