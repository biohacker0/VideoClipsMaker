[Watch the App in Action](https://github.com/biohacker0) (Click to watch the video working of the app)

This project is a web-based clip maker that allows users to upload a video, set start and end times using sliders, and create video clips with custom timings.

## Quick Start

```bash
# Install dependencies server/client
npm install
cd client
npm install

# Serve on localhost:3000
goto root folder
npm run dev
```

also put your mongoURI in the default.json file in the db folder, located in root

# Clip Maker Project

This project is a web-based clip maker that allows users to upload a video, set start and end times using sliders, and create video clips with custom timings.

## Features

1. **Video Upload**: Users can upload a video file from their local device.

2. **Slider Controls**: The application features two slider components from Material-UI (MUI) to control start and end times of the video clip. These sliders allow users to precisely select the desired clip duration.

3. **Precision Scales**: There are two precision scales available:
    - The first scale works in seconds, allowing users to set the clip's start and end times accurately in seconds.
    - The second scale works in milliseconds, providing even finer control over clip timings.

4. **Video Rendering**: After uploading a video, the selected video is rendered on the screen, and users can preview the video before making any clips.

5. **Clip Creation**: Users can enter a clip name and click the "Start" button to initiate the clip creation process.

6. **FFmpeg Integration**: The project utilizes FFmpeg, a powerful multimedia framework, to create video clips based on the selected start and end times.

## How to Use

Technologies Used
React: The front-end of the application is built using the React JavaScript library.

Node.js: The back-end server is developed using Node.js.

MongoDB: MongoDB is used as the database for storing user data or clip information if required.

FFmpeg: FFmpeg is used to handle video processing and clip creation.

Material-UI: Material-UI components are used for creating the slider controls and maintaining a consistent UI.


