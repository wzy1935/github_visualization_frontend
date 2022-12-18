<template>
  <div>
    <div v-if="fetchStatus >= 0" class=" flex flex-col items-center space-y-4 my-6">
      <div class=" p-4 max-w-3xl flex justify-between items-center w-full">
        <div class=" text-xl font-bold">Job Queue</div>
        <button @click="fetch" :class="fetchStatus == 100 ? ' bg-gray-500 cursor-default' : 'bg-green-500'" class=" text-white rounded-md px-2 py-1 text-sm inline-block">refresh</button>
      </div>
      <div v-for="item in fetchList"
        class=" p-4 bg-gray-50 shadow-md max-w-3xl flex justify-between items-center w-full">
        <div class=" w-full">{{ item.repoStr }}</div>
        <div class=" w-full">TASK {{ item.taskIndex }} TURN {{ item.taskPage }}</div>
        <div class=" w-28 shrink-0 text-center text-sm p-1 text-white rounded-md"
          :class="item.queuing ? 'bg-purple-500' : item.pausing ? 'bg-gray-500' : 'bg-pink-500'">
          {{ item.queuing ?
    'QUEUING' : item.pausing ? 'PAUSED' : 'COLLECTING'
          }}</div>
      </div>
      <div v-if="fetchList.length == 0" class="p-4 border-dashed rounded-md border-2 max-w-3xl w-full">
        The job queue is empty now.
      </div>
    </div>

    <div v-else class=" mt-48 flex flex-col w-full items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
        class=" h-16 w-16 text-red-400" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" />
      </svg>
      <div class=" mt-4">Unknown error.</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../api/api'

let fetchStatus = ref(0)
let fetchList = ref([])

onMounted(() => {
  fetch()
})

function fetch() {
  if (fetchStatus.value == 100) return
  fetchStatus.value = 100
  api.submitQueue().then(resp => {
    if (resp.code == 0) {
      fetchList.value = resp.data
      fetchStatus.value = 0
    } else {
      reqFail()
    }
  }).catch(err => {
    reqFail()
  })
}

function reqFail() {
  fetchStatus.value = -100
}
</script>