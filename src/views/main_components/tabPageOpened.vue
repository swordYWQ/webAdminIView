<template>
    <div ref="scrollCon" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <!-- <div class="close-all-tag-con">
            <Dropdown @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div> -->
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
              <!-- <Tag 
                    type="dot"
                    ref="tagsPageOpened"
                    name="home" 
                    :key="'home'"
                    @on-close="closePage"
                    @click.native="linkTo("home")"
                    :closable="false"
                    :color="('home'===currentPageName?'blue':'default'):('home'===currentPageName?'blue':'default')"
                >主页</Tag> -->
                <!-- <Tag 
                  ref="tagsPageOpened" 
                  type="dot" 
                  :name="defaultHome.name" 
                  :key="defaultHome.name" 
                  :color="defaultHome.name===currentPageName?'blue':'default'" 
                  @click.native="linkTo(defaultHome)" 
                  @on-close="closePage" 
                  color="blue">{{defaultHome.title}}</Tag> -->
                <Tag 
                    type="dot"
                    v-for="(item, index) in cachePage" 
                    ref="tagsPageOpened"
                    :key="item.name" 
                    :name="item.name" 
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='home'?false:true"
                    :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'green':'default')"
                >{{ item.title }}</Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPageName: this.$route.name,
            tagBodyLeft: 0,
            currentScrollBodyWidth: 0,
            tagsCount: 1
        };
    },
    computed: {
        title () {
            return this.$store.state.currentTitle;
        },
        cachePage(){
          return this.$store.state.cachePage
        },
        refsTag(){
          return this.$refs.tagsPageOpened || []
        }
    },
    methods: {
        closePage (event, name) {
            this.$store.commit('closePage', name);
            setTimeout(()=>{
                if (this.currentPageName === name) {
                let lastPageName = '';
                if (this.cachePage.length > 1) {
                    lastPageName = this.cachePage[1].name;
                } else {
                    lastPageName = 'home' // this.cachePage[0].name;
                }
                this.$router.replace({
                    name: lastPageName
                });
            }
            })
        },
        linkTo (item) {
          this.$router.push({name: item.name});
        },
        handlescroll (e) {
            let left = 0;
            if (e.wheelDelta > 0) {
                left = Math.min(0, this.tagBodyLeft + e.wheelDelta);
            } else {
                if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                    if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                        left = this.tagBodyLeft;
                    } else {
                        left = Math.max(this.tagBodyLeft + e.wheelDelta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                    }
                } else {
                    this.tagBodyLeft = 0;
                }
            }
            this.tagBodyLeft = left;
        },
        // handleTagsOption (type) {
        //     if (type === 'clearAll') {
        //         this.$store.commit('clearAllTags');
        //     } else {
        //         this.$store.commit('clearOtherTags', this);
        //     }
        //     this.tagBodyLeft = 0;
        // },
        moveToView (tag) {
            if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + 10;
            } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                // 标签在可视区域
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
            }
        }
    },
    mounted () {
        setTimeout(() => {
            this.refsTag.forEach((item, index) => {
                if (this.$route.name === item.name) {
                    let tag = this.refsTag[index].$el;
                    this.moveToView(tag);
                }
            });
        }, 1);  // 这里不设定时器就会有偏移bug
        this.tagsCount = this.cachePage.length;
    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            this.$nextTick(() => {
                this.refsTag.forEach((item, index) => {
                    if (to.name === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            });
            this.tagsCount = this.cachePage.length;
        }
    }
};
</script>
