<!-- componente DynamicFormModal.vue com:

Props:

visible (v-model:visible) para mostrar/ocultar.

fields: array de objetos { label, field, type, [optionEndpoint, optionValue, optionLabel] }.

endpoint: URL para POST de criação.

title: título do modal.

Tipos de campo:

text, number, email: gera <input>.

textarea: gera <textarea>.

select: busca opções em optionEndpoint e gera <select>.

Uso:

vue
Copiar
Editar
<DynamicFormModal
  v-model:visible="showCreate"
  :fields="[
    { label: 'Nome', field: 'nome', type: 'text' },
    { label: 'Partido', field: 'partido', type: 'select',
      optionEndpoint: '/api/partidos',
      optionValue: 'id',
      optionLabel: 'nome'
    },
    // …outros campos…
  ]"
  endpoint="/api/vereador"
  title="Novo Vereador"
  @saved="fetchData"  <!-- atualiza lista ao salvar -->
/> -->



<template>
    <transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg w-full max-w-lg p-6 relative">
          <button
            @click="close"
            class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            aria-label="Fechar"
          >
            ✖️
          </button>

          <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

          <form @submit.prevent="onSubmit">
            <div v-for="field in fields" :key="field.field" class="mb-4">
              <label :for="field.field" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
              </label>

              <!-- Input Texto, Número, Email -->
              <input
                v-if="['text', 'number', 'email'].includes(field.type)"
                :id="field.field"
                v-model="form[field.field]"
                :type="field.type"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <!-- Textarea -->
              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.field"
                v-model="form[field.field]"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              ></textarea>

              <!-- Select com fetch de opções -->
              <select
                v-else-if="field.type === 'select'"
                :id="field.field"
                v-model="form[field.field]"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="opt in options[field.field]"
                  :key="opt[field.optionValue]"
                  :value="opt[field.optionValue]"
                >
                  {{ opt[field.optionLabel] }}
                </option>
              </select>
            </div>

            <div class="flex justify-end mt-6">
              <button
                type="button"
                @click="close"
                class="mr-2 px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
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
  import axios from 'axios'
  import { useToast } from 'vue-toastification'
  
  const props = defineProps({
    /** Controla visibilidade via v-model:visible */
    visible: { type: Boolean, required: true },
    /** Array de campos: { label, field, type, optionEndpoint?, optionValue?, optionLabel? } */
    fields: { type: Array, required: true },
    /** Endpoint para salvar (POST) */
    endpoint: { type: String, required: true },
    /** Título do modal */
    title: { type: String, default: 'Novo' }
  })
  const emit = defineEmits(['update:visible', 'saved'])
  
  const toast = useToast()
  const form = reactive({})
  const options = reactive({})
  
  // Inicializa form e opções
  function initForm() {
    props.fields.forEach(f => {
      form[f.field] = ''
      if (f.type === 'select' && f.optionEndpoint) {
        options[f.field] = []
        axios
          .get(f.optionEndpoint, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then(res => {
            // ajusta dependendo do formato da resposta
            const data = Array.isArray(res.data) ? res.data : (res.data.data || [])
            options[f.field] = data
          })
          .catch(err => {
            console.error(`Erro ao carregar opções para ${f.field}:`, err)
            options[f.field] = []
          })
      }
    })
  }
  
  // Quando o modal abre, inicializa tudo
  watch(
    () => props.visible,
    visible => {
      if (visible) initForm()
    }
  )
  
  async function onSubmit() {
    try {
      const res = await axios.post(
        props.endpoint,
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      toast.success('Salvo com sucesso!')
      emit('saved', res.data)
      close()
    } catch (err) {
      console.error('Erro ao salvar:', err)
      toast.error(err.response?.data?.message || 'Falha ao salvar.')
    }
  }
  
  function close() {
    emit('update:visible', false)
  }
  
  onMounted(() => {
    if (props.visible) initForm()
  })
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
