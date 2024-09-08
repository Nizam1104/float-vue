<template>
  <div class="float-vue">
    <div
      @click="toggleFloater"
      id="float-vue-trigger"
      :style="{
        width: 'auto',
        height: 'auto',
        right: `${triggerPosition.right}px`,
        bottom: `${triggerPosition.bottom}px`,
      }"
    >
      <slot name="trigger" />
    </div>
    <div
      v-if="isOpen"
      class="float-content"
      :style="{
        zIndex: props.zIndex,
        width: 'auto',
        height: 'auto',
        right: `${windowX}px`,
        bottom: `${windowY}px`,
      }"
    >
      <div
        v-if="!draggableOptions.enabled"
        class="drag-handle"
        id="float-vue-dragg-handler-default"
        style="background-color: lightgrey; border-radius: 4px;"
      />
      <div>
        <slot name="content" :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

// Add props
const props = defineProps({
  triggerPosition: {
    type: Object,
    default: () => ({ bottom: 40, right: 40 }),
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  draggableOptions: {
    type: Object,
    default: () => ({
      enabled: false,
      bounds: "parent",
      dragHandle: ".drag-handle",
    }),
  },
});

const isOpen = ref(false);
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const customDragHandlerPresent = ref(false);
const windowX = ref(0);
const windowY = ref(0);

const addDragHandler = () => {
  const dragHandler = props.draggableOptions.enabled ? document.getElementById('float-vue-dragg-handler') : document.getElementById('float-vue-dragg-handler-default');
  dragHandler.addEventListener('mousedown', startDrag);
  dragHandler.addEventListener('mousemove', drag);
  dragHandler.addEventListener('mouseup', stopDrag);
};

const calculateWindowPosition = () => {
  if(windowX.value !== 0 || windowY.value !== 0) return;
  const triggerRect = document.getElementById('float-vue-trigger').getBoundingClientRect();
  windowX.value = props.triggerPosition.right;
  windowY.value = props.triggerPosition.bottom + triggerRect.height;
};

const toggleFloater = async () => {
  isOpen.value = !isOpen.value;
  await nextTick();
  calculateWindowPosition();
  addDragHandler();
};

const startDrag = (event) => {
  event.preventDefault();
  const dragElement = customDragHandlerPresent.value 
    ? document.getElementById('float-vue-dragg-handler')
    : event.target;

  if (event.target !== dragElement) return;

  isDragging.value = true;
  dragOffset.value = {
    x: event.clientX + windowX.value,
    y: event.clientY + windowY.value,
  };
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
};

const drag = (event) => {
  if (!isDragging.value) return;
  windowX.value = dragOffset.value.x - event.clientX;
  windowY.value = dragOffset.value.y - event.clientY;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
};

const close = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.float-vue {
  position: relative;
}

#float-vue-trigger {
  cursor: pointer;
  position: fixed;
}

.float-content {
  position: fixed;
  overflow: auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.drag-handle {
  cursor: move;
  height: 12px;
  background-color: #f0f0f0;
}
</style>
