<template>
  <li>
    <div
      :class="['item-name', {bold: isFolder, selected: isSelected, underscored: isUnderscored}]"
      @click="toggle"
      @mouseenter="onMouseHover"
      @mouseleave="onMouseHover"
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
        :key="`${child.name}-${index}`"
        :item="child"
        :pathName="`${pathName}/${child.name}`"
        @select-item="onSelectItem"
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
  mounted: function () {
    console.log('---mounted', this.pathName);
  },
  computed: {
    isFolder: function() {
      return this.item.type === 'directory';
    },
    isExist: function() {
      return this.isFolder && this.isOpen;
    },
    currentIconComponent: function() {
      return this.getIcon(this.item.type);
    },
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      } else {
        this.isSelected = !this.isSelected;
        this.$emit("select-item", this.pathName);
        console.log(this.pathName);
      }
    },
    onMouseHover: function() {
      if (this.item.type === 'link') {
        this.isUnderscored = !this.isUnderscored;
      }
    },
    onSelectItem: function(value) {
      this.$emit("select-item", value);
    },
    getIcon,
  }
}
</script>

<style scoped>
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  .icon-wrapper {
    vertical-align: text-top;
  }
  .item-name{
    display: inline-block;
    padding-right: 5px;
  }
  .selected {
    background-color:rgba(128, 255, 0, 0.294);
  }
  .underscored {
    text-decoration: underline;
  }
</style>