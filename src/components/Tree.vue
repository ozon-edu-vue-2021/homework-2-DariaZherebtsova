<template>
  <ul id="demo">
    <tree-item
      class="item"
      :item="treeData"
    ></tree-item>
  </ul>
</template>

<script>
import treeData from '../test_data.json';
// import treeData from '../treeData';
import TreeItem from './TreeItem.vue';

// const treeData = {
//   name: "My Tree",
//   children: [
//     { name: "hello" },
//     { name: "wat" },
//     {
//       name: "child folder",
//       children: [
//         {
//           name: "child folder",
//           children: [{ name: "hello" }, { name: "wat" }]
//         },
//         { name: "hello" },
//         { name: "wat" },
//         {
//           name: "child folder",
//           children: [{ name: "hello" }, { name: "wat" }]
//         }
//       ]
//     }
//   ]
// };

export default {
  name: 'Tree',
  components: { TreeItem },

  data: () => ({
    treeData: treeData
  }),

  mounted: function () {
    // console.log('---this.treeData', this.treeData);
  },

  methods: {
  }

}
</script>

<style>

</style>