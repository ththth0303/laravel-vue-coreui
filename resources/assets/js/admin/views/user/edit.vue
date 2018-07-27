<template>
    <div>
        <b-card>
            <template  slot="header">User Edit</template>
            <b-form @submit.prevent="edit">
            <input type="submit" style="visibility:  hidden;">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" placeholder="Username" v-model="item.name" name="name" class="form-control" v-validate="'required'" autofocus ref="name">
                <div class="invalid-feedback">{{ errors.first('name') }}</div>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" name="email" v-validate="'required|email'" class="form-control" v-model="item.email">
                <div class="invalid-feedback">{{ errors.first('email') }}</div>
              </b-input-group>
            </b-form-group>
          </b-form>
            <template  slot="footer">
                <b-button variant="primary" @click="edit" type="submit">Edit</b-button>
                <b-button variant="danger" @click="$router.go(-1)">Cancel</b-button>
            </template>
        </b-card>
    </div>
    
</template>
<script>
    export default {
        name: 'userEdit',

        beforeCreate() {
            console.log(this.$route.params.id);
            this.$store.dispatch('getUser', this.$route.params.id);
        },


        computed: {
            item() {
                return this.$store.state.user.user
            },
        },
        mounted() {
            console.log(this.$route.params.id);
            console.log(this.$refs.name.focus());
            
        },
        methods: {
            changePage(page) {
                this.$store.dispatch('getUsers', { pagination: 20, page });
            },
            async edit() {
                if (await this.$validator.validate()) {
                    this.$store.dispatch('editUser', this.item);
                    this.$router.go(-1);
                    this.$toastr.s('Edit Success')
                }
            },
        }
    }
</script>

