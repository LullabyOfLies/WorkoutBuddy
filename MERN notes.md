----------THIS PROJECT IS CURRENTLY ON HOLD DUE TO THE FACT THAT THE TUTORIAL USED FOR THIS IS 1 YEAR OLD AND IS OUTDATED AND DUE TO PROBLEM 4-------------------------------------


LEARINGS: 
        1. useContext is used to share data from a component to other component, meaning if the `WorkoutContext.jsx` have a variable called 'solution' and the `Home.jsx` wants to use it to update the global state. It won't need to prop drilling meaning passing of the 'variables' to different components. By using  useContext they can share directly by invoking the useContext function. Parameters are useContext(*the function that have the `solution`*) assigned to a variable called useSolutionContext:

        Ex. useSolutionContext = useContext(solutionContext);

        Now, we can use the `solution` from SolutionContext by destructuring it via `useSolutionContext` liked below:

        Ex. {solution} = useSolutionContext;\

        TLDR: useContext: Hook to access the global state from any child component without prop drilling.

        2. useReducer is use to update a state by taking the properies and values passed via `dispatch`. For example, if the state initial value is 0 and the dispatch function have the type called 'INCREMENT' there will be a switch case that will take the 'action.type' and return the state according to it.

        Ex.  dispatch({ type: 'INCREMENT' }); //the dispatch will now be reference to the `useOperationContext`

        //then `useOperationContext` will reference to the `OperationContext` 
        Ex. `useOperationContext` = useContext(OperationContext)

        //After that it will be taken to the state manangement code that will go to the useReducer function and return a state based on the `action.type`:


        Ex.   export const workoutsReducer = (state, action) =>{
       switch (action.type){
              case 'SET_WORKOUTS' :
                     return {
                            workouts: action.payload
                     }
       }
        
        const [state, dispatch] = useReducer(Operation Reducer, {
              workouts: null
       })


        //Then the state which is the `workouts` is gonna be updated and used back in the frontend logic to be outputted.

        TDLR: useReducer: Hook used to manage state transitions in a more structured way, especially for complex state logic.

        3. JWT Token is used for authenticating a user, it is issued by an authentication server and are consumed by the frontend which will grant access to the frontend whatever data it needs by the backend when the backend confirms that the user data is valid.

              3.1. It contains three parts which is the Header, Payload, Signature :
                     a. Header: Contains the Algorithm type for the encoding/decoding the data
                     b. Payload: Contains the non-sensitive information user data (Ex. user id)
                     c. Signature: Hashed Header and Payload all together that is used to verify the token sent to the Authentication Server

              3.2. In MERN Stack, the Payload doesn't traditionally contains the password data. Reasons below:
                     a.  Storing passwords in JWTs can expose them to potential security threats, as JWTs are typically designed to be decoded on the client side.
                     b.  Storing sensitive information like passwords in JWTs exposes them to potential security vulnerabilities, especially if tokens are intercepted.
                     c.  JWTs are often sent with each request, and adding a password would increase the token size, affecting network performance.
                     d.   If passwords are included and they change, it could lead to complications in managing token expirations and renewals.  

              It's not recommended to include sensitive data like passwords directly in JWT payloads. Instead, tokens should carry a unique identifier (like user ID) that can be validated by the server. Sensitive user data, such as passwords, should be securely stored on the server side.

       4. How does authentication and the login/signup logic flow looks like step-by-step in a MERN STACK?

              In a MERN stack using JWTs and hashed passwords, user authentication typically follows these steps:

              1. **User Registration:**
              - User provides registration details, including a username and password.
              - The server hashes the password (commonly using a library like bcrypt) and stores the hashed password along with other user details in the database.

              2. **User Login:**
              - User provides their credentials (username and password).
              - Server validates the credentials.
              - If valid, the server generates a JWT (JSON Web Token) containing a unique identifier for the user (like user ID) and signs it using a secret key.
              - The JWT is sent back to the client.

              3. **Client-side Storage:**
              - The client stores the JWT, commonly in a secure HTTP-only cookie or local storage.

              4. **Subsequent Requests:**
              - For each subsequent authenticated request, the client includes the JWT in the request headers.
              - The server verifies the JWT's signature using the secret key.
              - If the signature is valid, the server extracts the user identifier from the JWT.

              5. **User Retrieval:**
              - The server uses the user identifier to retrieve additional user information from the database if needed.

              6. **Token Expiry:**
              - JWTs often have an expiration time. If a token expires, the client may need to obtain a new token by re-authenticating.

              By storing only a unique identifier in the JWT and keeping the actual user data, including hashed passwords, on the server, this approach provides a good balance between security and efficiency. Even if a JWT is intercepted, an attacker won't have access to the user's password or sensitive data. It's crucial to use secure practices for handling JWTs, such as secure storage and transmission, proper validation, and token expiration management.

PROBLEMS FACED
       Problem 1: MongoDB refusing to let my IP connect
       Solution 1: Go to Network Access Section at the MongoDB then remove all IP address access and re-add it (Access from anywhere)

       Problem 2: If we want to update an document's property but we don't want specify which property due to uncertainty.
       Solution 2: We can use the spread operator (...) to get all the properties that we need to update from the request using the `.`..req.body` to store them in a new object.

       Problem 3: `npm react-router-dom` and `npm react-router` is not working because it's outdated
       Solution 3: always use the latest version = npm i -D react-router-dom@latest

       Problem 4: Data from the API that's from the MongoDB is not being fetched to the frontend because of the code from the net ninja's video is not updated and encountering two problems :
               4.1. JSON not being parsed properly before it can be displayed on the frontend because on the video the JSON can be displayed without being parsed.

               4.2. Cross Origin Resources Sharing's header of ‘Access-Control-Allow-Origin’ missing, meaning the frontend and backend is hosted in different servers or ports and the program is not allowing that. 

       Solution 4: The solution for problems in Problem 4 below:
              4.1. Using a try and catch method in a useEffect, use the useEffect runs it will try to run the axios.get method directly to the URL where the backend is currently hosted which is `http://localhost:3000/api/workouts` and set it's data to the updater function of a useState which is `setWorkouts` to update the main constant called `workouts`. After setting the data from the Database (JSON from the MongoDB) in the useState called `workouts`, we can now output each contents via map.

              4.2. Check if `cors` is installed in the backend using `npm list cors`, if no install. Else, update the `server.js` by requiring `cors` via `const cors = require('cors');` and use it in the app after initializing express as the app via `app.use(cors())` and that's it, you can now freely have access to the database of MongoDB.
        
        Problem 5: The POST METHOD is not working from frontend to backend.
        Solution: Check endpoints use the complete endpoint of `http://localhost:3000/api/workouts`, the incomplete endpoint of '/api/workouts' is not working because when using that it will concat the URL of the frontend to '/api/workouts' and with that being said when the frontend is being hosted at 'localhost:4000' while the server is at 'localhost:3000'. 
