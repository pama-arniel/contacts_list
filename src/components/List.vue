<template>
<div>
  <!-- the contacts -->
  <div class="container flex flex-col mx-auto w-full items-center justify-center">
      <ul class="flex flex-col divide divide-y">
          <li
              v-for="(item,index) in contacts"
              :key="'contact-' + index"
              class="flex flex-row">
              <ContactRow
                  :contact="item"
                  @delete-contact="triggerDeleteContact(index)"
              />
          </li>
      </ul>
  </div>
</div>
</template>

<script>
import ContactRow from './ContactRow.vue'

export default {
    name: 'List',
    components: {
        ContactRow
    },
    props: {
      contacts: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        //
      };
    },
    methods: {
      triggerDeleteContact(indexInList){
        this.$toasted.show("Are you sure you want to delete this contact?", { 
          theme: "toasted-primary", 
          position: "bottom-center",
          duration : null,
          className: "notif-alert",
          action : [
            {
              text : 'Cancel',
              onClick : (e, toastObject) => {
                toastObject.goAway(0);
              }
            },
            {
              text : 'Continue',
              onClick: (e, toastObject) => {
                this.contacts.splice(indexInList, 1);
                toastObject.goAway(0);
              }
            }
          ]
        });
      }
    }
}
</script>

<style>

</style>