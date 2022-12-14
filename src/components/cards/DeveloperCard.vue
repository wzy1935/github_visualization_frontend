<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-slate-300">Developers</div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div>{{ introStr }}</div>
      <div class=" flex space-x-3 py-2">
        <div v-for="url in developerImgUrls">
          <a :href="url[1]" target="_blank">
            <img :src="url[0]" class=" h-16 w-16" />
          </a>
        </div>
      </div>
    </div>

    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div class=" mb-6">The following graph shows <strong>the ranking of each developer's contribution</strong> ordered
        by commits.</div>
      <div class=" w-full">
        <EChart :option="developerRankOption" :status="developerRankStatus" class=" h-96" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EChart from '../utils/EChart.vue'
import api from '../../api/api'

let route = useRoute()
let owner = route.params.owner
let repo = route.params.repo

let developerRankOption = ref(null)
let developerRankStatus = ref(1)
let introStr = ref("Loading...")
let developerImgUrls = ref([])

onMounted(() => {
  Promise.all([
    api.developerRank(owner, repo, 10),
    api.developerAmount(owner, repo)
  ]).then(resps => {
    fetchForGraph(resps[0])
    fetchForImg(resps[0])
    fetchForIntro(resps[1])
  })
})

function fetchForIntro(resp) {
  let code = resp.code
  let data = resp.data
  if (code == 0) {
    introStr.value = data.amount + " developers have contributed to this repository."
  } else {
    introStr.value = "Failed to load."
  }
}

function fetchForImg(resp) {
  let code = resp.code
  let data = resp.data
  if (code == 0) {
    developerImgUrls.value = data.map(item =>
      ['https://avatars.githubusercontent.com/u/' + item.developer_id + '?v=4',
      'https://github.com/' + item.developer]
    )
  }
}

function fetchForGraph(resp) {
  let code = resp.code
  let data = resp.data
  if (code == 0) {
    let nameArr = data.map((value) => value.developer)
    let amountArr = data.map((value) => value.commits)
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: [
        {
          type: 'category',
          data: nameArr.reverse(),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      xAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'commits',
          type: 'bar',
          barWidth: '60%',
          data: amountArr.reverse()
        }
      ]
    }
    developerRankOption.value = option
  }
  developerRankStatus.value = code
}

</script>