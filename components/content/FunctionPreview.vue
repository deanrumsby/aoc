<script setup lang="ts">
interface Params {
  label: string
  type: 'textarea' | 'text' | 'number'
}

const { fn, mod, params } = defineProps<{
  fn: string
  mod: string
  params: Params[]
}>()

const importedFunction = import.meta.glob('@/utils/**/*', {
  eager: true
})[`/utils/${mod}.ts`][fn]

const args = ref(new Array(params.length).fill(null))

const output = computed(() => {
  if (args.value.some(arg => arg === null || arg === undefined)) {
    return null
  }
  return importedFunction(...args.value)
})
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-0 py-0 sm:p-0',
        base: 'mb-[-24px]'
      },
      footer: {
        base: 'grid grid-cols-2'
      }
    }"
  >
    <slot name="definition" />
    <template #footer>
      <div class="col-span-1">
        <UFormGroup
          v-for="(param, index) in params"
          :key="index"
          :label="param.label"
          class="mb-2"
        >
          <UTextarea
            v-if="param.type === 'textarea'"
            v-model="args[index]"
            placeholder="Try typing some input..."
          />
          <UInput
            v-else-if="param.type === 'text'"
            v-model="args[index]"
            placeholder="Try typing some input..."
          />
          <UInput
            v-else-if="param.type === 'number'"
            v-model="args[index]"
            type="number"
          />
        </UFormGroup>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        {{ output ?? '&nbsp;' }}
      </div>
    </template>
  </UCard>
</template>
