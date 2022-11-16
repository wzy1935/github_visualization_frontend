<template>
  <div class=" bg-slate-100 border-b border-slate-300 p-4">
    <div class=" text-2xl font-bold cursor-pointer hover:underline w-fit">Repo Name</div>
    <div class=" text-sm cursor-pointer hover:underline w-fit">Repo Owner</div>
  </div>
  <div class=" flex justify-center mt-6 space-x-6">
    <div class=" w-72 ">
      <OverviewCard/>
    </div>

    <div class=" w-full max-w-4xl flex flex-col space-y-6">
      <DeveloperCard/>
    </div>
  </div>
</template>

<script setup>
import OverviewCard from '../components/OverviewCard.vue'
import DeveloperCard from '../components/DeveloperCard.vue'

</script>