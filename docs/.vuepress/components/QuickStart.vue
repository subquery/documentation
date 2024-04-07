<template>
  <div class="quickStart layout mt80">
    <Typography tag="h4" fontSize="32"
      >Get Started with our Quick Start Guides</Typography
    >
    <Typography class="mt24 mb24" tag="h5" type="secondary"
      >We have one for every supported layer 1, designed to take you from zero
      to hero in less than 10 minutes with intuitive example
      projects.</Typography
    >
    <div class="quickStartList">
      <div
        class="itemGroup"
        v-for="networkFamily in quickStartJson"
        :key="networkFamily.name"
      >
        <div class="itemGroupHeader">
          <img
            :src="networkFamily.logo"
            :alt="networkFamily.name"
            width="32"
            height="32"
          />
          <Typography size="large" style="margin-left: 8px">{{
            networkFamily.name
          }}</Typography>
        </div>
        <details display="block">
          <summary>See All Networks</summary>
          <br />
          <div class="itemGroupContent">
            <div
              v-for="network in networkFamily.quick_start_data"
              :key="network.name"
            >
              <router-link
                v-for="quickStart in network.quick_start_data"
                :key="quickStart.name"
                :to="
                  quickStart.link.replace(
                    'https://academy.subquery.network',
                    ''
                  ) // TODO: update the links from API:  https://templates.subquery.network/guides
                "
              >
                <div>
                  <img
                    v-if="quickStart.logo"
                    :src="network.logo"
                    width="24"
                    height="24"
                    style="pointer-events: none"
                  />
                  <div
                    v-if="!quickStart.logo"
                    style="
                      width: 24px;
                      height: 24px;
                      background: #fff;
                      border-radius: 50%;
                    "
                  ></div>
                  <Typography size="large" class="overflow3">{{
                    quickStart.name
                  }}</Typography>
                </div>
              </router-link>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Typography from "./Typography.vue";

const quickStartJson = ref<
  {
    name: string;
    logo: string;
    quick_start_data: {
      logo: string;
      name: string;
      quick_start_data: {
        name: string;
        link: string;
        logo: string;
        internal: boolean;
      }[];
    }[];
  }[]
>([]);

const fetchAllQuickStart = () => {
  fetch("https://templates.subquery.network/guides").then(async (data) => {
    const json = await data.json();
    const guides = json.results.sort(
      (a, b) =>
        b.quick_start_data.reduce(
          (cur, add) => cur + add.quick_start_data.length,
          0
        ) -
        a.quick_start_data.reduce(
          (cur, add) => cur + add.quick_start_data.length,
          0
        )
    );
    quickStartJson.value = guides.map((family) => {
      family.quick_start_data.map(
        (qsd) =>
          (qsd.quick_start_data = qsd.quick_start_data.filter(
            (qs) => qs.internal
          ))
      );
      return family;
    });
  });
};

onMounted(() => {
  fetchAllQuickStart();
});
</script>

<style lang="scss">
.quickStartList {
  columns: 2 100px;
  column-gap: 1rem;
}

.quickStartList .itemGroup {
  margin: 0 0 1rem 0;
  border-radius: 8px;
  display: flex;
  padding: 16px;
  flex-flow: column;
  row-gap: 1em;
  align-items: center;
  display: flex;
  background: var(--dark-mode-card);
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

.quickStartList .itemGroup .itemGroupHeader {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
}

.quickStartList .itemGroup .itemGroupContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 16px;
  width: 100%;
}

.quickStartList .itemGroup .itemGroupContent div {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-flow: row wrap;
  gap: 16px;
}

.quickStartList .itemGroup .itemGroupContent span {
  margin-left: 8px;
  color: white;
}

.quickStartList .itemGroup .itemGroupContent span:hover {
  color: var(--theme-color);
}

@media screen and (max-width: 640px) {
  .quickStartList {
    columns: 1;
  }
}

@media screen and (max-width: 720px) {
  .quickStart {
    max-width: 95vw;
  }
}
</style>
