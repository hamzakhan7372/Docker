
// MONGODB ------
//the mongodb conatiner and the backend is in the same network so we don't need to publish the port - 'mongodb://mongodb:27017/course-goals'
//docker run --name mongodb --network node-network mongo:4.4.22

//LINKED - mongo//docker run 
    --rm 
    -p 27017:27017 
    -v mongo_volume:/data/db 
    --network my-network 
    --name mongodb 
    -e MONGO_INITDB_ROOT_USERNAME=hamza 
    -e MONGO_INITDB_ROOT_PASSWORD=12345  
    mongo:4.4.22

--------------------------


// BACKEND -------
//docker run -p 80:80 --name backend_container --network node-network backend:v1

//docker run 
    -p 80:80 
    --rm 
    --name backend-container 
    -v backend_logs:/app/logs 
    -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/backend/:/app/ 
    -v /app/node_modules 
    --network my-network 
    backend.ew:v1

//LINKED - backend//docker run -p 80:80 --rm --name backend-container -v backend_logs:/app/logs -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/backend/:/app/ -v /app/node_modules -e MONGO_USER=hamza -e MONGO_PASS=12345 --network my-network backend.new:v3

--------------------------


// FRONTEND -------
//docker run -it -p 3000:3000 --rm --name frontend_container frontend:v4.ip

//LINKED - frontend//docker run 
    -it 
    -p 3000:3000 
    -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/frontend/src/:/app/src/ 
    --rm 
    --name frontend-container 
    frondend:v1
