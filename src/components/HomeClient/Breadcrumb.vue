<template>
    <div>
        <v-card rounded outlined color="#f7f7f7" dense>
            <v-card-text class="mt-0 mb-0 pt-0 pb-0">
                <v-breadcrumbs large :items="items">
                    <template v-slot:item="{ item }">
                        <v-breadcrumbs-item
                            :href="item.to"
                            :disabled="item.disabled"
                        >
                            <span class="indigo--text font-weight-bold">
                                {{ item.text }}
                            </span>
                        </v-breadcrumbs-item>
                    </template>
                </v-breadcrumbs>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: {
            items: Array
        }
    }
</script>