<template>
    <ul class="WrapClasses" :style="styles" >
        <li
            title="上一页"
            :class="prevClasses"
            @click="prev">
           <a><template v-if="prevText !== ''">{{ prevText }}</template><i v-else class="ivu-icon ivu-icon-ios-arrow-back"></i></a>
        </li>
        <li  class="ivu-page-item ivu-page-item-active">
            <span>{{currentPage}}</span>
        </li>
        <li
            title="下一页"
            :class="nextClasses"
            @click="next">
            <a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a>
        </li>
        <Select v-model="pageSelect"  style="width:100px;margin-left:5px;" @on-change="selectChange">
        <Option v-for="item in pageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </ul>
  </template>
  <script>
    const prefixCls = 'ivu-page';
    export default {
        name: 'bigPage',
        // mixins: [ Locale ],
        // components: { Options },
        props: {
            current: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeOpts: {
                type: Array,
                default () {
                    return [10, 20, 30, 40];
                }
            },
            placement: {
                // validator (value) {
                //     return oneOf(value, ['top', 'bottom']);
                // },
                default: 'bottom'
            },
            transfer: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
                }
            },
            size: {
                // validator (value) {
                //     return oneOf(value, ['small']);
                // }
            },
            simple: {
                type: Boolean,
                default: false
            },
            showTotal: {
                type: Boolean,
                default: false
            },
            showElevator: {
                type: Boolean,
                default: false
            },
            showSizer: {
                type: Boolean,
                default: false
            },
            className: {
                type: String
            },
            styles: {
                type: Object
            },
            prevText: {
                type: String,
                default: ''
            },
            nextText: {
                type: String,
                default: ''
            },
            hasNext:{
              type:Boolean,
              default:true
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                currentPage: this.current,
                currentPageSize: this.pageSize,
                pageList:[{
                  label:'10 条/页',
                  value:10
                },{
                  label:'20 条/页',
                  value:20
                },{
                  label:'30 条/页',
                  value:30
                }],
                pageSelect:10

            };
        },
        watch: {
            total (val) {
                let maxPage = Math.ceil(val / this.currentPageSize);
                if (maxPage < this.currentPage ) {
                    this.currentPage = (maxPage === 0 ? 1 : maxPage);
                }
            },
            current (val) {
                this.currentPage = val;
            },
            pageSize (val) {
                this.currentPageSize = val;
            }
        },
        computed: {
            isSmall () {
                return !!this.size;
            },
            allPages () {
                const allPage = Math.ceil(this.total / this.currentPageSize);
                return (allPage === 0) ? 1 : allPage;
            },
            simpleWrapClasses () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-simple`,
                    {
                        [`${this.className}`]: !!this.className
                    }
                ];
            },
            simplePagerClasses () {
                return `${prefixCls}-simple-pager`;
            },
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${this.className}`]: !!this.className,
                        'mini': !!this.size
                    }
                ];
            },
            prevClasses () {
                return [
                    `${prefixCls}-prev`,
                    {
                        [`${prefixCls}-disabled`]: this.currentPage === 1,
                        [`${prefixCls}-custom-text`]: this.prevText !== ''
                    }
                ];
            },
            nextClasses () {
                return [
                    `${prefixCls}-next`,
                    {
                        [`${prefixCls}-disabled`]: !this.hasNext,
                        [`${prefixCls}-custom-text`]: this.nextText !== ''
                    }
                ];
            },
            firstPageClasses () {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.currentPage === 1
                    }
                ];
            },
            lastPageClasses () {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.currentPage === this.allPages
                    }
                ];
            }
        },
        methods: {
          selectChange(val){
             this.$emit("on-pageChange",this.pageSelect);
          },
            changePage (page) {

                if (this.currentPage != page) {
                    this.currentPage = page;
                    this.$emit('update:current', page);
                    this.$emit('on-change', page);
                }
            },
            prev () {
                const current = this.currentPage;
                if (current <= 1) {
                    return false;
                }
                this.changePage(current - 1);
            },
            next () {
                const current = this.currentPage;
                console.log("next",current)

                this.changePage(current + 1);
            },
            fastPrev () {
                const page = this.currentPage - 5;
                if (page > 0) {
                    this.changePage(page);
                } else {
                    this.changePage(1);
                }
            },
            fastNext () {
                const page = this.currentPage + 5;
                if (page > this.allPages) {
                    this.changePage(this.allPages);
                } else {
                    this.changePage(page);
                }
            },
            onSize (pageSize) {
                this.currentPageSize = pageSize;
                this.$emit('on-page-size-change', pageSize);
                this.changePage(1);
            },
            onPage (page) {
                this.changePage(page);
            },
            keyDown (e) {
                const key = e.keyCode;
                const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39;
                if (!condition) {
                    e.preventDefault();
                }
            },
            keyUp (e) {
                const key = e.keyCode;
                const val = parseInt(e.target.value);
                if (key === 38) {
                    this.prev();
                } else if (key === 40) {
                    this.next();
                } else if (key === 13) {
                    let page = 1;
                    if (val > this.allPages) {
                        page = this.allPages;
                    } else if (val <= 0 || !val) {
                        page = 1;
                    } else {
                        page = val;
                    }
                    e.target.value = page;
                    this.changePage(page);
                }
            }
        }
    };
</script>
