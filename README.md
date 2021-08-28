# Zipline Image Photo System (ZIPS)

## Description

This is a multipart camera system designed for a zip line adventure park. The system includes a Raspberry pi hooked up to a webcam and a camera module. The webcam watches a zipline and runs motion detection software. When someone zips across the line, the webcam will trigger a picture to be taken. The picture is then uploaded to AWS by the raspberry pi and posted to a database on my website (www.bzt.photos). On the website, guests can view and purchase their photos. There is an Admin part of the website as well, where staff can manage the camera, the pictures and the orders.

![Here is a picture of the Raspberry Pi]("Camera Setup")(https://ibb.co/4N3WfRS)


Because this project has a few moving components, the best way to see the application in action is to [view this demo](https://www.youtube.com/watch?v=Ei-ZUtdrTKw)
To view the other required software that runs on the Raspbery Pi, see [this repo](https://github.com/Mitchellscot/zips-pi-server)

### Prerequisites

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
