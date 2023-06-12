<template>
  <Error type="403" @error-click="push('/')" />
  <div class="xxx rounded-3xl"></div>
</template>
<script lang="ts" name="Error403" setup>
const { push } = useRouter()
</script>
<style>
.xxx {
  @apply rounded-4xl;
}
</style>
