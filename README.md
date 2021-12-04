### Mongodb in docker container/ with replSet
1. cd project_directory
2. Build this Dockerfile

docker build ./ -t mongodb:4.7-replset

3. Run this created image

docker run --name mongodb-replset -p 27017:27017 -d mongodb:4.7-replset

# Connect to database using this URI
# mongodb://localhost:27017/myDB

### build back and front 
1. npm run build

### run back and front /as production
1. npm run start

### run back and front /as development
1. npm run dev
