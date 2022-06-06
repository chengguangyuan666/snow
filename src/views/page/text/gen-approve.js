define(['axios', 'scp'], function (axios, scp) {
  var approve = {
    init: function (_form) {
      console.log(_form, '234234')
      console.log(window.app, 'app')
      const params = window.app.$route.params
      const processKey = window.app.$route.params.processKey
      const query = window.app.$route.query
      const power_type = window.app.$route.params.Type
      console.log(params.flowId, 'this.$route.flowId')
      console.log(query, 'this.$route.query')
      if (params.flowId) {
        const flowId = params.flowId
        if (query.a != undefined & query.a != '') {
          scp.postback('/api/ac/generalreporting/generalReporting/getFlowById', {
            flowId: flowId,
            processKey: processKey,
            power_type: power_type,
            // flowId: '2a2d733aeeb7429794f49b403180fb76',
            id: query.a
          }, (ret) => {
            console.log(ret, '拿数据')
            _form.formout = JSON.parse(ret.data_json)
          })
        }
      }
    },

    // 直接提报接口
    declarebtn: function (_form) {
      if (window.app.$route.query.c == 'islook') {

      } else {
        const ajson = JSON.stringify(_form.formout)
        console.log(ajson, 'data_json')
        const flowId = window.app.$route.params.flowId
        const power_type = window.app.$route.params.Type
        const processKey = window.app.$route.params.processKey
        scp.postback('/api/ac/generalreporting/generalReporting/insertProcess', {
          flowId: flowId,
          processKey: processKey,
          power_type: power_type,
          key_id: window.app.$route.query.a,
          status: '0',
          data_json: ajson
        }, (ret) => {
          if (ret != undefined) {
            window.app.$Message.success('保存成功')
          } else {
            window.app.$Message.error('保存失败')
          }
          console.log(ret, '点击申报返回')
        })
      }
    },

    savebtn: function (_form) {
      if (window.app.$route.query.c == 'islook') {

      } else {
        const ajson = JSON.stringify(_form.formout)
        console.log(ajson, 'data_json')
        const flowId = window.app.$route.params.flowId
        const processKey = window.app.$route.params.processKey
        const power_type = window.app.$route.params.Type
        if (window.app.$route.query.a !== undefined & window.app.$route.query.a != '') {
          if (window.app.$route.query.b == 'isbohui') {
            scp.postback('/api/ac/generalreporting/generalReporting/updateFlow', {
              flowId: flowId,
              processKey: processKey,
              id: window.app.$route.query.a,
              power_type: power_type,
              data_json: ajson
            }, (ret) => {
              if (ret == 1) {
                window.app.$Message.success('保存成功')
              } else {
                window.app.$Message.error('保存失败')
              }
              console.log(ret, '修改后点击保存返回')
              const query = window.app.$route.query
              query.a = ''
              query.b = ''
              const location = {
                query
              }
              window.app.$router.push(location)
            })
          } else {
            scp.postback('/api/ac/generalreporting/generalReporting/updateFlow', {
              flowId: flowId,
              processKey: processKey,
              id: window.app.$route.query.a,
              power_type: power_type,
              data_json: ajson
            }, (ret) => {
              if (ret == 1) {
                window.app.$Message.success('保存成功')
              } else {
                window.app.$Message.error('保存失败')
              }
              console.log(ret, '修改后点击保存返回')
              const query = window.app.$route.query
              query.a = ''
              const location = {
                query
              }
              window.app.$router.push(location)
            })
          }
        } else {
          scp.postback('/api/ac/generalreporting/generalReporting/insertFlow', {
            flowId: flowId,
            processKey: processKey,
            power_type: power_type,
            status: '0',
            data_json: ajson
          }, (ret) => {
            if (ret == 1) {
              window.app.$Message.success('保存成功')
            } else {
              window.app.$Message.error('保存失败')
            }
            console.log(ret, '点击保存返回')
          })
        }
      }
    },
    getCookie: function () {
      // 获取指定名称的cookie的值
      var arrStr = document.cookie.split('; ')
      for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split('=')
        if (temp[0] == 'user') return unescape(temp[1]) // 解码
      }
      return ''
    }
  }

  return approve
})
