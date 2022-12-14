import req from './request.js'

async function parseResp(promise) {
  try {
    let resp = await promise
    return resp.data
  } catch (error) {
    return {
      code: -2,
      'message': 'unknown error'
    }
  }
}

export default {
  developerAmount: async function developerAmount(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/developers/amount'))
  },

  developerRank: async function developerRank(owner, repo, limit) {
    return await parseResp(req.get(owner + '/' + repo + '/developers/rank', {
      params: {
        limit: limit
      }
    }))
  },

  issueAmount: async function issueAmount(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/issues/amount'))
  },

  issueDistribution: async function issueDistribution(owner, repo, from, to, datapoint) {
    return await parseResp(req.get(owner + '/' + repo + '/issues/distribution', {
      params: {
        from: from,
        to: to,
        datapoint: datapoint
      }
    }))
  },

  issueDuration: async function issueDuration(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/issues/duration'))
  },

  issueWordcloud: async function issueWordcloud(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/issues/wordcloud'))
  },

  releaseAmount: async function releaseAmount(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/releases/amount'))
  },

  releaseCommits: async function releaseCommits(owner, repo, limit) {
    return await parseResp(req.get(owner + '/' + repo + '/releases/commits', {
      params: {
        limit: limit
      }
    }))
  },

  commitsDistribution: async function commitsDistribution(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/commits/distribution'))
  },

  generalIntroduction: async function generalIntroduction(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/general/introduction'))
  },

  generalStatus: async function generalStatus(owner, repo) {
    return await parseResp(req.get(owner + '/' + repo + '/general/status'))
  },

}