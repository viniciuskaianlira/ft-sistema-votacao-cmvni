<!-- src/components/crud/BaseDetail.vue -->
<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
      <div class="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
        <button
          @click="close"
          class="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          aria-label="Fechar"
        >
          ✖️
        </button>

        <h2 class="text-xl font-semibold mb-4">
          Detalhes de {{ resourceData[titleField] || '---' }}
        </h2>

        <!-- Campos principais -->
        <div class="grid grid-cols-2 gap-4">
          <div v-for="field in fields" :key="field.key">
            <strong>{{ field.label }}:</strong>
            {{ resourceData[field.key] ?? '—' }}
          </div>
        </div>

        <!-- Seções dinâmicas -->
        <div v-for="section in sections" :key="section.itemKey" class="mt-6">
          <h3 class="font-semibold mb-2">{{ section.title }}</h3>

          <!-- Modo Lista -->
          <ul
            v-if="(section.displayType || 'list') === 'list'"
            class="list-disc list-inside"
          >
            <li
              v-for="item in sectionsData[section.itemKey]"
              :key="item.id"
            >
              {{ item[section.labelKey] }}
            </li>
            <li
              v-if="!sectionsData[section.itemKey] || sectionsData[section.itemKey].length === 0"
              class="text-gray-500"
            >
              Nenhum registrado
            </li>
          </ul>

          <!-- Modo Tabela -->
          <table
            v-else-if="section.displayType === 'table'"
            class="w-full table-auto border-collapse"
          >
            <thead>
              <tr>
                <th
                  v-for="col in section.columns"
                  :key="col.key"
                  class="border px-2 py-1 text-left"
                >
                  {{ col.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in sectionsData[section.itemKey]"
                :key="item.id"
              >
                <td
                  v-for="col in section.columns"
                  :key="col.key"
                  class="border px-2 py-1"
                >
                  {{ item[col.key] }}
                </td>
              </tr>
              <tr
                v-if="!sectionsData[section.itemKey] || sectionsData[section.itemKey].length === 0"
              >
                <td
                  :colspan="section.columns.length"
                  class="text-gray-500 text-center"
                >
                  Nenhum registrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import api from '@/services/api.js'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  resourceId: {
    type: [String, Number],
    default: null
  },
  resourceEndpoint: {
    type: String,
    required: true
  },
  titleField: {
    type: String,
    default: 'nome'
  },
  fields: {
    type: Array,
    required: true
  },
  sections: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible'])

const resourceData = ref({})
const sectionsData = reactive({})

async function fetchDetails() {
  if (props.resourceId == null) return

  try {
    // fetch principal wrapped response
    const resMain = await api.get(
      `${props.resourceEndpoint}/${props.resourceId}`
    )
    const bodyMain = resMain.data
    if (bodyMain.success && Array.isArray(bodyMain.data)) {
      resourceData.value = bodyMain.data[0] || {}
    } else {
      resourceData.value = bodyMain
    }

    // fetch each section with same unwrap logic
    for (const section of props.sections) {
      const resSec = await api.get(
        `${props.resourceEndpoint}/${props.resourceId}/${section.endpoint}`
      )
      const bodySec = resSec.data
      let items = []
      if (bodySec.success && Array.isArray(bodySec.data)) {
        items = bodySec.data
      } else if (Array.isArray(bodySec)) {
        items = bodySec
      }
      sectionsData[section.itemKey] = items
    }
  } catch (e) {
    console.error('Erro ao buscar detalhes:', e)
  }
}

watch(
  () => props.visible,
  open => {
    if (open && props.resourceId != null) {
      fetchDetails()
    }
  }
)

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
