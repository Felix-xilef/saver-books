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

/* App CSS Variables */
:root {
  --light-gray: rgba(128, 128, 128, 0.247);
  --dark-purple: rgba(80, 38, 200, 0.502);

  --gradient-blue: linear-gradient(90deg, #0063d8 0%, #5ea8ff 100%);
  --gradient-green: linear-gradient(90deg, #10c200 0%, #6ae667 100%);
  --gradient-red: linear-gradient(
    90deg,
    rgba(105, 211, 22, 0.927083) 0.01%,
    #5ec20f 0.02%,
    #ff0000 0.03%,
    #ff574d 100%
  );

  --transition-duration: 300ms;
}

/* App Global Style */
#app {
  font-family: "Roboto", sans-serif;
}

html, body {
  padding: 0;
  margin: 0;
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

select, input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

.backgroundGradientPurple {
  background: linear-gradient(
    90deg,
    rgba(40, 75, 255, 0.75) 0%,
    rgba(153, 73, 255, 0.75) 100%
  );
}

.backgroundGradientDisabled {
  background: linear-gradient(90deg, #bbbbbb 0%, #dddddd 100%);
}

.backgroundGradientBlue:not(.outlinedOnHover) {
  background: var(--gradient-blue);
}

.backgroundGradientGreen:not(.outlinedOnHover) {
  background: var(--gradient-green);
}

.backgroundGradientRed:not(.outlinedOnHover) {
  background: var(--gradient-red);
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

/* gradient button that tunrs outlined when hovered */
.outlinedOnHover {
  position: relative;
  background-clip: padding-box;
  border: solid 3px transparent;
}

.outlinedOnHover::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -3px;
  border-radius: inherit;
}

.outlinedOnHover.backgroundGradientGreen::before {
  background: var(--gradient-green);
}

.outlinedOnHover.backgroundGradientBlue::before {
  background: var(--gradient-blue);
}

.outlinedOnHover.backgroundGradientRed::before {
  background: var(--gradient-red);
}

.outlinedOnHover:hover {
  background-color: white;
}

.outlinedOnHover.backgroundGradientGreen:hover p {
  background: var(--gradient-green);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.outlinedOnHover.backgroundGradientBlue:hover p {
  background: var(--gradient-blue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.outlinedOnHover.backgroundGradientRed:hover p {
  background: var(--gradient-red);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
