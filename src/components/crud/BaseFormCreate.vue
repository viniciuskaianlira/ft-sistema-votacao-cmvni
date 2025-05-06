<!-- src/components/crud/BaseFormCreate.vue -->
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
            class="flex flex-col"
          >
            <label
              :for="field.field ?? field.name"
              class="mb-1 text-sm font-medium text-gray-700"
            >
              {{ field.label }}
            </label>

            <!-- Text/Number/Email/Password -->
            <input
              v-if="['text','number','email','password'].includes(field.type)"
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
                :key="opt[field.optionsValueKey]"
                :value="opt[field.optionsValueKey]"
              >
                {{ opt[field.optionsLabelKey] }}
              </option>
            </select>
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
import { useToast } from 'vue-toastification'

const props = defineProps({
  visible:  { type: Boolean, required: true },
  fields:   { type: Array,   required: true },
  endpoint: { type: String,  required: true },
  title:    { type: String,  default: 'Novo' }
})
const emit = defineEmits(['update:visible','saved'])

const toast = useToast()
const form = reactive({})
const options = reactive({})

/** Pega a chave do campo: `field.field` ou, se ausente, `field.name` */
function keyOf(field) {
  return field.field ?? field.name
}

function initForm() {
  props.fields.forEach(f => {
    const key = keyOf(f)
    form[key] = ''
    if (f.type === 'select' && f.optionsEndpoint) {
      options[key] = []
      api.get(f.optionsEndpoint)
        .then(res => {
          // unwrap: res.data ou res.data.data
          const arr = Array.isArray(res.data)
            ? res.data
            : res.data.data || []
          options[key] = arr
        })
        .catch(e => {
          console.error(`Erro ao carregar opções ${key}:`, e)
          toast.error(`Falha ao carregar opções de ${f.label}`)
        })
    }
  })
}

watch(() => props.visible, v => { if (v) initForm() })
onMounted(() => { if (props.visible) initForm() })

async function onSubmit() {
  try {
    const res = await api.post(props.endpoint, form)
    toast.success('Salvo com sucesso!')
    emit('saved', res.data)
    close()
  } catch (e) {
    console.error('Erro ao salvar:', e)
    toast.error(e.response?.data?.message || 'Falha ao salvar.')
  }
}

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease }
.modal-enter-from,  .modal-leave-to    { opacity: 0 }
</style>
