<template>
    <div>
        <v-row>
            <v-col cols="3">
                <div class="escudo-municipal">
                    <a href="http://www.muniguate.com/"><img src="@/assets/img/logo_muni.png" alt="muniguate" class="img-responsive"></a>
                </div>
            </v-col>
            <v-col cols="9">
                <div class="wrapper-iconos-header">
                    <a href="tel:1551">
                        <div><i class="icon-call-center"></i> 1551 Call Center</div>
                    </a>
                    <a href="tel:123">
                        <div><i class="icon-bomberos"></i> 123 CBM</div>
                    </a>

                    <slot name="action">

                    </slot>
                    
                </div>
            </v-col>
        </v-row>
    </div>

    
</template>

@/assets/img/logo_muni.png
<script>
export default {

}
</script>

<style>
    .contact {
        font-weight: 600;
        display: inline-block;
        padding-right: 2em;
        font-size: 0.8em;
    }
    .icon-contact{
        text-decoration: none;
        color: #030e9e;
        
    }
    a:active {
        text-decoration: none;
        color: #030e9e;
    }
</style>