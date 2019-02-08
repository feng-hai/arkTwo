export default {
  name: 'searchExpand',
  functional: true,
  props: {
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, ctx) => {
    const params = {
    };
    if (ctx.props.column) params.column = ctx.props.column;
    return ctx.props.render(h, params);
  }
};
