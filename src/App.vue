<template>
<section id="app" class="text-gray-600 body-font h-screen sm:w-screen w-max">
  <EditContact
    :showModal="showModal"
    :actionType="actionType"
    :contact="selectedContactToEdit"
    @close-modal="showModal=false"
    @saved-edit="saveEdit"
    @add-contact="saveNewContact"
  />

  <!-- the search bar -->
  <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
    <div class="md:flex">
      <div class="w-full p-3 mt-3">
          <div class="relative space-x-4">
            <input @input="debounceSearch" type="text" class="bg-gray-50 border-2 h-14 w-full px-6 rounded-lg focus:outline-none hover:cursor-pointer" placeholder="Search contact...">
            <button class="outline-none focus:outline-none absolute top-4 right-5 border-l pl-4">
              <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
      </div>
    </div>
  </div>
  <div class="max-w-md mx-auto mt-4 mb-6">
      <!-- the add button -->
      <button
        v-if="!typing"
        @click="showAddContactModal()"
        class="float-right bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 sm:px-6 border-b-2 border-gray-700 hover:border-purple-500 rounded z-10">
        Add
      </button>
  </div>

  <!-- the contacts grid -->
  <div v-if="typing" class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ this.typing }}</p>
  </div>
  <div v-else-if="origContacts.length <= 0" class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">You have no contacts available.</p>
  </div>
  <div v-else-if="filteredContactsList.length > 0" class="container h-auto min-h-screen px-8 sm:px-10 pt-6 sm:pt-10 pb-10 mx-auto">
    <List
      :contacts="filteredContactsList"
      @edit-contact="showEditContactModal"
    />
  </div>
  <div v-else class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">Your search did not match any documents.</p>
  </div>
</section>
</template>

<script>
import EditContact from './components/EditContact.vue'
import List from './components/List.vue'
import { db } from './db/db'
import { addDocument, updateDocument } from './db/utility_functions'

export default {
  name: 'App',
  components: {
    EditContact,
    List
  },
  data() {
    return {
      origContacts: [],

      // for filtered list
      filteredContactsList: [],

      // for search bar
      typing: "",
      searchKey: "",

      // for add or edit popup
      actionType: "",
      showModal: false,

      // for edit
      selectedContactToEdit: {},
      indexOfEditedContact: null
    };
  },
  firestore: {
    origContacts: db.collection('contacts'),
  },
  created() {
    this.filteredContactsList = this.origContacts;
  },
  methods: {
    showEditContactModal(contact, index){
      this.showModal = true;
      this.selectedContactToEdit = contact;
      this.indexOfEditedContact = index;
      this.actionType = 'edit';
    },

    showAddContactModal(){
      this.showModal = true;
      this.actionType = 'add';
    },

    saveNewContact(newContact){
      // reset data
      this.actionType = "";

      // update firestore (also automatically updates orig list)
      addDocument('contacts', newContact);

      // initiate filter
      this.initiateRefilteringOfList(this.searchKey);
      this.showModal = false;

      // show save successful
      this.showNotif("success", "Successfully added a new contact!");
    },

    saveEdit(newContact){
      // reset data
      this.selectedContactToEdit = {};
      this.actionType = "";

      // update firestore (also automatically updates orig list)
      updateDocument('contacts', newContact);

      // initiate filter
      this.initiateRefilteringOfList(this.searchKey);
      this.showModal = false;

      // show save successful
      this.showNotif("success", "Changes to contact details are saved!");
    },

    showNotif(notifType, messageText){
      this.$toasted.show(messageText, {
        theme: "bubble",
        position: "bottom-center",
        duration : 3000,
        type: notifType,
        className: "notif-alert"
      });
    },

    debounceSearch(event) {
      let newSearchKey = event.target.value;
      this.typing = newSearchKey ? "Typing..." : "";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.typing = "";
        this.searchKey = newSearchKey;

        // filter the new list
        this.initiateRefilteringOfList(newSearchKey);
      }, 600);
    },

    initiateRefilteringOfList(searchKey){
      this.filteredContactsList = this.filterListBySearchKey(this.origContacts, searchKey);
    },

    filterListBySearchKey(origList, searchKey){
      if(!searchKey) return origList;

      return origList.filter((item) => {
        return this.isItemIncludedInFilter(item, searchKey);
      });
    },

    isItemIncludedInFilter(item, searchKey){
      if(!searchKey){
        return true;
      } else {
        let keysToSkip = ['image_src'];

        // iterate the key-value pairs of the item and
        // determine if the search term is found in one of them
        for (const [currKey, currValue] of Object.entries(item)) {
          // skip keys that should not be included in the search
          if(keysToSkip.includes(currKey)) continue;

          if(currValue){
            let completeValue = Array.isArray(currValue) ? currValue?.join(",") : currValue;
            let keyRegex = new RegExp(searchKey, "gi");

            // if found in array, break loop and return true
            if(completeValue.match(keyRegex)){
              return true;
            }
          }
        }

        return false;
      }
    },
  }
}
</script>

<style>
#app {
  /* background: linear-gradient(90deg, #f2f2f1, 21px, transparent 1%) center, linear-gradient(#f2f2f1, 21px, transparent 1%) center, #a799cc; */
  background: rgb(255 255 255);
  background-size: 22px 22px;
  height: 100%;
}

.notif-alert{
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
}
</style>
