<template>
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
</template>

<script>
import ContactRow from './ContactRow.vue'

export default {
    name: 'List',
    components: {
        ContactRow
    },
    data() {
      return {
        contact: {
          name: "Leonor",
          email: "leonorrivera@gmail.com",
          image_src: "https://picsum.photos/seed/picsum/200/300",
          number: "09380346777"
        },
        contacts: [
          {
            name: "Leonor",
            email: "leonorrivera@gmail.com",
            image_src: "https://picsum.photos/seed/picsum/200/300",
            number: "09380346777"
          },
          {
            name: "River",
            email: "riverlee@gmail.com",
            image_src: "https://picsum.photos/seed/picsum/200/300",
            number: "09567834567"
          },
          {
            name: "Marcus",
            email: "marcusaurelius@gmail.com",
            image_src: "https://picsum.photos/seed/picsum/200/300",
            number: "09345673542"
          },
          {
            name: "Martini",
            email: "martinidelmar@gmail.com",
            image_src: "https://picsum.photos/seed/picsum/200/300",
            number: "09380291263"
          },
          {
            name: "Jezza",
            email: "sanchajezza@gmail.com",
            image_src: "https://picsum.photos/seed/picsum/200/300",
            number: "09768651543"
          }
        ]
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
              onClick: () => {
                this.contacts.splice(indexInList, 1);
              }
            }
          ]
        });
      },
    }
}
</script>

<style>

</style>