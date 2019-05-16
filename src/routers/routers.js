import JieMengList from '../components/JieMengList.vue'
import SearchTip from '../components/SearchTip.vue'
import Search from '../components/Search.vue'

const routers = [
    {
      path: '/',
      component: JieMengList
    },
    {
        path:'/searchtip',
        component: SearchTip
    },
    {
        path:'/search/:sw',
        component:Search,
        props: true
    }
]

export default routers