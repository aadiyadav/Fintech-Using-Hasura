1. Cloning respository:
  git clone https://github.com/aadiyadav/fintech.git
  cd fintech

2. Setting up frontend:
   cd fintech-platform
   npm install
   npm install npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm run dev

3. Setting up the backend (open a new terminal):
   cd platform
   npm install
   npm install nodemon
   npx nodemon index

4. Database setup - Hasura with Docker (Ensure docker desktop is installed and running on your machine) (open a new terminal):
   cd platform
   docker-compose up -d


And you are done!
