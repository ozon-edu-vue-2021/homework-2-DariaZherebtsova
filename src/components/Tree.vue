<template>
  <div>
    <div class="sticky">{{selectedItemPath}}</div>
    <ul>
      <tree-item
        class="item"
        :item="treeData"
        :pathName="pathName"
        @select-item="onSelectItem"
      ></tree-item>
    </ul>
  </div>
</template>

<script>
// import treeData from '../../public/static/node_modules.json';
import treeData from '../test_data.json';
import TreeItem from './TreeItem.vue';

export default {
  name: 'Tree',
  components: { TreeItem },

  data: () => ({
    treeData: treeData,
    pathName: treeData.name,
    selectedItemPath: '--------',
  }),

  methods: {
    onSelectItem: function(value) {
      console.log('Принял');
      this.selectedItemPath = value;
    }
  }
}
</script>

<style>
  .sticky {
    position: sticky;
  }

</style>