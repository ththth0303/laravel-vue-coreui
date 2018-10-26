<template>
    <div>
                <div class="">{{ error }}{{ errors.first('email') }}</div>
        <b-card>
            <template  slot="header">User Add</template>
            <b-form @submit.prevent="add">
            <input type="submit" style="visibility:  hidden;">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" placeholder="Username" v-model="item.name" name="name" class="form-control" v-validate="'required|max:255'" autofocus>
                <div class="invalid-feedback">{{ errors.first('name') }}</div>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" placeholder="Email" name="email" v-validate="'required|email'" class="form-control" v-model="item.email">
                <div class="invalid-feedback">{{ errors.first('email') }}</div>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-key"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" placeholder="Password" name="password" v-validate="''" class="form-control" v-model="item.password" ref="password">
                <div class="invalid-feedback">{{ errors.first('password') }}</div>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-key"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" placeholder="Confirm password" name="repassword" v-validate="'required|confirmed:password'" class="form-control">
                <div class="invalid-feedback">{{ errors.first('repassword') }}</div>
              </b-input-group>
            </b-form-group>
          </b-form>
            <template  slot="footer">
                <b-button variant="primary" @click="add" type="submit">Add</b-button>
                <b-button variant="danger" @click="$router.go(-1)">Cancel</b-button>
            </template>
        </b-card>
    </div>
    
</template>
<script>
    import { ErrorBag } from 'vee-validate';
    export default {
        name: 'userEdit',

        beforeCreate() {
            // console.log(this.$route.params.id);
            // this.$store.dispatch('getUser', this.$route.params.id);
        },

        data () {
            return {
                item: {name: '', email: '', password: ''},
                error: null
                
            } 
        },

        computed: {
            // item() {
            //     return this.$store.state.user.user
            // },
        },
        mounted() {
            console.log(this.$route.params.id);
        },
        methods: {
            async add() {
                if (await this.$validator.validate()) {
                    let user = await this.$store.dispatch('addUser', this.item);
                    if (user.response && user.response.status === 422) {
                        let err =  user.response.data.errors;
                        for (const key in err) {
                            if (err.hasOwnProperty(key)) {
                                const element = err[key];
                                let field =  this.$validator.fields.find({ name: key });
                                field.setFlags({invalid: true});
                                this.errors.add({
                                    field: key,
                                    msg: element[0],
                                    id: field.id,
                                    scope: field.scope
                                });

                                
                            }
                        }


                        return this.$toastr.w('Invalid data');

                    }
                    this.$router.go(-1);
                    
                    return this.$toastr.s('Add Success')
                }
                console.log( this.errors);
                this.$validator.errors.clear();
            },
        }
    }
</script>

