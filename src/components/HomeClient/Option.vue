<template>
    <div>
        <v-card :disabled="!item.enable" :to="{ name: item.to }" color="rgba(51, 215, 0, 0.6)" height="120">
            <v-card-text>
                <span class="pl-2 pr-2 white--text text-h5 text-no-wrap indigo">
                    {{ item.title }}
                </span>
            </v-card-text>
            <v-card-actions>
                <v-btn color="#fff" icon>
                    <v-icon size="30">
                        mdi-arrow-right
                    </v-icon>
                </v-btn>    
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        }
    }
</script>