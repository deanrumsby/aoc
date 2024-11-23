<script setup lang="ts">
const { fn, mod } = defineProps({
  fn: String,
  mod: String,
  type: String
})

const importedFunction = import.meta.glob('@/utils/**/*', {
  eager: true
})[`/utils/${mod}.ts`][fn]

const input = ref('')
const output = computed(() => importedFunction(input.value))
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-0 py-0 sm:p-0'
      },
      footer: {
        base: 'columns-2'
      }
    }"
  >
    <slot name="definition" />
    <template #footer>
      <UTextarea
        v-if="type === 'textarea'"
        v-model="input"
      />
      <UInput
        v-else
        v-model="input"
        placeholder="Try typing some input..."
      />
      <div class="flex justify-center">
        {{ output }}
      </div>
    </template>
  </UCard>
</template>
