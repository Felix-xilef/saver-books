<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Importing font Roboto from Google-Fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

#app {
  font-family: "Roboto", sans-serif;
}

html,
body {
  padding: 0;
  margin: 0;
}
/* 
::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  position: absolute;
} */

.backgroundGradientPurple {
  background: linear-gradient(
    90deg,
    rgba(40, 75, 255, 0.75) 0%,
    rgba(153, 73, 255, 0.75) 100%
  );
}

.backgroundGradientBlue {
  background: linear-gradient(90deg, #0063d8 0%, #5ea8ff 100%);
}

.backgroundGradientDisabled {
  background: linear-gradient(90deg, #bbbbbb 0%, #dddddd 100%);
}

.backgroundGradientRed {
  background: linear-gradient(
    90deg,
    rgba(105, 211, 22, 0.927083) 0.01%,
    #5ec20f 0.02%,
    #ff0000 0.03%,
    #ff574d 100%
  );
}

.backgroundGradientGreen {
  background: linear-gradient(90deg, #10c200 0%, #6ae667 100%);
}

.backgroundLightPurple {
  background: rgba(80, 38, 200, 0.05);
}

.borderPurple {
  border: 3px solid rgba(80, 38, 200, 0.502);
}

.backgrounLightGray {
  background: rgba(128, 128, 128, 0.247);
}

.form-control,
.form-select {
  border-radius: 20px;
}
</style>
