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

            <!-- Select Field -->
            <template v-if="field.type === 'select'">
              <select
                v-model="formData[field.name]"
                :id="field.name"
                class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione {{ field.label }}</option>
                <option
                  v-for="option in options[field.name] || []"
                  :key="getOptionValue(field, option)"
                  :value="getOptionValue(field, option)"
                >
                  {{ getOptionLabel(field, option) }}
                </option>
              </select>
            </template>

            <!-- Input Field -->
            <template v-else>
              <input
                v-model="formData[field.name]"
                :type="field.type"
                :id="field.name"
                :placeholder="field.placeholder || ''"
                :maxlength="field.maxLength"
                class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <!-- Optional character counter -->
              <div v-if="field.maxLength" class="text-xs text-gray-500 mt-1">
                {{ formData[field.name]?.length || 0 }}/{{ field.maxLength }}
              </div>
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

// Props definition
const props = defineProps({
  visible: Boolean,
  title: String,
  fields: Array,
  endpoint: String,
  recordId: [Number, String]
})
const emit = defineEmits(['saved', 'error', 'update:visible'])

const formData = reactive({})
const options = reactive({})

// Close modal
function closeModal() {
  emit('update:visible', false)
}

// Fetch dynamic options
async function fetchOptions(field) {
  if (!field.optionsEndpoint) return
  try {
    const res = await api.get(field.optionsEndpoint)
    options[field.name] = Array.isArray(res.data.data) ? res.data.data : res.data
  } catch (err) {
    console.error(`Erro ao buscar opções para ${field.name}`, err)
  }
}

// Load record data and populate formData
async function loadRecord() {
  if (props.recordId == null) return
  try {
    const res = await api.get(`${props.endpoint}/${props.recordId}`)
    const payload = res.data.data !== undefined ? res.data.data : res.data
    const record = Array.isArray(payload) ? payload[0] : payload

    props.fields.forEach(field => {
      if (field.type === 'select') {
        if (Array.isArray(field.options)) {
          // Static select: cast to boolean
          formData[field.name] = Boolean(record[field.name])
        } else {
          // Dynamic select: cast to string
          const raw = record[field.name]
          formData[field.name] = raw != null ? String(raw) : ''
        }
      } else {
        formData[field.name] = record[field.name] ?? ''
      }
    })
  } catch (err) {
    console.error('Erro ao carregar registro', err)
    emit('error', err)
  }
}

// Initialize form and load options
async function init() {
  const tasks = []
  props.fields.forEach(field => {
    formData[field.name] = ''
    if (field.type === 'select') {
      if (Array.isArray(field.options)) {
        options[field.name] = field.options
      } else {
        tasks.push(fetchOptions(field))
      }
    }
  })
  await Promise.all(tasks)
  await loadRecord()
}

// Watchers
watch(() => props.visible, v => { if (v) init() })
watch(() => props.recordId, id => { if (props.visible && id != null) init() })

// Submit handler
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

// Helpers for option value/label
function getOptionValue(field, option) {
  return Array.isArray(field.options)
    ? option.value
    : String(option[field.optionsValueKey])
}
function getOptionLabel(field, option) {
  return Array.isArray(field.options)
    ? option.label
    : option[field.optionsLabelKey]
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease }
.modal-enter-from, .modal-leave-to { opacity: 0 }
</style>
