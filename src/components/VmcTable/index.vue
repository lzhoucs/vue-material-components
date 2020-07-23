<template>
  <div class="mdc-data-table">
    <table class="mdc-data-table__table">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th v-if="$attrs['onUpdate:selected']" class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" scope="col">
            <vmc-checkbox class="mdc-data-table__header-row-checkbox" :checked="(selected.length === items.length) && items.length > 0" @update:checked="selectAll"></vmc-checkbox>
          </th>

          <th v-for="{text, value, rightAlign} in headers" :key="`header-${value}`" class="mdc-data-table__header-cell"
            :class="rightAlign && 'mdc-data-table__header-cell--numeric'"
            scope="col">
              {{text}}
          </th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        <tr v-for="(item, indx) in items" :key="`row-${indx}`" class="mdc-data-table__row"
          :class="selected.includes(item) && 'mdc-data-table__row--selected'"
        >
          <td v-if="$attrs['onUpdate:selected']" class="mdc-data-table__cell mdc-data-table__cell--checkbox">
            <vmc-checkbox class="mdc-data-table__row-checkbox" :checked="selected.includes(item)" @update:checked="updateSelected(item, $event)"></vmc-checkbox>
          </td>

          <td v-for="{value, rightAlign} in headers" :key="`cell-${value}`" class="mdc-data-table__cell"
            :class="rightAlign && 'mdc-data-table__header-cell--numeric'"
          >{{item[value]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VmcCheckbox from "C/VmcCheckbox"
import {addOrRemove} from '@/util'

export default {
  name: "VmcTable",
  props: {
    headers: Array,
    items: Array,
    selected: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit}) {
    const updateSelected = (item, rowSelected) => {
      const newSelected = addOrRemove(props.selected, item, rowSelected)
      emit('update:selected', newSelected)
    }

    const selectAll = all => emit('update:selected', all ? props.items : [])

    return {
      updateSelected,
      selectAll
    }
  },
  components: {
    VmcCheckbox
  }
}
</script>

<style lang="sass">
@use "@material/data-table/mdc-data-table"
</style>
