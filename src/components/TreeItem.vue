<template>
  <li class="tree__li">
    <div
      :class="['tree-item__name', {
        'tree-item__name_bold': isOpen,
        'tree-item__name_selected': isSelected,
        'tree-item__name_underscored': isUnderscored
      }]"
      @click="toggle"
      @mouseenter="onMouseHover"
      @mouseleave="onMouseHover"
    >
      <component class="tree-item__icon" :is="suitableIconComponent"></component>
      {{ item.name }}
    </div>
    <ul v-if="isOpenedFolder" class="tree__ul">
      <tree-item
        class="tree-item"
        v-for="(child, index) in item.contents"
        :key="`${child.name}-${index}`"
        :item="child"
        :pathName="`${pathName}/${child.name}`"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
import {eventBus} from '../main.js'
import getIcon from '../utils/iconTypes';
import IconFolder from './Icons/IconFolder.vue';
import IconLink from './Icons/IconLink.vue';
import IconFile from './Icons/IconFile.vue';

export default {
  name: 'TreeItem',
  components: { IconFolder, IconLink, IconFile },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    pathName: {
      type: String,
      default: '',
    }
  },
  data: function() {
    return {
      isOpen: false,
      isSelected: false,
      isUnderscored: false,
    };
  },
  beforeDestroy() {
    eventBus.$emit('select-item', '');
  },
  computed: {
    isFolder: function() {
      return this.item.type === 'directory';
    },
    isOpenedFolder: function() {
      return this.isFolder && this.isOpen;
    },
    suitableIconComponent: function() {
      return this.getIcon(this.item.type);
    },
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      } else {
        this.isSelected = !this.isSelected;
        const selectedName = this.isSelected ? this.pathName : '';
        eventBus.$emit('select-item', selectedName);
        this.$root.previousSelected.isSelected = false;
        this.$root.previousSelected = this;
      }
    },
    onMouseHover: function() {
      if (this.item.type === 'link') {
        this.isUnderscored = !this.isUnderscored;
      }
    },
    getIcon,
  }
}
</script>

<style scoped>
  .tree-item {
    cursor: pointer;
  }
  .tree-item__icon {
    vertical-align: text-top;
  }
  .tree-item__name{
    display: inline-block;
    padding-right: 5px;
  }
  .tree-item__name_bold {
    font-weight: bold;
  }
  .tree-item__name_selected {
    background-color:rgba(128, 255, 0, 0.294);
  }
  .tree-item__name_underscored {
    text-decoration: underline;
  }
</style>
