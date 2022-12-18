<template>
  <div v-if="repoCode == 0">
    <div class=" bg-slate-100 border-b border-slate-300 p-4">
      <div class=" text-2xl font-bold cursor-pointer hover:underline w-fit">
        <a :href="'https://github.com/'+ owner +'/' + repo" target="_blank">{{ repo }}</a>
      </div>
      <div class=" text-sm cursor-pointer hover:underline w-fit">
        <a :href="'https://github.com/'+ owner" target="_blank">{{ owner }}</a>
      </div>
    </div>
    <div>
      <div class=" flex justify-center space-x-6 p-6">
        <div class=" w-72 flex flex-col space-y-6">
          <OverviewCard />
          <StatusCard />
        </div>

        <div class=" w-full max-w-4xl flex flex-col space-y-6">
          <DeveloperCard />
          <IssueCard />
          <CommitCard />
          <ReleaseCard />
        </div>
      </div>
    </div>
  </div>

  <div v-else class=" mt-48 flex justify-center">
    <div class=" w-full max-w-lg bg-slate-50 p-10">
      <div v-if="repoCode == 100 || repoStatus == 100" class=" flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class=" h-16 w-16 text-blue-400"
          viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
            opacity=".5" />
          <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12"
              type="rotate" />
          </path>
        </svg>
        <div class=" mt-4">{{ failedDisplayText }}</div>
      </div>

      <div v-else-if="repoCode == -100" class=" flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
          class=" h-16 w-16 text-red-400" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" />
        </svg>
        <div class=" mt-4">{{ failedDisplayText }}</div>
      </div>

      <div v-else class=" flex flex-col items-center">
        <div class=" text-6xl">🤔</div>
        <div class=" mt-4">{{ failedDisplayText }}</div>
        <div class=" w-full" v-if="needCollect">
          <hr class=" my-3 w-full" />
          <DataCollect class=" flex flex-col items-center" />
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import { useRoute } from 'vue-router'
import OverviewCard from '../components/cards/OverviewCard.vue'
import DeveloperCard from '../components/cards/DeveloperCard.vue'
import IssueCard from '../components/cards/IssueCard.vue'
import CommitCard from '../components/cards/CommitCard.vue'
import ReleaseCard from '../components/cards/ReleaseCard.vue'
import StatusCard from '../components/cards/StatusCard.vue'
import DataCollect from '../components/utils/DataCollect.vue'

import { watch, ref, onMounted, computed } from 'vue'
import api from '../api/api'

let route = useRoute()

let repo = route.params.repo
let owner = route.params.owner
let repoStatus = ref(100)
let repoCode = ref(100) // -1: NO; 0: YES; 100: LOADING; -100: UNKNOWN ERROR
let needCollect = computed(() => {
  return repoStatus.value == 4
})

let failedDisplayText = computed(() => {
  if (repoCode.value == -100) return 'Failed to load.'
  if (repoCode.value == 100 || repoStatus.value == 100) return 'Loading...'
  if (repoCode.value == -1) {
    return {
      '-1': 'The server can not deicide whether the repository exist or not. Check your input or try again.',
      2: 'Data is collecting now. Please wait.',
      3: 'Data collecting job is queuing. Check out the progress in the job queue.',
      4: 'No data has been collected.'
    }[repoStatus.value]
  }
})


watch(() => route.params, () => {
  repo = route.params.repo
  owner = route.params.owner
  repoStatus.value = 100
  repoCode.value = 100
  startUp()
})

onMounted(startUp)

function startUp() {
  api.generalCode(owner, repo).then(resp => {
    repoCode.value = resp.code
    if (repoCode.value != 0) {
      api.generalStatus(owner, repo).then(resp => {
        if (resp.code == 0) {
          repoStatus.value = resp.data.status
        } else {
          repoCode.value = -100
          repoStatus.value = -100
        }
      })
    }
  })
}


</script>