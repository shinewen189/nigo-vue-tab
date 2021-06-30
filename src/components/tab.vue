<template>
    <div class="tab" :style="{width : tabWidth +'px',height:tabHeight +'px',lineHeight:tabHeight+'px' }">
        <div class="tab-nav">
            <div class="tab-nav-con"
                 :style="{transform : `translatex(-${navWidth}px)`,width :tabNavWidth }">
                <a :class="[current===index?'current':'']"
                   :style="{backgroundColor:current === index ? themeColor :'' }"
                   v-for="(item,index) in content"
                   :key="item.id"
                   :ref="'a'+index"
                   v-on:[getIsNavMode].stop.prevent="switchTab(index,$event)">{{item}}</a>
            </div>
        </div>
        <div class="tab-con">
            <div class="j-tab-con"
                 :style="{transform:`translatex(-${contentWidth}px)`,width:setTabContentWidth}">
                <slot></slot>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'tab',
        props: {
            //自定义选项卡内容和导航标题
            content: Array,
            //自定义选项卡宽度
            tabWidth: {
                type: [String,Number],
                default: 500,
            },
            //自定义选项卡高度
            tabHeight: {
                type: [String,Number],
                default: 500,
            },
            //自定义颜色
            themeColor: {
                type: String,
                default: '#80b600'
            },
            //自定义事件模式 click| mouseover
            navMode: {
                type: String,
                default: 'click'
            }
        },
        data() {
            return {
                current: 0,  //当前
                mode: 'default', //显示模式
                navWidth: 0, //选项卡导航初始 x 轴值
                contentWidth: 0,//选项卡内容初始 x 轴值
            }
        },
        computed: {
            //计算选项卡导航总宽度
            tabNavWidth() {
                return (80 * this.content.length) + 'px'
            },
            //计算选项卡内容总宽度
            setTabContentWidth() {
                return this.tabWidth * this.content.length + 'px'
            },
            //计算传入的事件模式
            getIsNavMode() {
                return this.navMode === 'click' ? 'click' : 'mouseover'
            }
        },
        methods: {
            switchTab(index, ev) {
                const {layerX, target} = ev
                const tabWidth = Number(this.tabWidth)
                // 判断鼠标点击坐标 然后设置滚动
                if (layerX > tabWidth - target.offsetWidth*2 && layerX < tabWidth + target.offsetWidth) {
                    this.navWidth += target.offsetWidth * 2
                } else if (layerX > 0 && layerX < target.offsetWidth) {
                    this.navWidth -= target.offsetWidth * 2
                }
                if (this.navWidth < 0) this.navWidth = 0
                this.current = index
                this.contentWidth = index * tabWidth
            }
        }
    }
</script>

<style scoped>
    .tab {
        position: relative;
        overflow: hidden;
        border: 1px solid #ddd;
    }

    .tab-nav {
        height: 30px;
        overflow: hidden;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
    }

    .tab-nav a {
        display: block;
        float: left;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        text-decoration: none;
        color: #999;
        cursor: pointer;
    }

    .tab-nav a.current {
        color: #fff;
    }

    .tab-con {
        transition-duration: 500ms;
        transition-timing-function: ease-out;
        position: relative;
        overflow: hidden;
    }

    .tab-con-item {
        float: left;
    }

    .j-tab-con {
        overflow: hidden;
        transition-duration: 500ms;
        transition-timing-function: ease-out;
        cursor: grab;
    }

    .tab-nav-con {
        overflow: hidden;
        transition-duration: 500ms;
        transition-timing-function: ease-out;
    }
</style>
