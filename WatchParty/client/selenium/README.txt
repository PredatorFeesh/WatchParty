To run selenium test, install the following:
Python3 
Selenium 

Then download the web driver you are going to use to automate the test; in the original script I used chrome."https://www.selenium.dev/downloads/" Scroll down to "Platforms Supported by Selenium". Make sure the browser version matches the one you currently use. 

In line 9 of the script change the executable path to the web driver you have downloaded. 

Go the WatchParty/WatchParty/Client and run npm start

Ready to Run test: 
Head to the directory where test is installed and run the following command

Python3 -m unittest movieResultTest.py

DONE :) 