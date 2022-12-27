<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-slate-300">Commits</div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div class=" mb-6">The following graph shows <strong>the time distribution</strong> of this repository.</div>
      <div class="overflow-x-auto w-full">
        <EChart :option="commitsDistributionOption" :status="commitsDistributionStatus" class=" h-96 min-w-[48rem]" />
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

let commitsDistributionOption = ref(null)
let commitsDistributionStatus = ref(1)


onMounted(() => {
  Promise.all([
    api.commitsDistribution(owner, repo)
  ]).then(resps => {
    fetchForGraph(resps[0])
  })
})


function fetchForGraph(resp) {
  if (resp.code == 0) {
    let daysArr = [
      'Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ]
    let hoursArr = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', 
    '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h']
    let dataArr = resp.data.map(function (item) {
      return [item.hour, 6 - item.weekday, item.commits];
    })
    if (dataArr.length == 0) {
      commitsDistributionStatus.value = 2
      return
    }
    let commitMax = Math.max(...dataArr.map(item => item[2]))

    let option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      gradientColor: [
        '#bbf7d0',
        '#4ade80',
        '#16a34a',
        '#14532d'
      ],
      xAxis: {
        type: 'category',
        data: hoursArr,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: daysArr,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: commitMax,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          name: 'count',
          type: 'heatmap',
          data: dataArr,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    commitsDistributionOption.value = option
  }
  commitsDistributionStatus.value = resp.code

}

</script>