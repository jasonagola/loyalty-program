# loyalty_program

## About
This is a simple "check-in" screen for people who attend a weekly Sunday casual bike ride.  "Check-in" is only open during the hour before the ride is scheduled to start and is recorded in a MySQL relational database that serves other functions at the bike shop. All customer sign up and information is cross kept in Square's customer directory.  Cron jobs run at the end of ride days and at the end of the month to consolidate "check-in" data and matches customers into customer groups.  Each "check-in" is worth 5% discount accumulating over the course of a month and then assigns a group attribute through the Square API.  This can be used for monthly rewards coupons based on attendance.  

## Technologies
* React
* Redux
* Node.js
* Express.js
* MySQL
* Square API

## Roadmap
- [ ] Add control page for ease of use and for manipulation of Check-In times/Dynamic Rewards Etc. 
- [ ] Add dynamic rewards for different values on different days i.e Benefit Rides, Non-traditional or event attendance.
    - [ ] Temperature Based Bonus
    - [ ] Time Manipulation
    - [ ] Discount Value Manipulation
- [ ] Email update with current rewards accumulation
- [ ] Welcome email for sign up and resource dispersal


