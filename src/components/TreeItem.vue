<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
    >
      <span class="icon-wrapper">
        <component v-bind:is="currentIconComponent"></component>
      </span>
      {{ item.name }}
    </div>
    <ul v-if="isExist">
      <tree-item
        class="item"
        v-for="(child, index) in item.contents"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
import IconFolder from './Icons/IconFolder.vue';
import IconLink from './Icons/IconLink.vue';
import IconFile from './Icons/IconFile.vue';
import getIcon from '../utils/iconTypes';

export default {
  name: 'TreeItem',
  components: { IconFolder, IconLink, IconFile },
  props: {
    item: Object,
  },
  data: function() {
    return {
      isOpen: false,
    };
  },
  mounted: function () {
    console.log('---mounted', this.getIcon('file'));
  },
  computed: {
    isFolder: function() {
      // return this.item.contents && this.item.contents.length;
      return this.item.type === 'directory';
    },
    isExist: function() {
      return this.isFolder && this.isOpen;
    },
    currentIconComponent: function() {
      // console.log('--this.item.type', this.item.type);
      // console.log('--icon', iconTypes[this.item.type]);
      return this.getIcon(this.item.type);
      // if (this.isFolder) {
      //   return 'IconFolder';
      // }
      // else {
      //   return 'IconLink'
      // }
    },
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    getIcon: getIcon,
  }
}
</script>

<style scoped>
  .icon-wrapper {
    vertical-align: text-top;
  }

</style>