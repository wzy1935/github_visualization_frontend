export default {
  toTimeStamp: function toTimestamp(str) {
    return new Date(str).valueOf()
  },

  toDayStr: function toDayStr(timestamp) {
    let t = new Date(timestamp)
    return t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate()
  },

  toMinuteStr: function toMinuteStr(timestamp) {
    let t = new Date(timestamp)
    return this.toDayStr(timestamp) + ' ' + t.getHours() + ':' + t.getMinutes()
  }

}