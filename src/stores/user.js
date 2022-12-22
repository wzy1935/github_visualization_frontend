import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import utils from '../api/utils'

export const useUserStore = defineStore('user', () => {
  const name = ref('error')
  const id = ref('')
  const avatar_url = computed(() => 'https://avatars.githubusercontent.com/u/' + id.value + '?v=4')
  const status = ref(100)

  async function update() {
    if (utils.getToken() == null) {
      name.value = 'error'
      id.value = 0
    } else {
      let res = await utils.getUser(utils.getToken())
      if (res != null) {
        name.value = res.name
        id.value = res.id
        status.value = 0
        return status.value
      }
    }
    status.value = -1
    return status.value
  }

  return { name, id, avatar_url, update, status }
})
