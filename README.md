docker build -t blue-turtle --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" blue-turtle

Implementation details:

- Since we don't have auth set up, we use React Context to pass our user around, and retrieve that user's data.


Instructions:
- Signing in: Type an existing username to 'sign in' and retrieve your old user chats and history. Type a new username to start an entirely new user profile with new chat history.

- Click the chat button at the bottom to create a new chat



List of assumptions:
- We have a user table and user-related logic implemented to show how the app backend would operate if there were real users. We don't have authentication (as instructed).
- Sidebar will look ugly if we have tons of new chats. However, since you'd still need ~25+ chats to do this, I haven't bothered to make it prettier.
- Sidebar lists chat by date. We can probably do something like what ChatGPT does to summarize each chat into a short phrase. That shouldn't be too hard to do, but I left it out for this demo.