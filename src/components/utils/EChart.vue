<template>
  <div class="relative">
    <div ref="chartNode" class=" h-full w-full" :class="thisStatus == SUCCESS ? '' : 'invisible'"></div>

    <div class=" top-0 absolute flex justify-center items-center h-full w-full" v-if="thisStatus == LOADING">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class=" h-16 w-16 text-blue-400"
        viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
          opacity=".5" />
        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
          <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12"
            type="rotate" />
        </path>
      </svg>
    </div>

    <div class=" top-0 absolute flex flex-col justify-center items-center h-full w-full" v-if="thisStatus < 0">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
        class=" h-16 w-16 text-red-400" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" />
      </svg>
      <div>
        Unable to load data.
      </div>
    </div>
  </div>

</template>


<script setup>
import * as echarts from 'echarts'
import { watch, ref, onMounted } from 'vue'

const LOADING = 1;
const FAIL = -1;
const SUCCESS = 0;


const props = defineProps({
  status: Number,
  option: Object
})

watch(props, (newProps) => {
  let newStatus = newProps.status
  let newOption = newProps.option
  setupChart(newStatus, Object.assign({}, newOption))
})

let chartNode = ref()
let chart = null

onMounted(() => {
  chart = echarts.init(chartNode.value)
  setupChart(props.status, props.option)
})

function setupChart(status, option) {
  thisStatus.value = status
  if (option != null) {
    option.color = ['#4ade80', '#fb923c', '#22d3ee', '#facc15', '#8b5cf6', '#ec4899', '#22d3ee', '#fb7185']
    chart.setOption(option)
  }
}

let thisStatus = ref(LOADING)
</script>