# Pure Weather

Pure Weather was built using web technologies (HTML, CSS, Javascript) and uses the Open Weather Map API to fetch weather data, it allows users to add their locations manually or automatically by using the geolocation API, weather data is shown hourly and also daily, weather alerts are also shown when applicable.

The CapacitorJS runtime is used with this application to allow it to be installed onto mobile devices (Android & iOS) as a native application.

The module bundler Vite is used for this application, it helps with using CapacitorJS plugins, this application uses two CapacitorJS plugins: SplashScreen and platform detection, both of these are used from within the global.js file.

## Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites

- Node.js installed ([Download Node.js](https://nodejs.org/))

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/mpmua/pure-weather.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pure-weather
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

### Usage

4. Start the development server:

   ```bash
   npm run dev
   ```

### Build

To build the project for production:

```bash
npm run build
```

### License

This project is licensed under the MIT License.
