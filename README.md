Apr 24 2024

Welcome to the Revolution Software Developer I Coding Challenge!

You'll want to proceed roughly as follows:

* npm i

* export VITE_REV_CANDIDATE_API_URL="https://puttheurlhere"
* export VITE_REV_CANDIDATE_BEARER_TOKEN="the_token_from_the_email"

* npm run dev

* Code your solution for the routing challenge!

* npm run build

* Deploy your solution somewhere! (a free service that is pretty easy is render.com but feel free to use what you like)

* Send the published URL to mpekar@revolution.company or through the endpoint:

POST /api/challenge-solution-url

... with your solution URL as the request body

e.g. 

curl -H "Authorization: Bearer YOUR_TOKEN" -d "YOUR_SOLUTION_URL" -X POST https://thedomain.com/api/challenge-solution-url

* Confirm that your solution was received:

curl -H "Authorization: Bearer YOUR_TOKEN" -d "YOUR_SOLUTION_URL" https://thedomain.com/api/challenge-solution-url

* Contact for any questions: mpekar@revolutioncompany.com
