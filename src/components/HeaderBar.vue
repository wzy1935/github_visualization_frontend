<template>
  <div class=" bg-gray-800 text-white p-3">
    <div class=" flex justify-between items-center">
      <div class=" flex items-center space-x-4">
        <div class=" font-bold">
          Github Visualization
        </div>
        <div>
          <input v-model="inputText" type="text" placeholder="owner/repo" @keyup.enter="goto"
          :class="validInput ? 'focus:bg-white' : ' focus:bg-red-50'"
            class=" focus:outline-none bg-gray-800 focus:text-black text-gray-300 border border-gray-500 rounded-l-md p-1 w-64 text-sm">
          <button @click="goto" class=" border-gray-500 border-l-0 hover:bg-gray-700 py-1 px-2 rounded-r-md border text-sm">Goto</button>
        </div>
        <button class=" text-sm hover:text-gray-200">
          Popular
        </button>
        <button class=" text-sm hover:text-gray-200">
        Job queue
        </button>
        <button class=" text-sm hover:text-gray-200">
          APIs
        </button>
      </div>
      <div>
        avatar
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()

let inputText = ref('')
let validInput = computed(() => {
  let arr = inputText.value.split('/')
  return arr.length == 2 && arr[0] != 0 && arr[1] != 0
})

function goto() {
  if (validInput.value) {
    let arr = inputText.value.split('/')
    router.push('/visualization/' + arr[0] + '/' + arr[1]).then(() => {
      location.reload()
    })
  }
}
</script>