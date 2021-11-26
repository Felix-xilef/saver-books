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
  --on-hover-gray: #dbdbdb9d;
  --light-gray: rgba(128, 128, 128, 0.247);
  --dark-purple: rgba(80, 38, 200, 0.502);
  --darker-purple: rgba(81, 38, 200, 0.1);
  --blue: #0063d8;
  --green: #10c200;
  --red: #ff0000;
  --yellow: #ee9e26;

  --gradient-gray: linear-gradient(90deg, #bbbbbb 0%, #dddddd 100%);
  --gradient-blue: linear-gradient(90deg, var(--blue) 0%, #5ea8ff 100%);
  --gradient-green: linear-gradient(90deg, var(--green) 0%, #6ae667 100%);
  --gradient-red: linear-gradient(90deg, var(--red) 0%, #ff574d 100%);

  --transition-duration: 300ms;
}

/* App Global Style */
#app {
  font-family: "Roboto", sans-serif;
  caret-color: var(--dark-purple);
}

html, body {
  padding: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 8px;
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

select::-webkit-scrollbar-thumb {
  background-color: rgba(141, 119, 255);
}

.is-valid {
  caret-color: var(--bs-success);
}

.is-invalid {
  caret-color: var(--bs-danger);
}

select, input[type="date"]::-webkit-calendar-picker-indicator, input[type="file"], input[type="file"]::-webkit-file-upload-button {
  cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="black" fill-opacity="0.65" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
}

.backgroundGradientPurple {
  background: linear-gradient(
    90deg,
    rgba(40, 75, 255, 0.75) 0%,
    rgba(153, 73, 255, 0.75) 100%
  );
}

.backgroundGradientDisabled {
  background: var(--gradient-gray);
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
  border: solid 3px;
}

.outlinedOnHover::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -3px;
  border-radius: inherit;
}

.outlinedOnHover p {
  position: relative;
  margin: 0;
}

.outlinedOnHover.backgroundGradientGreen {
  border-color: var(--green);
}
.outlinedOnHover.backgroundGradientGreen::before {
  background: var(--gradient-green);
}

.outlinedOnHover.backgroundGradientBlue {
  border-color: var(--blue);
}
.outlinedOnHover.backgroundGradientBlue::before {
  background: var(--gradient-blue);
}

.outlinedOnHover.backgroundGradientRed {
  border-color: var(--red);
}
.outlinedOnHover.backgroundGradientRed::before {
  background: var(--gradient-red);
}

.outlinedOnHover.backgroundGradientDisabled::before {
  background: var(--gradient-gray);
}

.outlinedOnHover:hover::before {
  background: transparent;
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
/* END gradient button that tunrs outlined when hovered */

/* Round float button */
.roundFloat {
  height: 42px;
  width: 42px;
  border-radius: 50%;
  color: white;
}

.roundFloat:enabled {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.roundFloat:disabled {
  border: solid 1px rgba(0, 0, 0, 0.25);
}

.roundFloat:hover:enabled {
  color: rgb(211, 211, 211);
  opacity: 0.85;
}
/* END Round float button */
</style>
