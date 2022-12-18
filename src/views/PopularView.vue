<template>
  <div>
    <div v-if="fetchStatus >= 0" class=" flex flex-col items-center space-y-4 my-6">
      <div class=" p-4 max-w-3xl flex flex-col justify-between w-full">
        <div class=" text-xl font-bold">Popular Repository</div>
        <div class=" ">Top 10 github repositories:</div>
      </div>
      <div v-for="repo in repos" class="p-4 bg-gray-50 shadow-md max-w-3xl flex justify-between items-center w-full">
        <div @click="router.push('/visualization/' + repo.owner + '/' + repo.repo)" class=" cursor-pointer">{{repo.owner}}/{{repo.repo}}</div>
        <div class="text-white rounded-md px-2 py-1 text-sm" :class="codeMap[repo.code][1]">
          {{codeMap[repo.code][0]}}
        </div>
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
import { useRouter } from 'vue-router'

let router = useRouter()

let repos = ref([
  {'code': 100, 'owner': 'freeCodeCamp', 'repo': 'freeCodeCamp' },
  {'code': 100, 'owner': '996icu', 'repo': '996.ICU' },
  {'code': 100, 'owner': 'EbookFoundation', 'repo': 'free-programming-books' },
  {'code': 100, 'owner': 'jwasham', 'repo': 'coding-interview-university' },
  {'code': 100, 'owner': 'sindresorhus', 'repo': 'awesome' },
  {'code': 100, 'owner': 'kamranahmedse', 'repo': 'developer-roadmap' },
  {'code': 100, 'owner': 'donnemartin', 'repo': 'system-design-primer' },
  {'code': 100, 'owner': 'vuejs', 'repo': 'vue' },
  {'code': 100, 'owner': 'facebook', 'repo': 'react' },
  {'code': 100, 'owner': 'tensorflow', 'repo': 'tensorflow' }
])

const codeMap = {
  '0': ['normal', 'bg-green-500', 'Data is all up-to-date.'],
  '1': ['outdated', 'bg-lime-500', 'The latest data is more than one day old.'],
  '2': ['collecting', 'bg-pink-500', 'Data is being collected for this repository.'],
  '3': ['queuing', 'bg-purple-500', 'Data is waiting to be collected'],
  '4': ['empty', 'bg-yellow-500', 'No data has been collected.'],
  '-1': ['invalid', 'bg-red-500', 'Invalid repository.'],
  '100': ['loading', 'bg-gray-500', 'Loading...'],
}

let fetchStatus = ref(100)

onMounted(() => {
  Promise.all(repos.value.map(item => api.generalStatus(item.owner, item.repo))).then(resps => {
    for (let i = 0; i < 10; i++) {
      if (resps[i].code < 0) {
        fetchStatus.value = -100
        break
      }
      repos.value[i].code = resps[i].data.status
    }
  })
})

console.log(repos)

</script>