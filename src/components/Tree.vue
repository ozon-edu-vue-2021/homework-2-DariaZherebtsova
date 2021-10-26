<template>
  <div>
    <div class="path-name">{{'selected file: ' + selectedItemPath}}</div>
    <ul class="tree">
      <tree-item
        class="item"
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
  }),

  created () {
    eventBus.$on('select-item', value => {
      this.selectedItemPath = value
    });
    // знаю что в больших проектах так не делают, но мы же ещё не проходили Vuex ;)
    this.$root.previousSelected = {};
  },
}
</script>

<style>
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
  li {
    list-style-type: none;
  }
  .tree {
    padding-top: 50px;
  }
  .path-name {
    position: fixed;
    height: 20px;
    padding: 10px;
    background-color: whitesmoke;
  }
</style>