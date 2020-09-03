<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select ref="select">
            <option 
              v-for="categ of categories"
              :key="categ.id"
              :value="categ.id"
            >{{categ.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Название</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>