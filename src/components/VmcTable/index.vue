<template>
  <div class="mdc-data-table">
    <table class="mdc-data-table__table">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th v-for="{text, value, rightAlign} in headers" :key="`header-${value}`" class="mdc-data-table__header-cell"
            :class="rightAlign && 'mdc-data-table__header-cell--numeric'"
            scope="col">{{text}}</th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        <tr v-for="(item, indx) in items" :key="`row-${indx}`" class="mdc-data-table__row">
          <td v-for="{value, rightAlign} in headers" :key="`cell-${value}`" class="mdc-data-table__cell"
            :class="rightAlign && 'mdc-data-table__header-cell--numeric'"
          >{{item[value]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "VmcTable",
  props: {
    headers: Array,
    items: Array
  }
}
</script>

<style lang="sass">
@use "@material/data-table/mdc-data-table"
</style>
