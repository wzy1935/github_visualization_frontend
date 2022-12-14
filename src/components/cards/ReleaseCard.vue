<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-slate-300">Releases</div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      {{releaseAmountText}}
    </div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div class=" mb-6">The following graph shows <strong>commits amount between each release</strong>.</div>
      <div class=" w-full">
        <EChart :option="releaseCommitsOption" :status="releaseCommitsStatus" class=" h-96" />
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

let releaseCommitsStatus = ref(1)
let releaseCommitsOption = ref(null)

let releaseAmountText = ref('Loading...')

onMounted(() => {
  Promise.all([
    api.releaseAmount(owner, repo),
    api.releaseCommits(owner, repo, 10)
  ]).then(resps => {
    fetchForGraph(resps[1])
    fetchForAmountText(resps[0])
  })
})

function fetchForAmountText(resp) {
  if (resp.code == 0) {
    releaseAmountText.value = 'There are ' + resp.data.amount + ' releases in this repository.'
  } else {
    releaseAmountText.value = 'Failed to load.'
  }
}

function fetchForGraph(resp) {
  if (resp.code == 0) {
    let labelArr = resp.data.map(item => item.release_name)
    let valueArr = resp.data.map(item => item.commits)

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
      xAxis: [
        {
          type: 'category',
          data: labelArr,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'commits',
          type: 'bar',
          barWidth: '60%',
          data: valueArr
        }
      ]
    };
    releaseCommitsOption.value = option
  }
  releaseCommitsStatus.value = resp.code

}


</script>