import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import AboutUs from '@/components/aboutUs'
import InquiryBoardList from '@/components/inquiryBoardList'
import InquiryWrite from '@/components/inquiryWrite'
import InquiryDetail from '@/components/inquiryDetail'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(Router);
Vue.use(VueLodash, lodash); // import lodash module


export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/inquiryBoardList',
        name: 'inquiryBoardList',
        component: InquiryBoardList
      },
      {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs
      },
      {
        path: '/inquiryWrite',
        name: 'inquiryWrite',
        component: InquiryWrite
      }
      ,
      {
        path: '/inquiryDetail',
        name: 'inquiryDetail',
        component: InquiryDetail
      }
    ]
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
