<template>
  <v-card outlined class="pa-0 d-flex flex-column">
    <v-card-title class="font-weight-medium utGreen--text" v-text="title" />
    <!-- <v-card-subtitle></v-card-subtitle> -->

    <v-card-text class="flex-grow-1">
      <slot></slot>
    </v-card-text>

    <v-divider v-if="$slots.actions" />
    <v-card-actions v-if="$slots.actions" class="d-flex align-stretch pa-0">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: {
      title: String,
    },
  }
</script>
