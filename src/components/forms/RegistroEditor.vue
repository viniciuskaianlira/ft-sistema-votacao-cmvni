<template>
  <transition name="modal">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <!-- Modal Container -->
      <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
        <!-- Header -->
        <header class="mb-4 flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </header>
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-for="field in fields" :key="field.name" class="flex flex-col">
            <label :for="field.name" class="mb-1 text-sm font-medium text-gray-700">{{ field.label }}</label>
            <template v-if="field.type === 'select'">
              <select
                v-model="formData[field.name]"
                :id="field.name"
                class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione {{ field.label }}</option>
                <option
                  v-for="option in options[field.name] || []"
                  :key="option[field.optionValue]"
                  :value="option[field.optionValue]"
                >
                  {{ option[field.optionLabel] }}
                </option>
              </select>
            </template>
            <template v-else>
              <input
                v-model="formData[field.name]"
                :type="field.type"
                :id="field.name"
                :placeholder="field.placeholder || ''"
                class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </template>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-end space-x-2 pt-4 border-t">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, watch } from 'vue'
import api from '@/services/api'

// Props
const props = defineProps({$1})
const emit = defineEmits(['saved', 'error', 'update:visible'])

const formData = reactive({})
const options = reactive({})

function closeModal() {
  emit('update:visible', false)
}

async function fetchOptions(field) {
  try {
    const res = await api.get(field.endpoint)
    options[field.name] = res.data
  } catch (err) {
    console.error(`Erro ao buscar opções para ${field.name}`, err)
  }
}

async function loadRecord() {
  if (props.recordId == null) return
  try {
    const res = await api.get(`${props.endpoint}/${props.recordId}`)
    // Extrai o objeto real dentro de data
    const payload = res.data
    const record = Array.isArray(payload.data) ? payload.data[0] : payload.data
    console.log('Registro carregado:', record)
    props.fields.forEach(f => {
      formData[f.name] = record[f.name] ?? ''
    })
  } catch (err) {
    console.error('Erro ao carregar registro', err)
    emit('error', err)
  }
}

async function init() {
  props.fields.forEach(field => {
    formData[field.name] = ''
    if (field.type === 'select') fetchOptions(field)
  })
  await loadRecord()
}

watch(() => props.visible, v => { if (v) init() })
watch(() => props.recordId, id => { if (props.visible && id != null) init() })

async function handleSubmit() {
  try {
    const res = await api.put(`${props.endpoint}/${props.recordId}`, formData)
    emit('saved', res.data)
    closeModal()
  } catch (err) {
    console.error('Erro ao salvar registro', err)
    emit('error', err)
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease }
.modal-enter-from, .modal-leave-to { opacity: 0 }
</style>
