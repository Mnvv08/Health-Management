#!/bin/bash

echo "1. Registering user..."
RES=$(curl -s -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","password":"password123","phone":"1234567890"}')
echo $RES
TOKEN=$(echo $RES | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

echo -e "\n2. Registering same user..."
curl -s -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","password":"password123","phone":"1234567890"}'

echo -e "\n\n3. Logging in with correct credentials..."
curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}'

echo -e "\n\n4. Logging in with wrong password..."
curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"wrongpassword"}'

echo -e "\n\n5. Getting profile with token..."
curl -s -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\n6. Getting profile without token..."
curl -s -X GET http://localhost:5001/api/auth/me
echo ""
