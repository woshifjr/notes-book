<template>
  <div
    class="hy-switch flex-items"
    :class="[checkedStatus ? 'active' : '', props.disabled ? 'hy-switch-disabled' : '']"
    role="switc"
    :aria-checked="checkedStatus"
    :style="props.styled"
  >
    <input v-model="checkedStatus" type="checkbox" true-value="true" false-value="false" />
    <div class="hy-switch-core" @click="checkStatus">
      <span class="hy-switch-action"></span>
    </div>
    <span class="hy-switch-checked-text">{{ checkedStatus ? '开' : '关' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  styled: String,
  disabled: Boolean
});

const emits = defineEmits(['update:modelValue', 'change']);

const checkedStatus = ref(props.modelValue);
watch(
  () => props.modelValue,
  nv => {
    checkedStatus.value = nv;
  }
);

const checkStatus = () => {
  if (props.disabled) return;
  checkedStatus.value = !checkedStatus.value;
  emits('update:modelValue', checkedStatus.value);
  emits('change', checkedStatus.value);
};
</script>

<style lang="less" scoped>
@switchSize: 20px;
@gap: 4px;

.hy-switch {
  position: relative;
  height: @switchSize;

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  &-core {
    border-radius: 10px;
    background-color: @gray-color !important;
    width: 40px;
    height: 100%;
    cursor: pointer;
    transition: background-color 0.4s;

    &:active {
      .hy-switch-action {
        width: @switchSize;
        transition: width 0.4s;
      }
    }
  }

  &-action {
    width: @switchSize - @gap;
    height: @switchSize - @gap;
    background-color: #fff;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    margin-top: -((@switchSize / 2) - (@gap / 2));
    transform: translateX(@gap / 2);
    transition: all 0.4s;
  }

  &-checked-text {
    font-size: 12px;
    margin-left: 4px;
    color: @text-sub-color;
  }
}

.active {
  .hy-switch-core {
    background-color: @success-color !important;
    transition: background-color 0.4s;

    &:active {
      .hy-switch-action {
        width: @switchSize;
        transition: all 0.4s;
        transform: translateX(@switchSize - 4px);
      }
    }
  }

  .hy-switch-action {
    transition: all 0.4s;
    transform: translateX(@switchSize);
  }

  .hy-switch-checked-text {
    color: @success-color !important;
  }
}

.hy-switch-disabled .hy-switch-core {
  cursor: no-drop;

  &:active .hy-switch-action {
    width: 16px !important;
  }
}
</style>
