<template>
    <div>
        <v-row v-if="editor">
            <v-col>
               
                <v-btn class="mt-1" @click="editor.chain().focus().toggleBold().run()" :dark=" editor.isActive('bold') ? true : false">
                    <v-icon>
                        mdi-format-bold
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleItalic().run()" :dark=" editor.isActive('italic') ? true : false">
                    <v-icon>
                        mdi-format-italic
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleStrike().run()" :dark=" editor.isActive('strike') ? true : false">
                    <v-icon>
                        mdi-format-strikethrough
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleHeading({level: 1}).run()" :dark=" editor.isActive('heading', {level: 1}) ? true : false">
                    <v-icon>
                        mdi-format-header-1
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleHeading({level: 2}).run()" :dark=" editor.isActive('heading', {level: 2}) ? true : false">
                    <v-icon>
                        mdi-format-header-2
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleHeading({level: 3}).run()" :dark=" editor.isActive('heading', {level: 3}) ? true : false">
                    <v-icon>
                        mdi-format-header-3
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleHeading({level: 4}).run()" :dark=" editor.isActive('heading', {level: 4}) ? true : false">
                    <v-icon>
                        mdi-format-header-4
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleHeading({level: 5}).run()" :dark=" editor.isActive('heading', {level: 5}) ? true : false">
                    <v-icon>
                        mdi-format-header-5
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().setTextAlign('center').run()" :dark=" editor.isActive({textAlign: 'center'}) ? true : false">
                    <v-icon>
                        mdi-format-align-center
                    </v-icon>
                </v-btn>
                 <v-btn class="mt-1" @click="editor.chain().focus().setTextAlign('justify').run()" :dark=" editor.isActive({textAlign: 'justify'}) ? true : false">
                    <v-icon>
                        mdi-format-align-justify
                    </v-icon>
                </v-btn>
                 <v-btn class="mt-1" @click="editor.chain().focus().setTextAlign('left').run()" :dark=" editor.isActive({textAlign: 'left'}) ? true : false">
                    <v-icon>
                        mdi-format-align-left
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().setTextAlign('right').run()" :dark=" editor.isActive({textAlign: 'right'}) ? true : false">
                    <v-icon>
                        mdi-format-align-right
                    </v-icon>
                </v-btn>
                 <v-btn class="mt-1" @click="editor.chain().focus().toggleBulletList().run()" :dark=" editor.isActive('bulletList') ? true : false">
                    <v-icon>
                        mdi-format-list-bulleted
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleOrderedList().run()" :dark=" editor.isActive('orderedList') ? true : false">
                    <v-icon>
                        mdi-format-list-numbered
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleCodeBlock().run()" :dark=" editor.isActive('codeBlock') ? true : false">
                    <v-icon>
                        mdi-xml
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().toggleBlockquote().run()" :dark=" editor.isActive('blockquote') ? true : false">
                    <v-icon>
                        mdi-format-quote-close
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().undo().run()">
                    <v-icon>
                        mdi-undo
                    </v-icon>
                </v-btn>
                <v-btn class="mt-1" @click="editor.chain().focus().redo().run()">
                    <v-icon>
                        mdi-redo
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    
        <v-row>
            <v-col>
                <editor-content class="content" :editor="editor"></editor-content>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>

    import { Editor, EditorContent } from '@tiptap/vue-2';
    import StarterKit from '@tiptap/starter-kit'
    import TextAlign from '@tiptap/extension-text-align'
    import Highlight from '@tiptap/extension-highlight'

    export default {
        components: {
            EditorContent,
        },
        data(){
            return{
                editor: null,
                toggle_exclusive: []
            }
        },
        methods: {
            getHTML(){

                const html = this.editor.getHTML()

                return html
            },
            clear(){

                this.editor.commands.clearContent()

            }
        },
        mounted(){

            this.editor = new Editor({
                content: null,
                extensions: [
                    StarterKit,
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    Highlight,
                ], 
                autofocus: true,
                           
            })

        },
        beforeDestroy() {
            this.editor.destroy()
        },
        
    }
</script>

<style lang="scss">

    .content {
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
        border: 1px solid #dbdbdb;
        display: block;
        max-width: 100%;
        min-width: 100%;
        padding: 0.625em;
        resize: vertical;
        background-color: white;
        border-radius: 4px;
    }
    .ProseMirror {
        overflow-y: scroll;
        max-height: 200px;
        min-height: 200px;
        outline: none;

        strong{
            color: black
        }  

        p {
            margin: 0 0;
        }

        code {
            background-color: rgba(#616161, 0.1);
            color: #616161;
        }

        pre {
            background: #0D0D0D;
            color: #FFF;
            font-family: 'JetBrainsMono', monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;

            code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
            }
        }

        img {
            max-width: 100%;
            height: auto;
        }

        blockquote {
            padding-left: 1rem;
            border-left: 2px solid rgba(#0D0D0D, 0.1);
        }

        hr {
            border: none;
            border-top: 2px solid rgba(#0D0D0D, 0.1);
            margin: 2rem 0;
        }
        
    }
</style>

