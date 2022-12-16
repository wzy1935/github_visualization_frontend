<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-slate-300">Issues</div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      {{ issueAmountStr }}
    </div>

    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div class=" mb-6">The following graph shows <strong>issue status at different times</strong>.</div>
      <div class=" flex justify-center items-center">
        <div>Year of</div>
        <input type="number" v-model="issueDistributionYear" @blur="updateDistributionYear"
          class=" mx-2 text-center w-20 focus:outline-none focus:bg-gray-100" />
      </div>
      <div class=" w-full">
        <EChart :option="issueDistributionOption" :status="issueDistributionStatus" class=" h-96" />
      </div>
    </div>

    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div class=" mb-6">The following graph shows <strong>the typical issue resolving time</strong>.</div>
      <div class=" w-full flex">
        <EChart :option="issueDurationOption" :status="issueDurationStatus" class=" h-96 w-full" />
        <div class=" w-64 shrink-0 flex flex-col space-y-3 p-6 text-sm">
          <div class=" font-bold text-base">Details</div>
          <div v-if="issueDurationStatus == 0">
            <div>Average Time:<br /><span class=" text-green-500">{{ issueDurationTexts.avgStr }}</span></div>
            <div>Standard Deviation:<br /><span class=" text-green-500">{{ issueDurationTexts.stdStr }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api/api'
import utils from '../../api/utils'
import EChart from '../utils/EChart.vue'
import humanizeDuration from 'humanize-duration'

let route = useRoute()
let owner = route.params.owner
let repo = route.params.repo

let issueAmountStr = ref("Loading...")

let issueDistributionStatus = ref(1)
let issueDistributionOption = ref(null)
let issueDistributionYear = ref(new Date().getFullYear())

let issueDurationStatus = ref(1)
let issueDurationOption = ref(null)
let issueDurationTexts = ref({
  avgStr: '',
  stdStr: ''
})

onMounted(() => {
  Promise.all([
    api.issueAmount(owner, repo),
    api.issueDistribution(owner, repo,
      utils.toTimeStamp(issueDistributionYear.value + '-1-1'),
      utils.toTimeStamp(issueDistributionYear.value + '-12-31'), 60
    ),
    api.issueDuration(owner, repo)
  ]).then(resps => {
    fetchForDurationChart(resps[2])
    fetchForDistributionChart(resps[1])
    fetchForDurationText(resps[2])
    fetchForAmountText(resps[0])
  })
})

function updateDistributionYear() {
  if (issueDistributionYear.value < 1900) {
    issueDistributionYear.value = new Date().getFullYear()
  }
  issueDistributionStatus.value = 1
  api.issueDistribution(
    owner, repo,
    utils.toTimeStamp(issueDistributionYear.value + '-1-1'),
    utils.toTimeStamp(issueDistributionYear.value + '-12-31'), 60
  ).then(resp => {
    fetchForDistributionChart(resp)
  })
}

function fetchForAmountText(resp) {
  if (resp.code == 0) {
    issueAmountStr.value = "There are " + resp.data.open_cnt + " issues open, " + resp.data.closed_cnt + " issues closed."
  } else {
    issueAmountStr.value = "Failed to load."
  }
}

function fetchForDurationText(resp) {
  if (resp.code == 0) {
    let avgStr = humanizeDuration(resp.data.avg * 1000)
    let avgArr = avgStr.split(',')
    avgStr = avgArr[0] + (avgArr.length > 1 ? avgArr[1] : '')
    issueDurationTexts.value.avgStr = avgStr
    issueDurationTexts.value.stdStr = resp.data.std
  }
}

function fetchForDurationChart(resp) {
  if (resp.code == 0) {
    let dataArr = resp.data.durations.map(value => {
      return {
        value: value.amount,
        name: value.label
      }
    })
    if (dataArr.length == 0) {
      issueDurationStatus.value = 2
      return
    }
    let option = {
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Time Duration',
          type: 'pie',
          radius: '80%',
          data: dataArr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    issueDurationOption.value = option
  }
  issueDurationStatus.value = resp.code
}

function fetchForDistributionChart(resp) {
  if (resp.code == 0) {
    let data = resp.data
    let labelArr = data.closed.map(value => value.label)
    let openArr = data.open.map(value => value.amount)
    let closedArr = data.closed.map(value => value.amount)
    let totalArr = data.total.map(value => value.amount)

    let option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Open', 'Closed', 'Total']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: labelArr
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Open',
          type: 'line',
          data: openArr
        },
        {
          name: 'Closed',
          type: 'line',
          data: closedArr
        },
        {
          name: 'Total',
          type: 'line',
          data: totalArr
        }
      ]
    }
    issueDistributionOption.value = option
  }
  issueDistributionStatus.value = resp.code
}

</script>