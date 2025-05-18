# DevTinder API List

## authRouter
- POST /signup
- POST /login
- POST /logout


## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password   // For forgot password API

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/requests/recieved
- GET /user/connections
- GET /user/feed



status: interested, ignored, accepted, rejected