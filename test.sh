#test login api
curl  -H "Content-Type: application/json" -X POST -d '{"username":"test","password":"test"}' http://localhost:5000/login
