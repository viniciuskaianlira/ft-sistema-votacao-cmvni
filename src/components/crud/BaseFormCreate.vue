<template>
  <transition name="modal">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
      <!-- Modal Container -->
      <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          ✖️
        </button>

        <!-- Title -->
        <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div
            v-for="field in fields"
            :key="field.field ?? field.name"
            class="flex flex-col relative"
          >
            <!-- Label for non-checkbox/non-tags -->
            <label
              v-if="field.type !== 'checkbox' && field.type !== 'tags'"
              :for="field.field ?? field.name"
              class="mb-1 text-sm font-medium text-gray-700"
            >
              {{ field.label }}
            </label>

            <!-- Text/Number/Email/Password/Date -->
            <input
              v-if="['text','number','email','password','date'].includes(field.type)"
              :id="field.field ?? field.name"
              v-model="form[keyOf(field)]"
              :type="field.type"
              :placeholder="field.placeholder || ''"
              class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Textarea -->
            <textarea
              v-else-if="field.type==='textarea'"
              :id="field.field ?? field.name"
              v-model="form[keyOf(field)]"
              :placeholder="field.placeholder || ''"
              rows="4"
              class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <!-- Select -->
            <select
              v-else-if="field.type==='select'"
              :id="field.field ?? field.name"
              v-model="form[keyOf(field)]"
              class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Selecione {{ field.label }}</option>
              <option
                v-for="opt in options[keyOf(field)]"
                :key="opt[field.optionsValueKey || 'value']"
                :value="opt[field.optionsValueKey || 'value']"
              >
                {{ opt[field.optionsLabelKey || 'label'] }}
              </option>
            </select>

            <!-- Checkbox -->
            <div v-else-if="field.type==='checkbox'" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :id="field.field ?? field.name"
                v-model="form[keyOf(field)]"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                :for="field.field ?? field.name"
                class="text-sm text-gray-700"
              >
                {{ field.label }}
              </label>
            </div>

            <!-- File Upload -->
            <input
              v-else-if="field.type==='file'"
              type="file"
              :id="field.field ?? field.name"
              :multiple="field.multiple || false"
              @change="onFilesChange($event, field)"
              class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Tags Input with Autocomplete -->
            <div v-else-if="field.type==='tags'" class="space-y-2">
              <label v-if="field.label" class="mb-1 text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <div class="flex space-x-2">
                <input
                  type="text"
                  v-model="tagInput[keyOf(field)]"
                  :placeholder="field.placeholder || 'Digite para buscar...'"
                  class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <button
                  type="button"
                  @click="addTag(field, null)"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Adicionar
                </button>
              </div>

              <!-- Suggestions Dropdown -->
              <ul
                v-if="suggestions[keyOf(field)]?.length"
                class="absolute bg-white border border-gray-200 rounded mt-1 w-full max-h-40 overflow-auto z-20"
              >
                <li
                  v-for="item in suggestions[keyOf(field)]"
                  :key="item[field.optionsValueKey || 'id']"
                  @click="addTag(field, item)"
                  class="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  {{ item[field.optionsLabelKey || 'label'] }}
                </li>
              </ul>

              <!-- Selected Tags -->
              <div class="flex flex-wrap mt-2">
                <span
                  v-for="(tag, idx) in form[keyOf(field)]"
                  :key="idx"
                  class="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full flex items-center"
                >
                  {{ tag[field.optionsLabelKey || 'label'] }}
                  <button
                    type="button"
                    @click="removeTag(field, idx)"
                    class="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
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
  visible:   { type: Boolean, required: true },
  fields:    { type: Array,   required: true },
  endpoint:  { type: String,  required: true },
  title:     { type: String,  default: 'Novo' }
})
const emit = defineEmits(['update:visible','saved'])

const form = reactive({})
const options = reactive({})
const tagInput = reactive({})
const suggestions = reactive({})

function keyOf(field) {
  return field.field ?? field.name
}

function initForm() {
  props.fields.forEach(f => {
    const key = keyOf(f)
    // Inicializa valores conforme tipo
    if (f.type === 'file') {
      form[key] = []
    } else if (f.type === 'tags') {
      form[key] = []
      tagInput[key] = ''
      suggestions[key] = []
    } else if (f.type === 'checkbox') {
      form[key] = false
    } else {
      form[key] = ''
    }

    // Carrega opções para selects
    if (f.type === 'select') {
      if (Array.isArray(f.options)) {
        options[key] = f.options
      } else if (f.optionsEndpoint) {
        options[key] = []
        api.get(f.optionsEndpoint)
          .then(res => {
            const arr = Array.isArray(res.data)
              ? res.data
              : res.data.data || []
            options[key] = arr
          })
          .catch(e => console.error(`Erro ao carregar opções ${key}:`, e))
      } else {
        options[key] = []
      }
    }
  })
}

// Initialize when modal opens
watch(() => props.visible, v => { if (v) initForm() })
onMounted(() => { if (props.visible) initForm() })

// Watch tagInput to fetch suggestions
watch(tagInput, (all) => {
  props.fields.forEach(f => {
    if (f.type === 'tags' && f.optionsEndpoint) {
      const key = keyOf(f)
      const query = tagInput[key]?.trim()
      if (query) {
        api.get(f.optionsEndpoint, { params: { q: query } })
          .then(res => {
            const arr = Array.isArray(res.data.data) ? res.data.data : res.data
            suggestions[key] = arr
          })
          .catch(() => suggestions[key] = [])
      } else {
        suggestions[key] = []
      }
    }
  })
}, { deep: true })

// Handlers
function onFilesChange(event, field) {
  form[keyOf(field)] = Array.from(event.target.files)
}

function addTag(field, item = null) {
  const key = keyOf(field)
  if (item) {
    form[key].push(item)
  } else {
    const val = tagInput[key].trim()
    if (val) {
      form[key].push({
        [field.optionsValueKey]: val,
        [field.optionsLabelKey]: val
      })
    }
  }
  tagInput[key] = ''
  suggestions[key] = []
}

function removeTag(field, idx) {
  form[keyOf(field)].splice(idx, 1)
}

async function onSubmit() {
  try {
    let payload = form
    let config = {}

    // Se tiver upload de arquivos, usa FormData
    if (props.fields.some(f => f.type === 'file')) {
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          val.forEach(item => data.append(key, item))
        } else {
          data.append(key, val)
        }
      })
      payload = data
      config = { headers: { 'Content-Type': 'multipart/form-data' } }
    }

    const res = await api.post(props.endpoint, payload, config)
    emit('saved', res.data)
    close()
  } catch (e) {
    console.error('Erro ao salvar:', e)
  }
}

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease }
.modal-enter-from, .modal-leave-to    { opacity: 0 }
</style>
