# Zipline Image Photo System (ZIPS)

[![Login page](/demo-pics/login-page.jpg "Login Page")](https://ibb.co/dDxX1R9)
(Yes that is me in the picture)

## Description

This is a multipart camera system designed for a zip line adventure park. The system includes a Raspberry pi hooked up to a webcam and a camera module. The webcam watches a zipline and runs motion detection software. When someone zips across the line, the webcam will trigger a picture to be taken. The picture is then uploaded to AWS by the raspberry pi and posted to a database on my website (https://www.bzt.photos). On the website, guests can view and purchase their photos. There is an Admin part of the website as well, where staff can manage the camera, the pictures and the orders.

## Usage

Here is the camera mounted on the zip line tower (on the pole to the right):

[![zip-tower](/demo-pics/camera-setup.JPG "Camera Setup")](https://ibb.co/ncv4Br9)

Here is the raspberry pi set up. You can see the webcam mounted on top of the HQ Camera, which is connected to the computer. This camera runs on Wifi, uploading the images to AWS. The repo for the code that runs on the camera can be found at [this repo](https://github.com/Mitchellscot/zips-pi-server).

[![R-pi](/demo-pics/raspberry-pi.JPG "Camera Setup")](https://ibb.co/4N3WfRS)

After the guests are done with the zip line tour, they can view the photos on a kiosk at the gift shop. here is a view of the photos that they would browse:

[![gallery](/demo-pics/gallery-photos.jpg "kiosk")](https://ibb.co/JqKqqbC)

They can even click on the phot and inspect the the picture in detail. A watermark has been added to prevent people from taking pictures of the screen:

[![gallery-detail](/demo-pics/gallery-photo.jpg "picture detail")](https://ibb.co/WDgKyfc)

After that they can create an order for the photos by putting in their name and email address. The price of the pictures is displayed but the application does not handle payment. The idea is the guest would enter their information and create an order, then they would walk up to the front desk and tell them they placed an order, and then be rung up at the cash register. 

[![Checkout](/demo-pics/checkout.jpg "Checkout screen")](https://ibb.co/cDQn220)

After staff recieve payment, they then head to the orders scren and send an email containing the pictures to the guest. This screen provides a search for orders based on name or date and has buttons for each order that send photos, allow you to edit the orders, view the pictures the guests ordered, or delete the photos.

[![Orders](/demo-pics/admin-orders.jpg "Orders screen")](https://ibb.co/Mnr1TJc)

The guest than recieves links for the pictures they purchased in their email:

[![Email](/demo-pics/email-example.jpg "Orders screen")](https://ibb.co/Sm54NT5)

By default the kiosk only displays pictures that are three hours old. This is to prevent the kiosk screen from being cluttered with photos. Staff can add or remove photos from the gallery through the picture manager as well. The picture manager provides a way to search the photos by date, view them in detail, and add or remove them to the gallery. instructions for this screen are provided with the question mark icon.

[![Picture Manager](/demo-pics/admin-photos.jpg "Picture Manager screen")](https://ibb.co/5RvQ22H)

The application also provides a way for you to view what the camera is viewing through the webcam. This page allows you to set the sensitivity of the motion detection software, start or pause motion detection (by default it only runs between 9:30 and 5:30), or manually take a picture. Note: the webcam is seperate from the camera that takes pictures. The webcam only detects motion, while the R-PI HQ Camera is what takes the pictures.

[![Camera Manager](/demo-pics/camera-settings.jpg "Picture Manager screen")](https://ibb.co/FYfD31D)

There is also an account settings page that lets you change the password or set the price. You can see there is a guest password... that is so that guests can view the photos when they are not in the gift shop as some people call after their tour and want to see the pictures from the day they went. This allows us to provide a link to the application while keeping the photos secure and accessible.

[![Admin Settings](/demo-pics/admin-settings.jpg "admin settings screen")](https://ibb.co/3kwCsWt)

Finally, the email can be edited here as well.

[![Email Settings](/demo-pics/email-settings.jpg "admin settings screen")](https://ibb.co/swJbK3R)

This project was originally my solo project for a javascript bootcamp I did over the winter of 20-21. You can [view the presentaion if you like.](https://www.youtube.com/watch?v=Ei-ZUtdrTKw)

## Built With

- Node
- React + Redux
- Postgres
- Bootstrap
- AWS Simple Email Storage
- AWS S3 (for image storage)
- Raspberry Pi with HQ Camera installed running [Motion](https://motion-project.github.io/), along with a cheap USB Camera
- Project is deployed to Heroku

The cost for all the parts was a little less than $300.

## Acknowledgement
This was my solo project for [Emerging Digital Academy](https://www.emergingacademy.org/) 

## Support
If you have suggestions or questions of if you are interested in having the camera installed at your site, please email me at Mitchellscott@me.com
