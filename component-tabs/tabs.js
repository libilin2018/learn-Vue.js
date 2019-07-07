Vue.component('tabs',{
    template:' \
	  <div class="tabs"> \
	      <div class="tabs-bar"> \
	          <div \
                :class="tabCls(item)" \
                v-for="(item,index) in navList" \
                @click="handleChange(index)">\
                    {{item.label}} \
                    <span v-if="ifShowClose(item)" class="close icon" @click.stop="closeTab(index)"></span> \
	          </div> \
	      </div> \
	      <div class="tabs-content"> \
	         <slot></slot> \
	      </div> \
	  </div>',
    props: {
        value: {
            type:[String,Number]
        }
    },
    data: function(){
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function(item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active':item.name===this.currentValue
                }
            ]
        },
        getTabs () {
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function(item){
                return item.$options.name==='pane';
            })
        },
        updateNav () {
            this.navList=[];
            var _this=this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name||index,
                    closable: pane.closable
                });
                if(!pane.name){
                        pane.name=index;
                }
                if(index==0){
                    if(!_this.currentValue){
                        _this.currentValue=pane.name||index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus () {
            var tabs=this.getTabs();
            var _this=this;
            // 显示当前选中的tab对应的pane组件
            tabs.forEach(function(tab){
                return tab.show = tab.name === _this.currentValue;
            })
        },
        handleChange: function(index){
            var nav=this.navList[index];
            var name=nav.name;
            // 更新当前选择的tab
            this.currentValue=name;
            // 更新value
            this.$emit('input',name);
        },
        ifShowClose (item) {
            // 是否显示关闭标签按钮
            return item.closable;
        },
        // 点击关闭按钮触发的事件
        closeTab (index) {
            // console.log(this.navList[index].name, this.currentValue);
            // 如果关闭的是当前选择的tab，则将currentValue转到前一个tab
            if (this.navList[index].name == this.currentValue) {
                let toIndex = index - 1;
                toIndex = toIndex >=0 ? toIndex : this.navList.length + toIndex;
                console.log(toIndex);
                this.currentValue = this.navList[toIndex].name;
            }
            //关闭当前标签页
            this.navList.splice(index, 1);
        }
    },
    watch:{
        value: function(val){
            this.currentValue=val;
        },
        currentValue: function(){
            this.updateStatus();
        }
    }
})