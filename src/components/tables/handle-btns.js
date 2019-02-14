const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?',
        transfer: true
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-trash',
            size: 18,
            color: '#000000'
          }
        })
      ])
    ])
  },
  save: (h, params, vm) => {
    // 新增还显示内容
    if (params.row['isNew']) {
      return h('Poptip', {
        props: {
          confirm: true,
          title: '你确定要保存吗?',
          placement: 'top',
          transfer: true
        },
        on: {
          'on-ok': () => {
            vm.$emit('on-saveRow', params)
          }
        }
      }, [
        h('Button', '保存')
      ])
    }

  },
  edit: (h, params, vm) => {
    return h('span', {
      props: {
        confirm: false,
        title: '你确定要删除吗?',
        transfer: true
      },
      on: {
        'click': () => {
          vm.$emit('on-edit', params, vm)
          // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-create',
            size: 18,
            color: '#000000'
          }
        })
      ])
    ])
  }
}

export default btns
