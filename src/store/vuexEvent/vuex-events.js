// vuex-events.js
import events from './events'
export default function (store) {
    console.log(events)
  events.mixTo(store)
  store.registerModule('myEvents', {
    mutations: {
      setEvent() {}
    }
  })
  console.log(store)
  store.$emit = function (evt, ...arg) {
    console.log("触发了事件"+evt,this.events)
    
    if (!this.events[evt]) return
    this.trigger(evt, ...arg)
    this.commit('setEvent', evt)
  }
}
