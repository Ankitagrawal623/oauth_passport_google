# oauth_passport_google

Create an Application -

Before using passport-google-oauth20, you must register an application with Google. If you have not already done so, a new project can be created in the Google Developers Console. Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

Strategy -

The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The client ID and secret obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a verify callback, which receives the access token and optional refresh token, as well as profile which contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.

Authenticate Requests -

Use passport.authenticate(), specifying the 'google' strategy, to authenticate requests.

Then I have used mongoDB database to store the name and email of the user in the database .

INSTRUCTIONS -

The Web page is running on local host port 3000 . At the home page there is the UI of login/register button of google auth . By clicking to it we will be redirected to google auth page where we can choose our google account to login . Then if our login is succesfull we will be redirected to a success page which will give the information of user that is his/her login id , email address , name and atlast profile picture . Then there is a logout butten that will logout of our session using passport and redirect the app to the homepage . As we click on the login button if the login is successfull then the credentials of the user will go to be saved in mongoDB database .
