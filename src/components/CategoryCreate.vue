<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Название</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number" 
            v-model.number="limit"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">Лимит</label>
          <span 
            v-if="$v.limit.$dirty && !$v.limit.required"
            class="helper-text invalid"
          >Введите лимит</span>
          <span 
            v-else-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальная величина: {{$v.limit.$params.minValue.min}} у.е. Сейчас он {{limit}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import M from 'materialize-css';

export default {
  data() {
    return {
      title: "",
      limit: 1,
      updateField: null
    };
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) }
  },
  mounted() {
    this.updateField = M.updateTextFields();
  },
  destroyed() {
    if (this.updateField && this.updateField.destroy) {
      this.updateField.destroy();
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
        title: this.title,
        limit: this.limit
      });
        this.title = '';
        this.limit = 1;
        this.$v.$reset(); // reset state of the form
        this.$message('Категория была создана');
        this.$emit('created', category);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>