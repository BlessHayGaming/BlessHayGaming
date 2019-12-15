<script src="./Index.js"></script>
<style src="./Index.scss" lang="scss"></style>

<template>
    <main class="index">
    </main>
</template>

<page-query>
query Posts {
  allLearnPost {
    totalCount
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</page-query>