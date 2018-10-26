<template>
    <div>
        <div>
            <span> Search</span><input v-model="searchQuery" @input="search()"/>
            <b-button variant="success" @click="add" id="create-btn">New user</b-button>
        </div>
        <b-card :header="'User List'" class="content-table">
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
    const debounce = require('debounce')
    export default {
        name: 'userList',

        beforeCreate() {
            this.$store.dispatch('toggleLoading', true);
            this.$store.dispatch('getUsers', { page: this.$route.params.page, search: this.$route.params.search});
        },

        watch: {
            '$route' (to, from) {
                console.log(to);
                console.log(from);
                
                this.$store.dispatch('getUsers', { page: to.params.page, search: to.params.search });
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
                searchQuery: null

            }
        },

        computed: {
            items() {
                console.log(this.$store.state);
                
                return this.$store.state.user.users
            },
            searchData() {
                if (!this.searchQuery) {
                    return null;
                }

                return this.searchQuery;
            }
        },
        mounted() {
            this.$store.dispatch('toggleLoading', false);
            this.searchQuery = this.$route.params.search;
        },
        methods: {
            changePage(page) {
                this.$router.push({name: 'User list', params: { page, search: this.searchData }})
            },
            edit(id) {
                this.$router.push({name: 'User edit', params: { id }})
            },
            async del() {
                
                let result = await this.$store.dispatch('deleteUser', this.userId);
                this.$toastr.s(result.data.message)
                if (this.items.data.length === 1 && this.$route.params.page !== '1') {
                    return this.$router.push({name: 'User list', params: { page: this.$route.params.page - 1, search: this.searchData }});
                }
                this.$store.dispatch('getUsers', { page: this.$route.params.page, search: this.searchData });
            },
            add() {
                this.$router.push({name: 'User add'})
            },
            confirmDel(id) {
                this.userId = id;
                this.modalDel = true;

            },
            search: debounce(function () {
                console.log(this.searchData);
                
                this.$router.push({name: 'User list', params: { page: '1', search: this.searchData}})
            }, 500),
        }
    }
</script>

<style>
    #create-btn {
        float: right;
    }

    .content-table {
        clear: both;
    }
</style>


