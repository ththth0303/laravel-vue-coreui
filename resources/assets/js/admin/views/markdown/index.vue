<template>
    <div>
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
            <b-input v-model="title" placeholder="title"/>
            <br>
            <textarea name="markdown" id="markdown"></textarea>
            <b-modal title="Insert Image" class="modal-white" v-model="modalImage" ok-variant="danger" ok-only ok-title="Cancel">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="fileAdded"></vue-dropzone>
                Your image
                <div class="img-container">
                    <img v-for="item in files.data" :src="item.name" :alt="item.memo" :key="item.id" style="width:50px" @click="addImage(item.name)" class="img">
                </div>
                <b-pagination align="center" hide-goto-end-buttons size="md" :total-rows="files.total"  :per-page="files.per_page" @change="changePageImg"></b-pagination>
            </b-modal>
            <b-modal title="Insert Link" class="modal-white" v-model="modalLink" ok-variant="danger" @ok="addUrl" @cancel="cancelLink" cancel-title="Cancel" ok-title="Instert">
                <label v-show="linkErr" class="text-errors">Doesn't look like a valid URL</label>
                <input type="text" class="form-control" v-model="link" v-bind:class="{ errors: linkErr }">
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

        data() {
            return {
                modalImage: false,
                modalLink: false,
                linkErr: false,
                simplemde: null,
                link: null,
                title: null,
            }
        },

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
                            this.modalLink = true;
                        },
                        className: "fa fa-link no-mobile",
                        title: "Create Link",},
                    {
                        name: "image",
                        action: () => {
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
                        action: () => alert('Help'),
                        className: "fa fa-question-circle",
                        title: "Help",},
	            ]
            });
        },
        methods: {
            //add image vào list 
            fileAdded(file, response, ) {
                this.$store.dispatch('addFile', response);
                this.$refs.myVueDropzone.removeFile(file);
            },
            // insert image vào nội dung soạn thảo
            addImage(url) {
                let cm = this.simplemde.codemirror
                cm.replaceSelection("![](" + url + ")");
                this.modalImage = false;
                setTimeout(function() {
                    cm.focus();
                    
                }, 0);
            },
            //insert link vào nội dung soạn thảo
            addUrl(e) {
                e.preventDefault()
                if (this.validateUrl()) {
                    window.prompt = () => {
                        return this.link;
                    }
                    let cm = this.simplemde.codemirror;
                    SimpleMDE.drawLink(this.simplemde)
                    setTimeout(function() {
                        cm.focus();
                        
                    }, 0);
                    this.modalLink = false;
                    this.linkErr = false;
                    this.link = false;
                } else {
                    this.linkErr = true;
                }
                
            },
            cancelLink() {
                this.linkErr = false;
                this.link = null;
            },
            validateUrl() {
                if (!this.link) {
                    return false;
                }
                return this.link.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
            },
            async savePost() {
                let result = await callApiAdd(this.post);
            },
            changePageImg(page) {
                this.$store.dispatch('getFiles', {page: page});
            }
        },
        computed: {
            //config vue2Dropzone
            dropzoneOptions() {
                let token = JSON.parse(localStorage.getItem('token'));
                return {
                    url: 'api/upload/image',
                    headers: { "Authorization": token.type + ' ' + token.token },
                    thumbnailWidth: 75,
                    thumbnailHeight: 75,
                    dictDefaultMessage: "<i class='fa fa-cloud-upload fa-3x'></i></br>  Drag and drop files here or click to upload",
                    maxFilesize: 2,
                    addRemoveLinks: true,
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

<style>
    .vue-dropzone {
        border: 2px dashed #dbe3e8;
    }

    .modal-dialog {
        max-width: 475px;
    }

    .img {
        margin: 10px;
        cursor: pointer;
    }

    .img-container{
        max-height: 250px;
        overflow: auto;
    }

    .pagination {
        margin-bottom: 0px;
    }

    header, footer {
        border: none !important;
    }

    .errors {
        border: 1px solid red;
    }

    .text-errors {
        color: red;
    }
</style>


