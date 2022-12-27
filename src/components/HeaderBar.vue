<template>
  <div v-if="dialog" class=" fixed h-screen z-10 w-full bg-gray-500 opacity-25" @click="dialog = false">

  </div>
  <div class=" bg-gray-800 text-white p-3">
    <div class=" flex sm:flex-row flex-col sm:justify-between sm:items-center max-sm:space-y-4">
      <div class=" flex sm:flex-row flex-col sm:items-center sm:space-x-4 max-sm:space-y-4">
        <div class=" max-sm:mb-2">
          <button class=" font-bold w-fit" @click="router.push('/')">
            Github Visualization
          </button>
          <button class=" sm:hidden ml-4" @click="drawer = !drawer">{{ drawer ? '-' : '+' }}</button>
        </div>
        <div :class="drawer ? ' max-sm:hidden' : ''">
          <input v-model="inputText" type="text" placeholder="owner/repo" @keyup.enter="goto"
            :class="validInput ? 'focus:bg-white' : ' focus:bg-red-50'"
            class=" focus:outline-none bg-gray-800 focus:text-black text-gray-300 border border-gray-500 rounded-l-md p-1 w-64 max-md:w-44 text-sm">
          <button @click="goto"
            class=" border-gray-500 border-l-0 hover:bg-gray-700 py-1 px-2 rounded-r-md border text-sm">Goto</button>
        </div>
        <button :class="drawer ? ' max-sm:hidden' : ''" class=" text-sm w-fit hover:text-gray-200" @click="router.push('/popular')">
          Popular
        </button>
        <button :class="drawer ? ' max-sm:hidden' : ''" class=" text-sm w-fit hover:text-gray-200" @click="router.push('/queue')">
          Job queue
        </button>
      </div>
      <div :class="drawer ? ' max-sm:hidden' : ''" class=" relative">
        <img :src="userInfo.avatar_url" :alt="userInfo.name" class=" h-8 w-8 rounded-full cursor-pointer"
          v-if="userInfo.status == 0" @click="dialog = !dialog">
        <button v-else-if="userInfo.status < 0" @click="utils.jumpAuth" class=" text-sm hover:text-gray-200">
          Authorize
        </button>

        <div v-if="dialog"
          class="absolute text-sm z-50 text-black bg-white rounded-md shadow-md py-2 w-36 sm:right-0 top-12 border">
          <div class=" p-2 font-bold">{{ userInfo.name }}</div>
          <hr class=" mx-2" />
          <div class=" px-2 py-1 cursor-pointer hover:bg-blue-700 hover:text-white" @click="githubPageClick">
            Github Page
          </div>
          <div class=" px-2 py-1 cursor-pointer hover:bg-blue-700 hover:text-white" @click="deAuthClick">Deauthorize
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import utils from '../api/utils';

let router = useRouter()
let userInfo = useUserStore()
userInfo.update()

let dialog = ref(false)
let drawer = ref(false)

let inputText = ref('')
let validInput = computed(() => {
  let arr = inputText.value.split('/')
  return arr.length == 2 && arr[0] != 0 && arr[1] != 0
})

function deAuthClick() {
  utils.deAuth()
  dialog.value = false
  userInfo.update()
}

function githubPageClick() {
  window.open('http://github.com/' + userInfo.name)
}

function goto() {
  if (validInput.value) {
    let arr = inputText.value.split('/')
    router.push('/visualization/' + arr[0] + '/' + arr[1]).then(() => {
      location.reload()
    })
  }
}


</script>