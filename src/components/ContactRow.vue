<template>
<div class="text-base flex flex-1 items-center p-4">
    <div class="flex flex-col w-20 h-20 justify-center items-center mr-8 mt-2">
        <a href="#" class="block relative">
            <img loading="lazy" :alt="contact.name" :src="contact.image_src" class="mx-auto object-cover rounded-full h-20 w-20 "/>
        </a>
    </div>
    <div class="flex-1 pl-1 mr-16">
        <div class="text-lg font-bold text-gray-900">
            {{ contact.name }}
        </div>
        <div class="font-bold text-gray-500 text-sm">
            {{ contact.number }}
        </div>
    </div>
    <div class="font-bold text-blue-700 text-sm justify-left">
       <span class = "align-text-top underline"> {{ contact.email }} </span>
    </div>
    <div class="w-24 text-right flex justify-end">
      <button @click="$emit('delete-contact')" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ef4444" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
      </button>
      <button @click="$emit('edit-contact')">
          <svg width="20" height="20" fill="#10b981" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
            </path>
          </svg>
      </button>
    </div>
</div>
</template>

<script>
export default {
  name: 'ContactRow',
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
