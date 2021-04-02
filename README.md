# Zipline Image Photo System (ZIPS)

## Description

_Development Duration: 2 Week Sprint_

This project was designed to be an alternative revenue stream for an existing adventure park. There are a number of required working parts in order for it to work in addition to this main repo:

- A Raspberry Pi HQ Camera, Raspberry Pi computer with Node and Motion installed.
- An Amazon Web Services account.
- It is assumed that the camera would operate on the local network of the business, though the main website (this repo) would be deployed.
- A computer running the gallery view in the gift shop or sign up area.
- A computer for a staff member to send off the pictures after payment has been made.

Because this project has a few mobing components, the best way to see the application in action is to [view this demo](https://www.youtube.com/watch?v=Ei-ZUtdrTKw)
To view the other required software that runs on the Raspbery Pi, see [this repo](https://github.com/Mitchellscot/zips-pi-server)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Motion](https://motion-project.github.io/)
- [Postgres](https://www.postgresql.org/download/)

## Usage
The critical component to this application is getting the R-Pi camera to activate on motion detection. This is done through the config file that the motion detection software uses. Every location would have different configuration requirements, so it's best to familiarize yourself with the documentation if you will be setting it up: [Motion docs](https://motion-project.github.io/motion_guide.html).

After set up, the flow works as follows:

1. Guests ride on the zip line and pictures are taken automatically
2. After the tour, the guests view the gallery and chose their photos. They enter their contact information and place an order
3. After an order is placed, payment would have to be made at the front desk or register. There is no way to accept payment through the application.
4. The front desk person would then go to the admin page on a computer behind the front desk and confirm payment has been made, and an email would be sent that includes all of the photos from their order.

There are seperate sections to manage and search through the orders and the pictures. There are additional instructions on managing the photos in the pictures section.
There is also a tab to manage the camera and manually take a picture if needed.
Finally, there is a section to edit the email that gets sent out to the guests as well.

## Built With

- AWS Simple Email Storage
- AWS S3 (for image storage)
- Bootstrap
- Node / Express
- Postgres
- React
- Redux
- Simple React Lightbox
- Sweetalerts

## Acknowledgement
This was my solo project for [Emerging Digital Academy](https://www.emergingacademy.org/) 

## Support
If you have suggestions or questions, please email me at Mitchellscott@me.com
