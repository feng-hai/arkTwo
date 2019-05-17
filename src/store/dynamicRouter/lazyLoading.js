// 懒加载组件
function lazy(name) {
  try {

    if (name == 'main') {
      return () =>
        import (`@/components/${name}`)
    }
    else if (name == 'parentView') {
      return () =>
        import ("@/components/parent-view")

    }else if (name == 'parentViewBig') {
      return () =>
        import ("@/components/parent-view-big")
    } else {
      //let file = name.split('_')[0]
      return () =>
        import (`@/view/${name}.vue`)
    }
  } catch (ex) {

  }
}
export {
  lazy
}
