<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
        <button
          @click="close"
          class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          aria-label="Fechar"
        >
          ✖️
        </button>
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div v-for="field in fields" :key="field.name">
            <label
              :for="field.name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              {{ field.label || field.name }}
            </label>

            <!-- Textarea -->
            <div v-if="field.type === 'textarea'">
              <textarea
                :id="field.name"
                v-model="formData[field.name]"
                :rows="field.rows || 4"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <!-- Select -->
            <div v-else-if="field.type === 'select'">
              <select
                :id="field.name"
                v-model="formData[field.name]"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="opt in optionsMap[field.name]"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- Input texto/número/data -->
            <div v-else>
              <input
                :id="field.name"
                :type="field.type"
                v-model="formData[field.name]"
                :placeholder="field.placeholder"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'
import api from '@/services/api.js'

const props = defineProps({
  /** Controla visibilidade via v-model:visible */
  visible:   { type: Boolean, required: true },
  /** Título do modal */
  title:     { type: String,  default: 'Editar Registro' },
  /** Endpoint base (plural) */
  endpoint:  { type: String,  required: true },
  /** ID do registro a ser editado */
  recordId:  { type: [String, Number], required: true },
  /** Definição dos campos: name, label, type, rows, optionsEndpoint, optionsValueKey, optionsLabelKey */
  fields:    { type: Array,   required: true }
})
const emit = defineEmits(['update:visible','saved','error'])

const formData   = reactive({})
const optionsMap = reactive({})

function initForm() {
  props.fields.forEach(f => {
    formData[f.name] = null
    if (f.type === 'select') optionsMap[f.name] = []
  })
}

async function fetchOptions(field) {
  try {
    const { data } = await api.get(field.optionsEndpoint)
    const arr = Array.isArray(data) ? data : data.data || []
    optionsMap[field.name] = arr.map(item => ({
      label: item[field.optionsLabelKey || 'label'],
      value: item[field.optionsValueKey || 'value']
    }))
  } catch (e) {
    console.error(`Erro ao buscar opções para ${field.name}:`, e)
  }
}

async function fetchRecord() {
  if (!props.recordId) return
  try {
    initForm()
    const { data } = await api.get(`${props.endpoint}/${props.recordId}`)
    props.fields.forEach(f => {
      formData[f.name] = data[f.name]
      if (f.type === 'select' && f.optionsEndpoint) {
        fetchOptions(f)
      }
    })
  } catch (e) {
    console.error('Erro ao buscar registro:', e)
    emit('error', e)
  }
}

watch(
  () => props.visible,
  v => { if (v) fetchRecord() }
)

onMounted(fetchRecord)

async function submitForm() {
  try {
    await api.put(`${props.endpoint}/${props.recordId}`, formData)
    emit('saved', formData)
    close()
  } catch (e) {
    console.error('Erro ao salvar registro:', e)
    emit('error', e)
  }
}

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
