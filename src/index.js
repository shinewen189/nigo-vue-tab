import Tab from './components/tab'
import TabItem from './components/tabItem'

export default {
    install(Vue) {
        Vue.component('tab', Tab);
        Vue.component('TabItem', TabItem);
    },
};

export  {
    Tab,
    TabItem
}
