<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-b-0 border-slate-300">Data Status</div>
    <div class="  rounded-b-md border p-3 border-slate-300">
      <div v-if="fetchStatus == 0">
        <div class="px-3">
          <div class=" ">Last Updated:</div>
          <div class=" font-bold">{{lastUpdatedStr}}</div>
        </div>
        <hr class=" my-3" />
        <div class="px-3 mb-2">
          <div class=" mb-2 text-white rounded-md px-2 py-1 text-sm inline-block" :class="codeMap[statusCode][1]">{{codeMap[statusCode][0]}}</div>
          <div class=" ">{{codeMap[statusCode][2]}}</div>
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
import utils from '../../api/utils'

let route = useRoute()
let owner = route.params.owner
let repo = route.params.repo

const codeMap = {
  '0': ['normal', 'bg-green-500', 'Data is all up-to-date.'],
  '1': ['outdated', 'bg-lime-500', 'The latest data is more than a day old.'],
  '2': ['collecting', 'bg-pink-500', 'Data is being collected for this repository.'],
  '3': ['queuing', 'bg-purple-500', 'Data is waiting to be collected'],
  '4': ['empty', 'bg-yellow-500', 'No data has been collected.'],
  '-1': ['invalid', 'bg-red-500', 'Invalid repository.']
}

let statusCode = ref(0)
let fetchStatus = ref(1)
let lastUpdatedStr = ref('')


onMounted(() => {
  api.generalStatus(owner, repo).then(resp => {
    fetchForText(resp)
  })
})

function fetchForText(resp) {
  if (resp.code == 0) {
    statusCode.value = resp.data.status
    lastUpdatedStr.value = utils.toMinuteStr(resp.data.last_updated)
  }
  fetchStatus.value = resp.code
}
</script>