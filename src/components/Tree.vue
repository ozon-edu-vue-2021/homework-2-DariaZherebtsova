<template>
  <div class="tree">
    <div class="tree__path-name">
      {{'selected file: ' + selectedItemPath}}
    </div>
    <ul class="tree__ul">
      <tree-item
        class="tree-item"
        :item="treeData"
        :pathName="pathName"
      ></tree-item>
    </ul>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
import treeData from '../../public/static/node_modules.json';
import TreeItem from './TreeItem.vue';

export default {
  name: 'Tree',
  components: { TreeItem },
  data: () => ({
    treeData: treeData,
    pathName: treeData.name,
    selectedItemPath: '',
    previousSelected: {},
  }),
  created () {
    eventBus.$on('select-item', value => {
      this.selectedItemPath = value
    });
  },
  beforeDestroy() {
    eventBus.$off('select-item');
  },
  provide: function () {
    return {
      setPreviousSelected: this.setPreviousSelected,
    }
  },
  methods: {
    setPreviousSelected: function(value){ 
      this.previousSelected.isSelected = false;
      this.previousSelected = value;
    },
  }
}
</script>

<style>
  .tree {
    padding-top: 40px;
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .tree__ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
  .tree__li {
    list-style-type: none;
  }
  .tree__path-name {
    position: fixed;
    top: 15px;
    left: 15px;
    height: 20px;
    padding: 10px;
    background-color: whitesmoke;
  }
</style>
