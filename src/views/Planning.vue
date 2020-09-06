<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress">
          <div 
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(categ => {
      const spend = records
        .filter(rec => rec.categoryId === categ.id)
        .filter(r => r.type === 'outcome')
        .reduce((acc, rec) => acc + +rec.amount, 0);

      const percent = 100 * spend / categ.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60 
      ? 'green' 
      : percent < 100 
      ? 'yellow' 
      : 'red';

      return {
        ...categ,
        progressPercent,
        progressColor,
        spend
      }
    });

    this.loading = false;
  }
};
</script>