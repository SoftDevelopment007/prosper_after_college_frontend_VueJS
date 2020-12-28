<template>
  <div class="text">
      <div class="text__wrapper default-container">
        <h1>{{ post.name }}</h1>
        {{ post.code }}
      </div>
  </div>
</template>

<script>
export default {
  asyncData ({ params, error, payload }) {
    return { post: payload }
  },
  head () {
    return {
      title: this.post.meta || null ? this.post.meta.title : this.post.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.meta || null ? this.post.meta.description : '' }
      ],
    }
  }
}
</script>
