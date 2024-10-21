# Interacto-APIs

 authRouter
 - POST /signup 
 - POST /login
 - POST /logout
 
 profileRouter
 - GET /profile/view
 - PATCH /profile/edit 
 - PATCH /profile/

 connectionRequestRouter
 - POST /request/send/interested/:userID
 - POST /request/send/ignored/:userID
 - POST /request/send/accepted/:requestID
 - POST POST /request/send/rejected/:rejectID

 userRouter
 - GET /user/connections 
 - GET /user/requestes/received
 - GET /user/feed - gets u the profile of other users

  Status: ignore, interested, accepted, rejected



