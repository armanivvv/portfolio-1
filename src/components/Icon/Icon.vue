<template lang="pug">
  svg.icon(:class="{ 'pointer': isPointer, 'icon--w-full': isFullWidth }", @click="onClick")
    use(:xlink:href="href", :href="href")
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      type: {
        type: String,
        required: true,
      },
      isPointer: {
        type: Boolean,
        default: false,
      },
      isFullWidth: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      href() {
        return `#${this.type}`
      },
    },
    methods: {
      onClick() {
        this.$emit('click')
      },
    },
  }
</script>

<style src="./Icon.sass" lang="sass" scoped></style>
