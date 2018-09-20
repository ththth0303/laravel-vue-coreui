<template>
    <div>
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
            <b-input v-model="title" placeholder="title"/>
            <br>
            <textarea name="markdown" id="markdown"></textarea>
            <b-modal title="Insert Image" class="modal-danger" v-model="modalImage" ok-variant="danger" ok-only>
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="fileAdded"></vue-dropzone>
                <div>
                    <img v-for="item in files" :src="item.name" :alt="item.memo" :key="item.id" style="width:100px" @click="addImage(item.name)">
                </div>
            </b-modal>
            <b-modal title="Insert Link" class="modal-danger" v-model="modalLink" ok-variant="danger" @ok="addUrl">
                <input type="text" class="form-control" v-model="link">
            </b-modal>
        </div>
        <div>
            <b-button variant="success" @click="savePost">Save</b-button>
        </div>
    </div>
    
</template>
<script>
    import { callApiAdd } from "../../api/post";
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
                modalLink: false,
                simplemde: null,
                link: null,
                title: null,
            }
        },

        // computed: {
            //     items() {
                //         return this.$store.state.user.users
        //     },
        // },
        mounted() {
            this.simplemde = new SimpleMDE({
                element: document.getElementById("markdown"),
                autofocus: true,
                promptURLs: true,
                toolbar: [
                    { name: "bold", action: SimpleMDE.toggleBold, className: "fa fa-bold", title: "Bold", },
                    { name: "italic", action: SimpleMDE.toggleStrikethrough, className: "fa fa-strikethrough", title: "Strikethrough", },
                    { name: "strikethrough", action: SimpleMDE.toggleItalic, className: "fa fa-italic", title: "Italic", },
                    { name: "heading-1", action: SimpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Bold",},
                    { name: "heading-2", action: SimpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Bold",},
                    { name: "heading-3", action: SimpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Bold",},
                    "|",
                    { name: "code", action: SimpleMDE.toggleCodeBlock, className: "fa fa-code", title: "Code", },
                    { name: "quote", action: SimpleMDE.toggleBlockquote, className: "fa fa-quote-left", title: "Quote", },
                    { name: "unordered-list", action: SimpleMDE.toggleUnorderedList, className: "fa fa-list-ul", title: "Generic List", },
                    { name: "ordered-list", action: SimpleMDE.toggleOrderedList, className: "fa fa-list-ol", title: "Numbered List", },
                    { name: "table", action: SimpleMDE.drawTable, className: "fa fa-table", title: "Insert Table", },
                    { name: "horizontal-rule", action: SimpleMDE.drawHorizontalRule, className: "fa fa-minus", title: "Insert Horizontal Line", },
                    { name: "clean-block", action: SimpleMDE.cleanBlock, className: "fa fa-eraser fa-clean-block", title: "Clean block", },
                    "|",
                    {
                        name: "link",
                        action: () => {
                            console.log(SimpleMDE.drawLink);
                            this.modalLink = true;
                        },
                        className: "fa fa-link no-mobile",
                        title: "Create Link",},
                    {
                        name: "image",
                        action: () => {
                            console.log(SimpleMDE.drawLink);
                            
                            this.modalImage = true;
                            this.$store.dispatch('getFiles');
                        },
                        className: "fa fa-image",
                        title: "Upload Image",
                    },
                    "|",
                    { name: "preview", action: SimpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview",},
                    { name: "side-by-side", action: SimpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side",},
                    { name: "fullscreen", action: SimpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen",},
                    "|",
                    { name: "undo", action: SimpleMDE.togglePreview, className: "fa fa-undo no-disable", title: "Undo",},
                    { name: "redo", action: SimpleMDE.togglePreview, className: "fa fa-repeat no-disable", title: "Redo",},
                    "|",
                    {
                        name: "Help",
                        action: () => alert('vào'),
                        className: "fa fa-question-circle",
                        title: "Help",},
	            ]
            });
        },
        methods: {
            fileAdded(file, response) {
                console.log(file, response);
                this.$store.dispatch('addFile', response);
            },
            addImage(url) {
                let cm = this.simplemde.codemirror
                cm.replaceSelection("![](" + url + ")");
                this.modalImage = false;
                setTimeout(function() {
                    cm.focus();
                    
                }, 0);
            },
            addUrl() {
                window.prompt = () => {
                    return this.link;
                }
                let cm = this.simplemde.codemirror;
                SimpleMDE.drawLink(this.simplemde)
                setTimeout(function() {
                    cm.focus();
                    
                }, 0);
                
            }
            ,
            async savePost() {
                console.log(this.post);
                let result = await callApiAdd(this.post);
                console.log(result);
                
                
                
            },
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
                return this.$store.state.file.files;
            },
            post () {
                return {
                    content: this.simplemde.value(),
                    title: this.title
                };
            }
        }
    }
</script>

