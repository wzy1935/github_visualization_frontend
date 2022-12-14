<template>
  <div class=" bg-slate-100 border-b border-slate-300 p-4">
    <div class=" text-2xl font-bold cursor-pointer hover:underline w-fit">{{ repo }}</div>
    <div class=" text-sm cursor-pointer hover:underline w-fit">{{ owner }}</div>
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

</template>

<script setup>
import { useRoute } from 'vue-router'
import OverviewCard from '../components/cards/OverviewCard.vue'
import DeveloperCard from '../components/cards/DeveloperCard.vue'
import IssueCard from '../components/cards/IssueCard.vue'
import CommitCard from '../components/cards/CommitCard.vue'
import ReleaseCard from '../components/cards/ReleaseCard.vue'
import StatusCard from '../components/cards/StatusCard.vue'

let route = useRoute()
let owner = route.params.owner
let repo = route.params.repo

</script>