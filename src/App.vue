<template>
  <div id="app">
    <div id="background"></div>
    <div id="midground"></div>
    <div id="foreground"></div>
    <img class="logo" src="./assets/img/star-wars-logo.png">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      backgroundStars() {
        // Sets the number of stars we wish to display
        const numStars = 350;
        // For every star we want to display
        for (let i = 0; i < numStars; i++) {
          let star = document.createElement("div");
          star.className = "star";
          var xy = getRandomPosition();
          star.style.top = xy[0] + 'px';
          star.style.left = xy[1] + 'px';
          document.body.append(star);
        }
        // Gets random x, y values based on the size of the container
        function getRandomPosition() {
          var y = window.innerWidth;
          var x = window.innerHeight;
          var randomX = Math.floor(Math.random() * x);
          var randomY = Math.floor(Math.random() * y);
          return [randomX, randomY];
        }
      }
    },
    mounted: function() {
      // this.backgroundStars();
    }
  };
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine"; // Import the theme engine
  @include md-register-theme("default", ( // primary: md-get-palette-color(yellow, A200), // The primary color of your application
  // accent: md-get-palette-color(red, A200), // The accent or secondary color
  primary: #FCDF2B, // The primary color of your brand
  accent: #1a11e8, // The secondary color of your brand
  theme: dark // This can be dark or light
  ));
  @import "~vue-material/dist/theme/all"; // Apply the theme
  @-webkit-keyframes STAR-MOVE {
    from {
      background-position: 5% 5%
    }
    to {
      background-position: 1300% 600%
    }
  }
  #background {
    background: black url(./assets/img/background.png) repeat 5% 5%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    -webkit-animation-name: STAR-MOVE;
    -webkit-animation-duration: 200s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
  }
  #midground {
    background: url(./assets/img/midground.png) repeat 20% 20%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    -webkit-animation-name: STAR-MOVE;
    -webkit-animation-duration: 150s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
  }
  #foreground {
    background: url(./assets/img/foreground.png) repeat 35% 35%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
    -webkit-animation-name: STAR-MOVE;
    -webkit-animation-duration: 100s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
  }
  html {
    background-color: black!important;
    >body {
      margin: 0;
      overflow-x: hidden;
      // background: url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/93NxU-b/realistic-stars-twinkle-in-the-night-sky-loopable_vyotq2pj__F0000.png) repeat;
      // background-size: cover;
      // background-position: top;
      >#app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-bottom: 60px; // margin-top: 60px;
        >.logo {
          display: block;
          margin: 0 auto;
          width: 320px;
          padding-top: 40px;
          margin-bottom: 50px;
          position: relative;
          z-index:300;
        }
      }
      >.star {
        position: absolute;
        width: 1px;
        height: 1px;
        background-color: white;
      }
    }
    button {
      &.md-primary {
        background-color: #FCDF2B!important;
      }
    }
  }
</style>
