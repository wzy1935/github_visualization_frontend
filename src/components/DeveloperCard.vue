<template>
  <div>
    <div class=" bg-slate-100 rounded-t-md border p-3 border-slate-300">Developers</div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300">
      <div>30 people have contributed to the repository. <a class=" cursor-pointer text-blue-700 hover:underline">See
          more.</a></div>
      <div class=" flex space-x-3 py-2">
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
        <div class=" h-16 w-16 bg-slate-400">X</div>
      </div>
    </div>
    <div class=" last:rounded-b-md border border-t-0 p-3 border-slate-300 flex justify-center">
      <div class=" w-full">
        <div ref="developerRank" class=" h-96"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
const developerRank = ref()
let myChart = null;

onMounted(() => {
  console.log("???")
  myChart = echarts.init(developerRank.value)
  axios.get('http://10.26.18.98:8080/api/mininet/mininet/developers/rank', {  params:{
      limit: 10
  }}).then(resp => {
    // if (resp.data.code == 0) {
      console.log(resp.data.data)
      displayData(resp.data.data)
  console.log("???")

    // }
  })
})

function displayData(data) {
  let nameArr = data.map((value) => value.developer)
  let amountArr = data.map((value) => value.commits)
  let option = {
    xAxis: {
      type: 'category',
      data: nameArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: amountArr,
        type: 'bar',
      }
    ]
  };
  myChart.setOption(option);
}

</script>