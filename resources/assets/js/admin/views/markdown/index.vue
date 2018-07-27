<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
        <b-card :header="'Markdown'">
            anh thắng
            <textarea name="markdown" id="markdown"></textarea>
        </b-card>
        <b-modal title="Confirm Delete User" class="modal-danger" v-model="modalImage" @ok="del" ok-variant="danger" ok-only>
            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="fileAdded"></vue-dropzone>
            <div>
                <img v-for="item in files" :src="item.name" :alt="item.memo" :key="item.id" style="width:100px">
            </div>
        </b-modal>
    </div>
    
</template>
<script>
    import SimpleMDE from "simplemde";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    export default {
        name: 'Markdown',
        components: {
            vueDropzone: vue2Dropzone
        },

        // beforeCreate() {
        //     this.$store.dispatch('toggleLoading', true);
        //     this.$store.dispatch('getUsers', { page: this.$route.params.page });
        // },

        // watch: {
        //     '$route' (to, from) {
        //         this.$store.dispatch('getUsers', { page: to.params.page });
        //     }
        // },

        data() {
            return {
                modalImage: false,
            }
        },

        // computed: {
        //     items() {
        //         return this.$store.state.user.users
        //     },
        // },
        mounted() {
            var simplemde = new SimpleMDE({
                element: document.getElementById("markdown"),
                toolbar: [
                    { name: "bold", action: SimpleMDE.toggleBold, className: "fa fa-bold", title: "Bold", },
                    { name: "heading-1", action: SimpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Bold",},
                    { name: "heading-2", action: SimpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Bold",},
                    { name: "heading-3", action: SimpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Bold",},
                    "|",
                    { name: "link", action: SimpleMDE.drawLink, className: "fa fa-link no-mobile", title: "Create Link",},
                    "|",
                    { name: "preview", action: SimpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview",},
                    { name: "side-by-side", action: SimpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side",},
                    { name: "fullscreen", action: SimpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen",},
                    {
                        name: "image",
                        action: () => {
                            this.modalImage = true;
                            this.$store.dispatch('getFiles');
                        },
                        className: "fa fa-image",
                        title: "Upload Image",
                    }
	            ]
            });
        },
        methods: {
            changePage(page) {
                this.$router.push({name: 'User list', params: { page }})
            },
            edit(id) {
                this.$router.push({name: 'User edit', params: { id }})
            },
            del(id) {
                console.log(id);
            },
            fileAdded(file, response) {
                console.log(file, response);
                this.$store.dispatch('addFile', response);
                
            }
        },
        computed: {
            dropzoneOptions() {
                let token = JSON.parse(localStorage.getItem('token'));
                return {
                    url: 'api/upload/image',
                    headers: { "Authorization": token.type + ' ' + token.token },
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    addRemoveLinks: true
                }
            },
            files() {
                return this.$store.state.file.files
            }
        }
    }
</script>

