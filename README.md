# project_1

Description: 
We created an app that allows the user to search for campgrounds inside national parks.  We have provided six different amenities that we thought would be helpful. We are also linking weather data that is derived from the location of the national park and the dates provided by the user.

Motivation:
We wanted to create an app for people like us who wanted a one stop shop for campgrounds around the country. Currently, there is no easy way to search for campgrounds within national parks.  We also found that on the NPS website, we couldn’t search for them based on available amenities.  Additionally, we were frustrated with how inefficient it was to compile the information on our own. Camping is such a weather dependent activity, and searching for the weather in addition to specific campground descriptions added even more effort.

Results:
Through several concurrent API calls, we were able to get all of the information we were looking for in one easy to access location.  We also provided links directly to the NPS website for even more information and any current trail information or severe weather alerts.

Team efforts:
We decided to delegate the work, at least initially, by separating the HTML/CSS and the Javascript.

Carolyn tackled the HTML and CSS with bootstrap/bootswatch and ensured full responsiveness. She also looked into new libraries/technologies for us and linked in the Twitter typeahead library and did some form validation (through the use of a date picker). 

Steve and Charlie were responsible for setting up our APIs and AJAX querries.  

Charlie focused on the national park side, and Steve focused on the weather functionality. For the campgrounds, we had to utilize two NPS api’s, one to take in the name of a national park that spits out an NPS-unique park code, and the second to take in the national park code and spit out all the campgrounds that exist in that park.  

Steve took the location information return from the first NPS ajax call and plugged the latitude and longitude from that response into the dark skies API to get our weather information. He also had to utilize moment.js to convert our date and time formats into workable data.

