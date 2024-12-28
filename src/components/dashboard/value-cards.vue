<template>
  <div class="col-sm !pr-0 my-2 flex w-full items-center h-auto flex gap-[9px]">
    <div class="!p-[14px] min-h-[60px] min-w-[60px] rounded-[13.75px] bg-[#B0B0B01A] flex justify-center items-center">
      <img v-bind:src="card_image" alt="My SVG Icon" style="width: 32px; height: 32px;" />
    </div>
    <div class="flex flex-col gap-1 w-full">
      <span class="text-sm font-medium font-['Inter']">{{ card_title }}</span>
      <span class="text-2xl	">${{ card_value.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card_image: {
      type: String,
      required: true
    },
    card_title: {
      type: String,
      required: true,
    },
    card_value: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.icon {
  width: 32px !important;
  /* Enforce a fixed width */
  height: 32px !important;
  /* Enforce a fixed height */
  object-fit: contain;
  /* Ensure the SVG scales properly within the bounds */
}
</style>
