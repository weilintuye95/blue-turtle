docker build -t blue-turtle --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" blue-turtle



List of assumptions:
- We have a user table and user-related logic implemented to show how the app backend would operate if there were real users.