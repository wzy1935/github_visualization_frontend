import req from './request.js'
import axios from 'axios'

async function parseResp(promise) {
  try {
    let resp = await promise
    return resp.data
  } catch (error) {
    return {
      code: -100,
      'message': 'unknown error (network error maybe)'
    }
  }
}

export default {
  developerAmount: async function developerAmount(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/developers/amount'))
  },

  developerRank: async function developerRank(owner, repo, limit) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/developers/rank', {
      params: {
        limit: limit
      }
    }))
  },

  issueAmount: async function issueAmount(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/issues/amount'))
  },

  issueDistribution: async function issueDistribution(owner, repo, from, to, datapoint) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/issues/distribution', {
      params: {
        from: from,
        to: to,
        datapoint: datapoint
      }
    }))
  },

  issueDuration: async function issueDuration(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/issues/duration'))
  },

  issueWordcloud: async function issueWordcloud(owner, repo, limit) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/issues/wordcloud', {
      params: {
        limit: limit
      }
    }))
  },

  releaseAmount: async function releaseAmount(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/releases/amount'))
  },

  releaseCommits: async function releaseCommits(owner, repo, limit) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/releases/commits', {
      params: {
        limit: limit
      }
    }))
  },

  commitsDistribution: async function commitsDistribution(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/commits/distribution'))
  },

  generalIntroduction: async function generalIntroduction(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/general/introduction'))
  },

  generalStatus: async function generalStatus(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/general/status'))
  },

  generalCode: async function generalCode(owner, repo) {
    return await parseResp(req.get('repo/' + owner + '/' + repo + '/general/code'))
  },

  submitTask: async function submitTask(owner, repo, token) {
    return await parseResp(req.post('submit/repo/' + owner + '/' + repo, null, {
      headers: {
        'github_token': token
      }
    }))
  },

  submitQueue: async function submitQueue() {
    return await parseResp(req.get('submit/queue'))
  },

  authCode: async function authCode() {
    return await parseResp(req.get("oauth/code"))
  },
}