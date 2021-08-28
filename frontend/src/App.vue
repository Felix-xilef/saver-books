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

/* App Colors */
:root {
  --light-gray: rgba(128, 128, 128, 0.247);
  --dark-purple: rgba(80, 38, 200, 0.502);
}


/* App Global Style */
#app {
  font-family: "Roboto", sans-serif;
}

html,
body {
  padding: 0;
  margin: 0;
}

select, input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
  padding: 0;
  background: var(--light-gray);
}

::-webkit-scrollbar-thumb {
  margin: 0;
  background: linear-gradient(
    0deg,
    rgba(40, 75, 255, 0.75) 0%,
    rgba(153, 73, 255, 0.75) 100%
  );
}

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
  border: 3px solid var(--dark-purple);
}

.backgrounLightGray {
  background: var(--light-gray);
}

.form-control,
.form-select {
  border-radius: 20px;
}

/* layout classes: */
.bd-layout {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: "sidebar main";
  grid-template-columns: 1fr 3fr;
}

.bd-sidebar {
  grid-area: sidebar;
}
</style>
