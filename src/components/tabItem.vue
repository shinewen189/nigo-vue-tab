<template>
    <div class="tab-con-item" :style="{width :tabWidth +'px' }">
            <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'tabItem',
        computed: {
            tabWidth() {
                return this.$parent.tabWidth
            }
        }
    }
</script>

