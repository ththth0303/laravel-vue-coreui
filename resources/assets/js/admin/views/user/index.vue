<template>
    <div>
        <b-card :header="'User List'">
            <b-table :items="items" :fields="fields">
            </b-table>
        </b-card>
    </div>
    
</template>
<script>
    export default {
        name: 'userList',

        beforeCreate() {
            this.$store.dispatch('getUsers');
        },

        data() {
            return {
                fields: [
                    {key: 'id', sortable: true},
                    {key: 'name'},
                    {key: 'email'},
                ],
            }
        },

        computed: {
            items() {
                return this.$store.state.user.users
            },
        },
    }
</script>

