# float-vue

FloatVue is a Vue 3 component that creates a floating, draggable window triggered by a customizable icon.

## Installation

1. Install the package:

```bash
npm install float-vue
```

2. Import the component in your Vue file:

you can simply import the component in your vue file or setup a plugin to use it globally
```javascript
<template>
  <FloatVue 
    :draggableOptions="{ enabled: true }"
    :zIndex="1000" 
    :triggerPosition="{ bottom: 20, right: 20 }"
  >
    <template #trigger>
      <img src="path/to/your/icon.png" alt="Icon" />
    </template>
    <template #content="{ close }">
      <div>
        <p>Hello World</p>
        <button @click="close">Close</button>
      </div>
    </template>
  </FloatVue>
</template>

// triggerPosition is an object with the following properties:
// - bottom: number
// - right: number
// you can use this to position of the trigger icon or button

-- you can setup custom draggable handle to make it more intuitive for the user to drag the float window
-- just add id #float-vue-dragg-handler to the element you want to use as handle
```javascript
