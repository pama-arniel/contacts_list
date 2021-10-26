<template>
<div>
  <!-- the contacts -->
  <div class="container flex flex-col mx-auto w-full items-center justify-center">
    <ul class="flex flex-col">
      <li
          v-for="(item,index) in contacts"
          :key="'contact-' + index"
          class="flex flex-row">
          <ContactRow
            :contact="item"
            @delete-contact="triggerDeleteContact(item)"
            @edit-contact="triggerEditContact(item, index)"
          />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import ContactRow from './ContactRow.vue'
import { removeDocument } from '../db/utility_functions'

export default {
    name: 'List',
    components: {
        ContactRow
    },
    props: {
      contacts: {
        type: Array,
        required: true
      }
    },
    methods: {
      triggerEditContact(contact, index) {
        this.$emit('edit-contact', contact, index);
      },

      triggerDeleteContact(contact){
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
                // delete in firestore (also automatically updates orig contacts list)
                removeDocument('contacts', contact.id);
                
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