<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-b-0 border-slate-300">Overview</div>
    <div class="  rounded-b-md border p-3 border-slate-300">
      <div v-if="fetchStatus == 0">
        <div class="justify-between px-3">
          <div class=" font-bold mb-2">About</div>
          <div class=" italic">
            {{ generalInfo.description }}
          </div>
        </div>

        <hr class=" my-3" />

        <div class="flex justify-between px-3">
          <div>Owner:</div>
          <div class=" font-bold">{{ generalInfo.owner }}</div>
        </div>
        <div class="flex justify-between px-3">
          <div>Stars:</div>
          <div class=" font-bold">{{ generalInfo.stars }}</div>
        </div>
        <div class="flex justify-between px-3">
          <div>Forks:</div>
          <div class=" font-bold">{{ generalInfo.forks }}</div>
        </div>

        <hr class=" my-3" />

        <div class="px-3 mb-2">Topics:</div>
        <div class=" flex flex-wrap px-3">
          <div v-for="topic in generalInfo.topics" class=" px-2 py-1 cursor-default rounded-full m-1 bg-sky-100 text-sky-600 text-xs">
            {{topic}}
          </div>
        </div>
      </div>
      

      <div v-else-if="fetchStatus == 1">
        Loading...
      </div>

      <div v-else>
        Failed to load.
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api/api'

let route = useRoute()
let owner = route.params.owner
let repo = route.params.repo

let generalInfo = ref({
  owner: '',
  description: '',
  forks: 0,
  stars: 0,
  topics: []
})
let fetchStatus = ref(1)

onMounted(() => {
  api.generalIntroduction(owner, repo).then(resp => {
    fetchForText(resp)
  })
})

function fetchForText(resp) {
  if (resp.code == 0) {
    if (resp.data == null) {
      fetchStatus.value = -100
      return
    }
    let dataStr = resp.data
    let data = JSON.parse(dataStr)
    generalInfo.value.owner = data.owner.login
    generalInfo.value.description = data.description
    generalInfo.value.forks = data.forks_count
    generalInfo.value.topics = data.topics
    generalInfo.value.stars = data.stargazers_count
  }
  fetchStatus.value = resp.code
}
</script>