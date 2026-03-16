Campus MacBook Raffle Website
Product Requirements Document
1. Project Overview
This website will allow students to purchase raffle tickets online for a campus-wide raffle draw where the grand prize is a MacBook.
The platform must:
●	Sell numbered raffle tickets

●	Process payments online

●	Automatically assign ticket numbers

●	Store buyer information

●	Allow administrators to manage tickets

●	Support a live digital raffle draw

Grand prize example: Apple MacBook Air (M2, 13-inch)
2. Core User Flow
Step 1 — Landing Page
Visitors arrive on the raffle homepage.
Page should show:
●	Prize (MacBook image)

●	Ticket price: ₦2,000

●	Total tickets available

●	Tickets remaining

●	Countdown to raffle draw

●	Buy Ticket button

Example sections:
●	Hero section (MacBook + headline)

●	Prize details

●	How it works

●	Buy ticket section

●	FAQs

3. Ticket Purchase System
Ticket Price
₦2,000 per ticket.
Purchase Options
Allow buyers to choose:
●	1 Ticket

●	3 Tickets

●	5 Tickets

●	Custom quantity

System must automatically calculate price.
Example:
Tickets	Price
1	₦2,000
5	₦9,000
10	₦18,000
i.e. every multiple of 5 gives 1,000 discount	
________________________________________
4. Payment Integration
Integrate with Nigerian payment gateway:
Recommended:
●	Paystack

After payment confirmation:
●	Ticket(s) generated automatically.

________________________________________
5. Ticket Generation System
Each ticket must have a unique number.
Example:
0001
0002
0003
...
1000
When a user buys multiple tickets:
●	System randomly assigns available numbers.

Example purchase:
User buys 3 tickets
They receive:
Ticket #034
Ticket #287
Ticket #412
These numbers must also be stored in the database.
________________________________________
6. User Information Collection
During purchase collect:
Required fields:
●	Full Name

●	Phone Number

●	Email Address

●	Department (optional)

●	Level (optional)

All data stored in admin dashboard.
7. Ticket Confirmation
After payment:
User should receive:
On-screen confirmation
Display ticket numbers.
Example:
"You have successfully purchased 3 tickets"
Ticket numbers:
●	034

●	287

●	412

Email confirmation
Send ticket numbers to email.
8. Admin Dashboard
Admin dashboard must include:
Ticket Overview
Display:
●	Total tickets available

●	Tickets sold

●	Tickets remaining

●	Total revenue

Ticket Database
Admin should see table:
Ticket Number	Name	Phone	Email	Purchase Date
Admin should be able to:
●	Search tickets

●	Export CSV

●	View buyers

9. Draw System (Digital Randomizer)
Admin dashboard must include raffle draw tool.
Features:
Admin enters:
Minimum: 1
Maximum: Total tickets sold
System generates random number.
Example:
Random number generated:
347
System automatically pulls ticket owner.
Display:
Winner: John Doe
Ticket: #347
Phone: 080xxxx
Must support projector display for live event.
10. Anti-Fraud / Transparency Features
Important:
●	Ticket numbers cannot be edited after purchase

●	Ticket allocation must be automatic

●	Payment must be confirmed before ticket assignment

Admin cannot manually assign winning ticket.
Random generator must be true random.
11. Ticket Limit Logic
Example setup:
Maximum tickets:
2000
Once sold out:
 Website shows:
"SOLD OUT"
Purchase button disabled.
12. Countdown Timer
Show countdown to draw date.
Example:
Raffle Draw In:
12 Days
6 Hours
20 Minutes
This creates urgency.
13. Mobile Optimization
Most students will buy on phone.
Website must be:
●	Mobile first

●	Fast loading

●	Simple checkout

14. Security Requirements
●	HTTPS required

●	Payment gateway security

●	Protect ticket database

●	Admin login authentication

15. Optional Features (Nice to Have)

Live Ticket Sales Counter (Homepage)
The website should display a real-time ticket sales counter so users can see how many tickets have been sold and how many remain. This helps create urgency and encourages faster purchases.
Display on Homepage
The homepage should visibly show:
●	Total tickets available

●	Tickets sold

●	Tickets remaining

Example display:
Total Tickets: 500
Tickets Sold: 372
Tickets Remaining: 128

In addition to numbers, include a visual progress bar to show how close the raffle is to selling out.
Example:
[████████████████░░░░]
74% SOLD
The progress bar should update automatically as tickets are purchased.
Real-Time Updates
The counter must update automatically when new tickets are purchased.
Two acceptable implementations:
1.	Live updates via backend subscription (preferred)
 Updates instantly when a purchase is confirmed.

2.	Auto-refresh every 10–20 seconds
 Pulls updated ticket count from the database.
Data Source
The counter must pull data from the raffle ticket database.
Fields needed:
●	total_tickets

●	tickets_sold

●	tickets_remaining

Example logic:
tickets_remaining = total_tickets - tickets_sold

Sold-Out Logic
If all tickets are sold:
●	Display SOLD OUT

●	Disable purchase button

●	Show message:

All raffle tickets have been sold.
Thank you for participating.
Mobile Optimization
The counter and progress bar must display clearly on:
●	Mobile phones

●	Tablets

●	Desktop

Most users will access the site on mobile devices.
Placement on Website
The Live Ticket Counter should appear in three locations:
1.	Hero section on the homepage

2.	Ticket purchase page

3.	Checkout page

This ensures buyers always see ticket availability.

16. Deliverables
Developer must deliver:
●	Fully functional website

●	Admin dashboard

●	Payment integration

●	Ticket randomizer system

●	Deployment
