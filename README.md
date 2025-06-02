
# ⚙️ Manual Setup (POS Aplication)

## 🔧 1. Backend Setup (Port 4000)
#### 1. Go to the backend directory
```bash
  cd backend
```
## 2. Update the .env file.
```bash
    DB_HOST = localhost
    DB_PORT = 5432
    DB_USERNAME = your postgres username
    DB_PASSWORD = your postgres password
    DB_DATABASE = db name
```
## 4. Update node.js version.
```bash
  nvm use 20.18.1
```
## 5. install dependencies.
```bash
  npm install
```

## 6. migration:generate
```bash
  npm run migration:generate -- db/migrations/add_any_name   
```

## 7. run the migration
```bash
  npm run migration:run              
```
## 8. Start the development server:
```bash
  npm run start:dev              
```

## 🔧 1. Frontend Setup (Port 5173)
#### 1. Go to the frontend directory
```bash
  cd frontend             
```
## 2. Update node.js version.
```bash
  nvm use 20.18.1
```
## 3. install dependencies.
```bash
  npm install
```
## 4. Start the development server:
```bash
npm run start
```

# ✅ Final Testing
Once both servers are up and running, test the project at:

.frontend(http://localhost:5173/)   
.backend(http://localhost:4000/api/v1)
















