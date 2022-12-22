<template>


  <div class=" absolute -z-40 h-screen w-full overflow-hidden top-0 blur-2xl">
    <div ref="block1" class=" absolute -z-40 bg-gradient-to-tr from-red-200 to-green-200 w-10 opacity-50">
    </div>
    <div ref="block2" class=" absolute -z-40 bg-gradient-to-tr from-purple-200 to-orange-200 w-10 opacity-50">
    </div>
    <div ref="block3" class=" absolute -z-40 bg-gradient-to-tr from-blue-200 to-rose-200 w-10 opacity-50">
    </div>
  </div>

  <div class=" flex flex-col w-full items-center py-48">
    <div class="mb-12 w-1/2">
      <div class=" font-bold text-5xl text-center">Visualize your github repository with one click.</div>
    </div>
    <button @click="utils.jumpAuth" :class="userInfo.status >= 0 ? 'invisible' : ''"
      class=" bg-gray-800 p-2 rounded-md hover:bg-gray-700 text-white flex text-sm items-center">
      <svg class=" fill-white h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <div class=" mx-2">Authorize</div>
    </button>
  </div>

  <div class=" bg-white p-6 py-24 flex w-full justify-center">
    <div class=" w-full max-w-4xl">
      <div class=" text-2xl font-bold mb-6">How to visualize my repository?</div>
      <div class=" flex justify-center items-center space-x-6 py-16">

        <div class=" flex flex-col items-center space-y-4">
          <svg class="h-16 w-16 fill-gray-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <div class=" text-xs">Authorize Github account</div>
        </div>

        <svg class="h-8 w-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
        </svg>

        <div class=" flex flex-col items-center space-y-4">
          <svg class="h-16 w-16 text-gray-600" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
          <div class=" text-xs">Search your repository</div>
        </div>

        <svg class="h-8 w-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
        </svg>

        <div class=" flex flex-col items-center space-y-4">
          <svg class="h-16 w-16 text-gray-600" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 2C11.5 2 11 2.19 10.59 2.59L7.29 5.88L12 10.58L16.71 5.88L13.41 2.59C13 2.19 12.5 2 12 2M5.88 7.29L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L5.88 16.71L10.58 12L5.88 7.29M18.12 7.29L13.42 12L18.12 16.71L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L18.12 7.29M12 13.42L7.29 18.12L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L16.71 18.12L12 13.42Z" />
          </svg>
          <div class=" text-xs">Choose collect data</div>
        </div>

        <svg class="h-8 w-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
        </svg>

        <div class=" flex flex-col items-center space-y-4">
          <svg class="h-16 w-16 text-gray-600" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
          <div class=" text-xs">Waiting for results</div>
        </div>

      </div>
      <div>Data collect and process procedure will be conducted automatically. It may takes few seconds or up to half an
        hour for each
        repository due to its scale.</div>
    </div>
  </div>

  <div class=" bg-gray-800 text-white p-6 py-24 flex w-full justify-center">
    <div class=" w-full max-w-4xl">
      <div class=" text-2xl font-bold mb-6">How it works</div>
      <div class=" flex justify-between space-x-6">
        <div class=" shrink-0">
          <img src="../assets/how.png" alt="crawler" class="h-48">
        </div>
        <div>
          <p class=" mb-4">After Authorization, once you submit data-collecting task, we will use your Github OAuth
            token to crawl data.</p>
          <p>When it's done, you can fetch statistical results from visualization page or through REST API.</p>
        </div>
      </div>
    </div>
  </div>

  <div class=" bg-white p-6 py-24 flex w-full justify-center">
    <div class=" w-full max-w-4xl">
      <div class=" text-2xl font-bold mb-6">REST Service</div>
      <div class=" flex justify-between space-x-6">
        <div class="">
          <p class=" mb-4">All the data are available through REST API.</p>
          <p>Try the following text in your Github <span class="bg-gray-100 rounded-md p-1 font-mono">README.md</span> to generate dynamic word cloud!</p>

          <p class=" bg-gray-100 rounded-md p-3 font-mono my-3 break-all">![Word cloud generated from Github
            Visualization](https://githubvisualizationdeploy-production.up.railway.app/api/repo/<span
              class=" text-green-500">{owner}</span>/<span
              class=" text-green-500">{repo}</span>/issues/wordcloud_pic/<span
              class=" text-green-500">{limit}</span>/<span
              class=" text-green-500">{width}</span>/<span class=" text-green-500">{height}</span>)
          </p>
        </div>
        <div class=" shrink-0">
          <img src="../assets/wordcloud.jfif" alt="crawler" class="h-72">
        </div>
      </div>
    </div>
  </div>

  <div class=" bg-gray-800 text-white p-6 py-6 flex w-full text-sm justify-center">
    <div class=" w-full max-w-4xl flex justify-center space-x-4">
      <div>SUSTech CS209A Course Project. Authored by @wzy1935 and @sustechwifi.</div>
      <div class=" border border-white bg-white"></div>
      <div><a href="https://github.com/wzy1935/github_visualization_backend" target="_blank" class="link">Github page</a></div>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../api/api'
import utils from '../api/utils'
import { useUserStore } from '../stores/user'

let userInfo = useUserStore()

let block1 = ref()
let block2 = ref()
let block3 = ref()

onMounted(() => {
  updateBlocks(0)
  addEventListener('scroll', () => {
    let pos = Math.min(600, window.scrollY) / 600
    if (pos <= 0.999) updateBlockTh(Math.min(600, window.scrollY) / 600)
  })
})

function updateBlocks(p) {
  setBlockLocation(block1, 0.1 + 0.4 * p, 0.1 + 0.1 * p, 0.2 + 0.7 * p, 0.7 - 0.2 * p)
  setBlockLocation(block2, 0.5 - 0.4 * p, 0.1 + 0.3 * p, 0.9 - 0.6 * p, 0.9)
  setBlockLocation(block3, 0.3 - 0.2 * p, 0.1 + 0.6 * p, 0.5 + 0.2 * p, 0.5 + 0.4 * p)
}

function setBlockLocation(block, x1, y1, x2, y2) {
  x1 = x1.toFixed(2)
  y1 = y1.toFixed(2)
  x2 = x2.toFixed(2)
  y2 = y2.toFixed(2)
  block.value.style.height = parseInt((y2 - y1) * 100) + '%'
  block.value.style.width = parseInt((x2 - x1) * 100) + '%'
  block.value.style.top = parseInt(y1 * 100) + '%'
  block.value.style.left = parseInt(x1 * 100) + '%'
}

const updateBlockTh = utils.throttle(updateBlocks, 20)

</script>