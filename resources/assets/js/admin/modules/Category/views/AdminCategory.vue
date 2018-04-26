.<template>
    <b-table striped hover :items="items"></b-table>
</template>

<script>
    // import { typeOptions } from '../store/formData'
    const items = [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
    ]

    export default {
        name: 'AdminCategory',

        // beforeCreate() {
        //     Helper.changeTitleAdminPage(this.$i18n.t('textManageCategory'))
        //     this.$store.dispatch('actionFetchCategory', { vue: this })
        // },

        data() {
            return {
                items: items,
            }
        },

        // methods: {
        //     getTypeOptions(){
        //         return typeOptions
        //     },

        //     getFilterItem(type){
        //         return this.items.filter(item => item.type == type)
        //     },

        //     clickAddNewItem() {
        //         return this.$router.push({ path: '/categories/add' })
        //     },

        //     clickEditItem(data) {
        //         return this.$router.push({ path: `/categories/edit/${data.id}` })
        //     },

        //     async clickDeleteItem(id) {
        //         return id
        //             && await this.$swal({
        //                 title: this.$i18n.t('textConfirmDelete'),
        //                 icon: 'warning',
        //                 buttons: true,
        //                 dangerMode: true,
        //             })
        //             && this.$store.dispatch('actionCategoryDelete', { vue: this, id })
        //     },
        // },

        // computed: {
        //     items() {
        //         return this.$store.state.storeAdminCategory.listFetch
        //     },
        // },
    }
</script>
