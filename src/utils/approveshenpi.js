define(['axios', 'scp'], function (axios, scp) {
  var approve = {
    defautCallback: function () {
      console.log(11111)
    },
    init: function (_form, callback) {
      if (typeof (callback) !== 'function' || callback == undefined) {
        callback = this.defautCallback
      }
      console.log(_form, '_form')
      if (_form.query.ids && _form.query.ids.hasOwnProperty('approve_state')) {
        if (_form.query.ids.approve_state === '0') {
          scp.postback('/api/ac/bizapprove/remoteCall/readInfoList', {
            flowstepId: _form.query.ids.id,
            nodeId: _form.query.ids.node_id
          }, (ret) => {
            console.log(ret.result, 'daaaaaa')
            if (ret.code === 200) {
              _form.formin = JSON.parse(ret.result.info_list)
              _form.formout = JSON.parse(ret.result.info_list)
              callback(_form)
              console.log(_form.formin, 'val.formin')
            } else {
              window.app.$Message.error(ret.msg)
            }
          })
        } else {
          scp.postback('/api/ac/bizapprove/remoteCall/readInfoList', {
            flowstepId: _form.query.ids.id,
            nodeId: _form.query.ids.node_id
          }, (ret) => {
            console.log(ret.result, 'daaaaaa')
            if (ret.code === 200) {
              _form.formin = JSON.parse(ret.result.info_list)
              callback(_form)
              console.log(_form.formin, 'val.formin')
            } else {
              window.app.$Message.error(ret.msg)
            }
          })
          scp.postback('/api/ac/bizapprove/dynamicService/getFlowApprovalDataById', {
            process_instanceId: _form.query.ids.process_instance_id
          }, (ret) => {
            console.log(ret.result, 'daaaaaa')
            console.log(ret, 'ret!!!')
            if (ret.errcode === 0) {
              console.log(ret, 'ret!!!')
              const results = JSON.parse(ret.result.new_data)
              console.log(results, 'results')
              const newres = results
              const arr = Object.values(newres)
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < Object.keys(newres).length; j++) {
                  arr[i].activeId = Object.keys(newres)[i]
                }
              }
              console.log(arr, 'arr')
              arr.forEach(item => {
                if (item.activeId === _form.query.ids.activity_id) {
                  _form.formout = item.body
                  console.log(_form.formout, '_formout')
                }
              })
              callback(_form)
              console.log(_form.formin, 'val.formin')
            } else {
              window.app.$Message.error(ret.msg)
            }
          })
        }
      }
      // 9月27
      const params = window.app.$route.params
      const processKey = window.app.$route.params.processKey
      const query = window.app.$route.query
      if (params.flowId) {
        const flowId = params.flowId
        if (query.a != undefined & query.a != '') {
          scp.postback('/api/ac/generalreporting/generalReporting/getFlowById', {
            flowId: flowId,
            processKey: processKey,
            // flowId: '2a2d733aeeb7429794f49b403180fb76',
            id: query.a
          }, (ret) => {
            console.log(ret, '拿数据')
            _form.formout = JSON.parse(ret.data_json)
          })
        }
      }
    },
    btnDoAction: function (_form, _status) {
      console.log(_form, '234234')
      _form.formout.id = _form.query.ids.id
      _form.formout.status = _status

      const temp = Object.keys(_form.formin)
      for (let i = 0; i < temp.length; i++) {
        if (_form.formout.hasOwnProperty(temp[i])) {
          delete _form.formout[temp[i]]
        }
      }
      console.log(_form.formout, 'this.form.formout2')

      scp.postback('/api/ac/bizapprove/reportServiceImpl/saveAuditItemInfo', _form.formout, (ret) => {
        console.log(ret.result, 'daaaaaa')
        if (ret.result === '200') {
          window.app.$Message.success('成功')
          window.app.$router.push({ path: '/bizapprove/ymxr/dbsxlistpage' })
        } else {
          window.app.$Message.error('审批失败')
        }
      })
    },

    // 9月27
    // 直接提报接口
    declarebtn: function (_form) {
      if (window.app.$route.query.c == 'islook') {

      } else {
        const ajson = JSON.stringify(_form.formout)
        console.log(ajson, 'data_json')
        const flowId = window.app.$route.params.flowId
        const processKey = window.app.$route.params.processKey
        scp.postback('/api/ac/generalreporting/generalReporting/insertProcess', {
          flowId: flowId,
          processKey: processKey,
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
        if (window.app.$route.query.a !== undefined & window.app.$route.query.a != '') {
          if (window.app.$route.query.b == 'isbohui') {
            scp.postback('/api/ac/generalreporting/generalReporting/updateFlow', {
              flowId: flowId,
              processKey: processKey,
              id: window.app.$route.query.a,
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
    }
  }

  return approve
})
