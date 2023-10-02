<template>
    <div>
        <v-row style="height: 400px; overflow-y: scroll;">
            <v-col cols="12">
                <span class="overline">
                    TÉRMINOS Y CONDICIONES SOLICITUD EN LINEA DE PRODUCTOS CATASTRALES E INFORMACIÓN RELACIONADA AL IUSI
                </span>
            </v-col>
            <v-col>
                <p class="text-justify">
                    Los servicios en línea que se ponen a disposición del portal electrónico de la Municipalidad de Guatemala a través de la Dirección de Catastro y Administración del IUSI de la Municipalidad de Guatemala, permiten a los usuarios del mismo, hacer la solicitud de certificaciones catastrales, cédulas catastrales, información de valores unitarios, nomenclatura, requerimientos de pago y estados de cuenta relacionados al Impuesto Único Sobre Inmuebles y recibir dichos productos a través del correo electrónico registrado. Este portal tiene como objetivo que el usuario realice los trámites antes descritos desde cualquier lugar, utilizando para ello un aparato electrónico con acceso a internet lo que evitará realizar filas para la prestación de uno o varios servicios, por ello se debe entender que este portal provee un valor agregado en los productos que realiza, es decir, que no se trata de un servicio esencial por lo que para hacer uso del mismo es un requisito indispensable que el usuario se encuentre solvente en el pago del Impuesto Único Sobre Inmuebles y que los bienes inmuebles se encuentren debidamente catastrados. Además, se hace la aclaración que los usuarios con acceso a este portal serán los siguientes: A) titulares y copropietarios de bienes inmuebles; B) Los representantes legales de las entidades que sean propietarias de bienes inmuebles; C) Valuadores autorizados; y D) Abogados y Notarios (colegiados activos). Dichas personas podrán solicitar ciertos productos según la calidad con la actúen de conformidad con el siguiente cuadro:
                </p>

                <v-img class="mb-4" :src="require('@/assets/img/terminos.png')"></v-img>

                <p class="text-justify">
                    <span class="font-weight-bold">OBLIGACIONES DEL USUARIO:</span> Al hacer uso de la página web de la Dirección de Catastro y Administración del IUSI de la Municipalidad de Guatemala, en adelante llamada “Dirección de Catastro”, el usuario se obliga a lo siguiente: a) utilizar la página web conforme a los presentes términos y condiciones; b) realizar solicitudes ingresando información legítima y precisa para la emisión de la(s) certificaciones catastrales, cédulas catastrales, nomenclaturas, información de valores unitarios, requerimientos de pago y estados de cuentas relacionados al Impuesto Único Sobre Inmuebles; c) ser responsable de todos los cargos y pagos derivados de la(s) solicitud(es) que realice a través de la página web; d) no hacer uso indebido o inapropiado de la página web, tales como realizar operaciones falsas, con el objeto de vulnerar derechos de terceros relativos sus bienes o a su persona, o bien limite el ejercicio de sus derechos; utilizar recursos, medios, programas, archivos que pudieren dañar el equipo de cómputo de otras personas o afectar los derechos de autor, las marcas o patentes relacionadas con el software utilizado en la página o en el equipo de cómputo de terceros; e) utilizar de forma comercial y sin consentimiento y autorización de la Dirección de Catastro, la información generada que sea producto de los servicios o del software brindado, o cualquier otro acto, acción o propósito que de cualquier forma dañe, impida o limite el uso de la página web; f) utilizar la página web bajo su propio riesgo conforme a los presentes términos, condiciones y de acuerdo con las políticas de privacidad de la información proporcionada; g) no podrá dar otro uso a la página web teniendo prohibido copiar, distribuir, otorgar licencia, reenviar, reproducir, reutilizar, transmitir, vender, modificar, publicar o usar de alguna otra manera el contenido de la página web para fines públicos o comerciales; h) los servicios solicitados por el usuario por medio de la página web, se regirán por la legislación vigente de la República de Guatemala y tratados internacionales en materia aplicable, así como los criterios, manuales o acuerdos autorizados por el honorable Concejo Municipal de la Municipalidad de Guatemala y por la Dirección de Catastro; i) los documentos que se emitan, se basarán y poseerán consignada la información contenida en las bases de datos de la Dirección de Catastro a la fecha de la solicitud del producto; j) Los términos y condiciones establecidos podrán ser modificados libremente por la –Dirección de Catastro-, sin notificación previa; k) la Dirección de Catastro y la Municipalidad de Guatemala no asume ninguna responsabilidad por daños o perjuicios directos, indirectos, incidentales o de ningún otro tipo que se deriven o se relacionen con el mal uso de la página web institucional por parte del usuario, o de la información inconsistente que éste proporcione; l) cualquier información que el usuario ingrese en el proceso de prestación de servicios se entiende que queda a disposición de –Dirección de Catastro-; m) en caso de no ser enviados los productos solicitados por algún motivo, es obligación del usuario contactarse con la Dirección de Catastro para obtener más información al respecto; n) el plazo del envío electrónico será dispuesto por la –Dirección de Catastro-, el cual puede variar dependiendo la hora en que se realiza la solicitud.
                </p>
                <p class="text-justify">
                    <span class="font-weight-bold">COMUNICACIÓN CON EL USUARIO:</span> El usuario acepta utilizar como medio de comunicación el correo electrónico, por lo que toda la información, avisos, o notificaciones que se envíen al usuario por este medio se considerarán como válidos y se tendrán por recibidos y aceptados.
                </p>
                <p class="text-justify">
                    <span class="font-weight-bold">ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES:</span> El acceso, la utilización o cualquier operación a través de la página web de –Dirección de Catastro- se entiende como la absoluta conformidad con los presentes términos y condiciones que el usuario declara haber leído y aceptado los mismos.
                </p>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
            <v-col>
                <v-checkbox v-model="acepto" label="Estoy de acuerdo con los términos y condiciones"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn :disabled="saving || !acepto" :loading="saving" @click="registrar()" color="primary">CONTINUAR</v-btn>

                <v-btn :disabled="saving" @click="back()" class="ml-2" text>ATRÁS</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    
    import { mapGetters } from 'vuex'
    
    export default {

        data(){
            return{
                acepto: false
            }
        },
        methods: {

            back(){

				this.$store.commit('setStep', 3)

			},
            registrar(){
                
                this.$store.dispatch('createUser')

            }

        },
        computed: {
            ...mapGetters({
                saving: 'getSaving'
            })
        }

    }
</script>

<style>

</style>