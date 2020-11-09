<template>
  <v-btn :disabled="$parent.isDataLoading" small icon outlined color="primary" @click="$parent.fetchData(true)">
    <v-icon small>mdi-refresh</v-icon>
    <!-- {{ $t('button.refresh') }} -->
  </v-btn>
</template>
