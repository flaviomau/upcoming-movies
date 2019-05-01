# upcoming-movies
Upcoming Movies web app

# database - docker container
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('movies').createUser({user: 'upcomingAppAdmin', pwd: 'moviesAppAdmin', roles:[{role:'readWrite', db:'movies'}]})"

