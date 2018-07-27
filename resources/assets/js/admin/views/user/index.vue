<template>
    <div>
        <b-button variant="success" @click="add">New user</b-button>
        <b-card :header="'User List'">
            <b-table :items="items.data" :fields="field">
                <template slot="name" slot-scope="data">
                    {{ data.item.name }}
                </template>
                <template slot="action" slot-scope="data">
                    <b-button variant="primary" @click="edit(data.item.id)">Edit</b-button>
                    <b-button variant="danger" @click="confirmDel(data.item.id)">Delete</b-button>
                </template>
            </b-table>
            <b-pagination :total-rows="items.total" :per-page="items.per_page" @change="changePage" :value="items.current_page" prev-text="Prev" next-text="Next" hide-goto-end-buttons></b-pagination>
        </b-card>
        <b-modal title="Confirm Delete User" class="modal-danger" v-model="modalDel" @ok="del" ok-variant="danger" centered no-fade>
            Are You Sure?
        </b-modal>
    </div>
    
</template>
<script>
    export default {
        name: 'userList',

        beforeCreate() {
            this.$store.dispatch('toggleLoading', true);
            this.$store.dispatch('getUsers', { page: this.$route.params.page });
        },

        watch: {
            '$route' (to, from) {
                this.$store.dispatch('getUsers', { page: to.params.page });
            }
        },

        data() {
            return {
                field: [
                    {key: 'id', sortable: true},
                    {key: 'name'},
                    {key: 'email'},
                    {key: 'action'},
                ],
                currentPage: 3,
                userId: null,
                modalDel: false,

            }
        },

        computed: {
            items() {
                return this.$store.state.user.users
            },
        },
        mounted() {
            this.$store.dispatch('toggleLoading', false);
        },
        methods: {
            changePage(page) {
                this.$router.push({name: 'User list', params: { page }})
            },
            edit(id) {
                this.$router.push({name: 'User edit', params: { id }})
            },
            async del() {
                
                let result = await this.$store.dispatch('deleteUser', this.userId);
                this.$toastr.s(result.data.message)
                if (this.items.data.length === 1 && this.$route.params.page !== '1') {
                    return this.$router.push({name: 'User list', params: { page: this.$route.params.page - 1 }});
                }
                this.$store.dispatch('getUsers', { page: this.$route.params.page });
            },
            add() {
                console.log('vào');
                
                this.$router.push({name: 'User add'})
            },
            confirmDel(id) {
                this.userId = id;
                this.modalDel = true;

            }
        }
    }
</script>

