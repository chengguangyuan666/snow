define(['./utils/loader'], function (loader) {
  let pathBase = ''
  if (window.location.pathname.indexOf('/scpcw/') > 0) {
    pathBase = window.location.pathname.substring(0, window.location.pathname.indexOf('/scpcw/'))
  }
  var extend = {}
  extend.enviro = '${server.enviro}'
  extend.document = { title: '沈阳市行权治理（监督）一体化平台', iconHref: './src/favicon.ico' }
  // 路由文件，申明路由，哪些页面的。
  if (extend.enviro == 'prod') {
    extend.router = {
      routes: [
        {
          path: '/',
          name: 'layout',
          component: loader('./pages/admin/layout/index'),
          meta: {
            closeHeaderMenu: true,
            headerTextStyle: {
              text: '沈阳市行权治理（监督）一体化平台',
              lineWidth: '670px',
              url: 'http://bizportal.lngov.top'
            },
            outUrl: 'http://uia.lngov.top/api/logout',
            path: 'http://bizportal.lngov.top',
            justLoginUrl: 'http://uia.lngov.top/api/oauth/authorize?client_id=scp-generalreporting&redirect_uri=http%3A%2F%2Fgeneralreporting.lngov.top%2Fapi%2Fur%2Fsc%2Flogin%2FloginToken&response_type=code&state=%2F'
          },
          children: [
            { path: '/index', name: 'index', component: loader('./pages/base/home/index') },
            {
              path: '/generalreporting/generalReport/approveIndex/:processKey/:flowId/:Type',
              name: 'approveIndex',
              component: loader(pathBase + '/scpcw/generalreporting/generalReport/approveIndex/index.js?v=' + '1223'),
              meta: {
                headerTextStyle: {
                  url: 'http://bizportal.tripln.com'
                }
              }
            }
          ]
        },
        { path: '/login', name: 'login', component: loader('./pages/admin/login/login') },
        {
          path: '/index',
          name: 'index',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page/index.js')
        },

        {
          path: '/generalreporting/generalReport/lmq-home-page/:processKey/:flowId/:Type',
          name: 'generalReport',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/lmq-home-page1/:processKey/:flowId/:Type',
          name: 'generalReport',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page1/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/DeclarationGuide/:processKey/:flowId/:Type',
          name: 'DeclarationGuide',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/DeclarationGuide/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/DeclarationGuide1/:processKey/:flowId/:Type',
          name: 'DeclarationGuide',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/DeclarationGuide1/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },

        {
          path: '/home_index',
          name: 'home_index',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/homePage/index.js')
        }

      ],
      dynamicBasePath: '/'
    }
  } else {
    extend.router = {
      routes: [
        {
          path: '/',
          name: 'layout',
          component: loader('./pages/admin/layout/index'),
          meta: {
            closeHeaderMenu: true,
            headerTextStyle: {
              text: '沈阳市行权治理（监督）一体化平台',
              lineWidth: '670px',
              url: 'http://bizportal.tripln.com'
            },
            outUrl: 'http://uia.qstb.top/api/logout',
            path: 'http://bizportal.tripln.com',
            justLoginUrl: 'http://uia.qstb.top/api/oauth/authorize?client_id=scp-generalreporting&redirect_uri=http%3A%2F%2Fbeta.tripln.com%2Fscp-generalreporting%2Fapi%2Fur%2Fsc%2Flogin%2FloginToken&response_type=code&state=%2F'
          },
          children: [
            { path: '/index', name: 'index', component: loader('./pages/base/home/index') }

          ]
        },
        { path: '/login', name: 'login', component: loader('./pages/admin/login/login') },

        {
          path: '/index',
          name: 'index',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page/index.js')
        },

        {
          path: '/generalreporting/generalReport/lmq-home-page/:processKey/:flowId/:Type',
          name: 'generalReport',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/lmq-home-page1/:processKey/:flowId/:Type',
          name: 'generalReport',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/lmq-home-page1/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/DeclarationGuide/:processKey/:flowId/:Type',
          name: 'DeclarationGuide',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/DeclarationGuide/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },
        {
          path: '/generalreporting/generalReport/DeclarationGuide1/:processKey/:flowId/:Type',
          name: 'DeclarationGuide',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/DeclarationGuide1/index.js?v=' + '122113'),
          meta: {
            headerTextStyle: {
              url: 'http://bizportal.tripln.com'
            }
          }
        },

        {
          path: '/home_index',
          name: 'home_index',
          component: loader(pathBase + '/scpcw/generalreporting/generalReport/homePage/index.js')
        }

      ],
      dynamicBasePath: '/'
    }
  }

  extend.require = {
    config: {
      urlArgs: 'v=' + (new Date()).getTime(),
      paths: {
        iview: '../libs/vue-iview/iview.min',
        'base-admin': 'http://base.tripln.com/scpcw-base-admin/scpcw-base-admin.umd.min',
        storeP: './utils/vuex-store-base-admin',
        'hd-plugin-gather': 'http://base.tripln.com/hd-plugin-gather/hd-plugin-gather.umd.min',
        approve: '../generalreporting/approve'
      },
      shim: {
        iview: ['vue']
      }
    },
    require_param1: ['vue', 'iview', 'base-admin', 'hd-plugin-gather', 'approve', 'css!http://base.tripln.com/scpcw-base-admin/scpcw-base-admin.css', 'css!http://base.tripln.com/hd-plugin-gather/hd-plugin-gather.css'],
    require_param2: function (Vue, iview, baseadmin, hdPluginGather, approve) {
      Vue.use(iview)
      Vue.use(baseadmin.default)
      Vue.use(hdPluginGather.default)

      Vue.prototype.$approve = approve
    }
  }

  return extend
})
