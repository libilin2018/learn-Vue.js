Vue.component('pane',{
    name:'pane',
    template:'\
        <div :class="getCls()">\
            <slot></slot>\
        </div>',
    props:{
        name: {
            type:String 
        },
        label: {
            type:String,
            default:''
        },
        closable: {
            type: Boolean,
            default: true
        }
    },
    data:function(){
        return{
            show:true
        }
    },
    methods:{
        updateNav (){
            this.$parent.updateNav();
        },
        // 决定pane是否显示
        getCls () {
            return [
                'pane',
                {
                    'pane-active': this.show
                }
            ]
        }
    },
    watch:{
        label(){
            this.updateNav();
        }
    },
    mounted(){
        this.updateNav();
    }
})
